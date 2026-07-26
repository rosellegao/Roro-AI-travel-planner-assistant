#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectDir = path.resolve(process.argv[2] || ".");
const htmlPath = path.join(projectDir, "index.html");
const dataPath = path.join(projectDir, "companion-data.js");
const errors = [];
const warnings = [];

const requireText = (value, label) => {
  if (typeof value !== "string" || !value.trim()) errors.push(`${label} must be a non-empty string`);
};
const requireArray = (value, label) => {
  if (!Array.isArray(value)) errors.push(`${label} must be an array`);
};
const checkUrl = (value, label) => {
  if (value && !/^https?:\/\//i.test(value)) errors.push(`${label} must use http(s)`);
};
const validTime = (value) => typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);

let html = "";
try {
  html = await readFile(htmlPath, "utf8");
  await readFile(dataPath, "utf8");
} catch (error) {
  console.error(`Missing required file: ${error.message}`);
  process.exit(1);
}

delete globalThis.TRAVEL_COMPANION;
await import(`${pathToFileURL(dataPath).href}?validate=${Date.now()}`);
const companion = globalThis.TRAVEL_COMPANION;
if (!companion || typeof companion !== "object") {
  console.error("companion-data.js must set globalThis.TRAVEL_COMPANION");
  process.exit(1);
}

for (const key of ["meta", "days", "bookings", "toolkit", "sources"]) {
  if (!(key in companion)) errors.push(`Missing top-level field: ${key}`);
}
for (const key of ["title", "subtitle", "destination", "dates", "timezone", "checkedOn", "storageKey"]) {
  requireText(companion.meta?.[key], `meta.${key}`);
}
if (companion.meta?.checkedOn && !/^\d{4}-\d{2}-\d{2}$/.test(companion.meta.checkedOn)) {
  errors.push("meta.checkedOn must use YYYY-MM-DD");
}
for (const key of ["days", "bookings", "sources"]) requireArray(companion[key], key);
if (!companion.toolkit || typeof companion.toolkit !== "object") errors.push("toolkit must be an object");
for (const key of ["emergency", "phrases", "notes"]) requireArray(companion.toolkit?.[key], `toolkit.${key}`);

const dayIds = new Set();
const eventIds = new Set();
for (const [dayIndex, day] of (companion.days || []).entries()) {
  const prefix = `days[${dayIndex}]`;
  for (const key of ["id", "date", "dateLabel", "city", "route"]) requireText(day[key], `${prefix}.${key}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date || "")) errors.push(`${prefix}.date must use YYYY-MM-DD`);
  if (dayIds.has(day.id)) errors.push(`Duplicate day id: ${day.id}`);
  dayIds.add(day.id);
  requireArray(day.events, `${prefix}.events`);
  requireArray(day.hardGates, `${prefix}.hardGates`);
  if (!day.events?.length) errors.push(`${prefix}.events must contain at least one event`);

  for (const [eventIndex, event] of (day.events || []).entries()) {
    const eventPrefix = `${prefix}.events[${eventIndex}]`;
    for (const key of ["id", "time", "kind", "title", "detail"]) requireText(event[key], `${eventPrefix}.${key}`);
    if (eventIds.has(event.id)) errors.push(`Duplicate event id: ${event.id}`);
    eventIds.add(event.id);
    if (!validTime(event.time)) errors.push(`${eventPrefix}.time must use HH:MM`);
    if (event.end && !validTime(event.end)) errors.push(`${eventPrefix}.end must use HH:MM`);
    requireArray(event.physical, `${eventPrefix}.physical`);
    requireArray(event.food, `${eventPrefix}.food`);
    requireArray(event.branches, `${eventPrefix}.branches`);
    for (const [mapName, url] of Object.entries(event.maps || {})) checkUrl(url, `${eventPrefix}.maps.${mapName}`);
    if (event.hardGate) {
      requireText(event.latest, `${eventPrefix}.latest`);
      requireText(event.consequence, `${eventPrefix}.consequence`);
      requireText(event.fallback, `${eventPrefix}.fallback`);
    }
    for (const [branchIndex, branch] of (event.branches || []).entries()) {
      requireText(branch.label, `${eventPrefix}.branches[${branchIndex}].label`);
      requireText(branch.title, `${eventPrefix}.branches[${branchIndex}].title`);
      for (const [mapName, url] of Object.entries(branch.maps || {})) {
        checkUrl(url, `${eventPrefix}.branches[${branchIndex}].maps.${mapName}`);
      }
    }
    for (const [sourceIndex, source] of (event.guide?.sources || []).entries()) {
      requireText(source.label, `${eventPrefix}.guide.sources[${sourceIndex}].label`);
      checkUrl(source.url, `${eventPrefix}.guide.sources[${sourceIndex}].url`);
    }
  }
}

for (const [index, source] of (companion.sources || []).entries()) {
  requireText(source.label, `sources[${index}].label`);
  checkUrl(source.url, `sources[${index}].url`);
}

if (!html.includes('<script src="./companion-data.js"></script>')) {
  errors.push("index.html must load ./companion-data.js");
}
for (const id of ["app", "homeView", "timelineView", "driverModal", "guideModal"]) {
  if (!html.includes(`id="${id}"`)) errors.push(`index.html must contain id="${id}"`);
}
const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];
for (const [index, match] of inlineScripts.entries()) {
  try {
    new Function(match[1]);
  } catch (error) {
    errors.push(`Inline script ${index + 1} has invalid JavaScript: ${error.message}`);
  }
}
const dataText = await readFile(dataPath, "utf8");
if (/__TRIP_|__DESTINATION__|__DATES__|YYYY-MM-DD/.test(dataText)) {
  warnings.push("Template placeholders remain; replace them before publishing");
}
if (!(companion.days || []).length) errors.push("At least one day is required");

const result = {
  projectDir,
  days: companion.days?.length || 0,
  events: [...eventIds].length,
  bookings: companion.bookings?.length || 0,
  errors,
  warnings
};

console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
