#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectDir = path.resolve(process.argv[2] || ".");
const htmlPath = path.join(projectDir, "index.html");
const dataPath = path.join(projectDir, "trip-data.js");
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

let html = "";
try {
  html = await readFile(htmlPath, "utf8");
  await readFile(dataPath, "utf8");
} catch (error) {
  console.error(`Missing required file: ${error.message}`);
  process.exit(1);
}

delete globalThis.TRIP_PLAN;
await import(`${pathToFileURL(dataPath).href}?validate=${Date.now()}`);
const plan = globalThis.TRIP_PLAN;
if (!plan || typeof plan !== "object") {
  console.error("trip-data.js must set globalThis.TRIP_PLAN");
  process.exit(1);
}

for (const key of ["meta", "routeStops", "stays", "days", "transportGuide", "actionItems", "feedback", "sources"]) {
  if (!(key in plan)) errors.push(`Missing top-level field: ${key}`);
}

if (plan.meta) {
  for (const key of ["title", "subtitle", "destination", "dates", "checkedOn", "slug"]) {
    requireText(plan.meta[key], `meta.${key}`);
  }
  if (plan.meta.checkedOn && !/^\d{4}-\d{2}-\d{2}$/.test(plan.meta.checkedOn)) {
    errors.push("meta.checkedOn must use YYYY-MM-DD");
  }
  if (plan.meta.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(plan.meta.slug)) {
    errors.push("meta.slug must use lowercase letters, numbers, and single hyphens");
  }
}

for (const key of ["routeStops", "stays", "days", "transportGuide", "actionItems", "feedback", "sources"]) {
  requireArray(plan[key], key);
}

const dayIds = new Set();
for (const [index, day] of (plan.days || []).entries()) {
  const prefix = `days[${index}]`;
  for (const key of ["id", "date", "place", "theme", "summary", "status"]) requireText(day[key], `${prefix}.${key}`);
  if (dayIds.has(day.id)) errors.push(`Duplicate day id: ${day.id}`);
  dayIds.add(day.id);
  requireArray(day.timeline, `${prefix}.timeline`);
  requireArray(day.alternatives, `${prefix}.alternatives`);
  requireArray(day.dining, `${prefix}.dining`);
  requireArray(day.notices, `${prefix}.notices`);
  if (!day.timeline?.length) errors.push(`${prefix}.timeline must contain at least one item`);
  if (!day.map || typeof day.map !== "object") errors.push(`${prefix}.map must be an object`);
  for (const [actionIndex, action] of (day.map?.actions || []).entries()) {
    requireText(action.label, `${prefix}.map.actions[${actionIndex}].label`);
    checkUrl(action.url, `${prefix}.map.actions[${actionIndex}].url`);
  }
  for (const [mealIndex, meal] of (day.dining || []).entries()) {
    requireText(meal.name, `${prefix}.dining[${mealIndex}].name`);
    requireText(meal.ratingSource, `${prefix}.dining[${mealIndex}].ratingSource`);
    requireText(meal.checkedOn, `${prefix}.dining[${mealIndex}].checkedOn`);
    checkUrl(meal.mapUrl, `${prefix}.dining[${mealIndex}].mapUrl`);
    checkUrl(meal.sourceUrl, `${prefix}.dining[${mealIndex}].sourceUrl`);
  }
}

const feedbackKeys = new Set();
for (const [index, field] of (plan.feedback || []).entries()) {
  const prefix = `feedback[${index}]`;
  requireText(field.key, `${prefix}.key`);
  requireText(field.label, `${prefix}.label`);
  requireArray(field.options, `${prefix}.options`);
  if (feedbackKeys.has(field.key)) errors.push(`Duplicate feedback key: ${field.key}`);
  feedbackKeys.add(field.key);
  if (!field.options?.includes(field.default)) errors.push(`${prefix}.default must appear in options`);
}

for (const [index, source] of (plan.sources || []).entries()) {
  requireText(source.label, `sources[${index}].label`);
  checkUrl(source.url, `sources[${index}].url`);
}

if (!html.includes('<script src="./trip-data.js"></script>')) errors.push("index.html must load ./trip-data.js");
if (!html.includes('id="app"')) errors.push('index.html must contain id="app"');
const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];
for (const [index, match] of inlineScripts.entries()) {
  try {
    new Function(match[1]);
  } catch (error) {
    errors.push(`Inline script ${index + 1} has invalid JavaScript: ${error.message}`);
  }
}
if (/__TRIP_|YYYY-MM-DD/.test(await readFile(dataPath, "utf8"))) {
  warnings.push("Template placeholders remain; replace them before publishing");
}
if (!(plan.days || []).length) errors.push("At least one day is required");

const result = {
  projectDir,
  days: plan.days?.length || 0,
  stays: plan.stays?.length || 0,
  transportSegments: plan.transportGuide?.length || 0,
  feedbackFields: plan.feedback?.length || 0,
  errors,
  warnings
};

console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
