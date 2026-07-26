#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const skillArg = args.find(arg => !arg.startsWith("--")) || ".";
const previousIndex = args.indexOf("--previous");
const previous = previousIndex >= 0 ? args[previousIndex + 1] : "";
const skillDir = path.resolve(skillArg);
const errors = [];

const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
const parseVersion = value => {
  const match = semverPattern.exec(value);
  return match ? match.slice(1).map(Number) : null;
};
const compare = (left, right) => {
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return 0;
};

let version = "";
let history = "";
let skill = "";
try {
  version = (await readFile(path.join(skillDir, "VERSION"), "utf8")).trim();
  history = await readFile(path.join(skillDir, "references", "release-history.md"), "utf8");
  skill = await readFile(path.join(skillDir, "SKILL.md"), "utf8");
} catch (error) {
  errors.push(`Missing release file: ${error.message}`);
}

const parsed = parseVersion(version);
if (!parsed) errors.push("VERSION must contain one stable semantic version such as 1.2.3");

const headings = [...history.matchAll(/^## v(\d+\.\d+\.\d+) - (\d{4}-\d{2}-\d{2})$/gm)];
if (!headings.length) {
  errors.push("release-history.md must contain at least one release heading");
} else if (headings[0][1] !== version) {
  errors.push(`Newest release-history version ${headings[0][1]} does not match VERSION ${version}`);
}
const versions = headings.map(match => match[1]);
if (new Set(versions).size !== versions.length) errors.push("release-history.md contains duplicate versions");
for (let index = 1; index < versions.length; index += 1) {
  const newer = parseVersion(versions[index - 1]);
  const older = parseVersion(versions[index]);
  if (!newer || !older || compare(newer, older) <= 0) {
    errors.push("release-history.md versions must be newest-first and strictly decreasing");
    break;
  }
}

if (previous) {
  const previousParsed = parseVersion(previous);
  if (!previousParsed) errors.push("--previous must be a stable semantic version");
  else if (parsed && compare(parsed, previousParsed) <= 0) {
    errors.push(`VERSION ${version} must be greater than previous version ${previous}`);
  }
}

if (!skill.includes("references/release-management.md")) {
  errors.push("SKILL.md must link to references/release-management.md");
}
if (!skill.includes("scripts/validate-release.mjs")) {
  errors.push("SKILL.md must require scripts/validate-release.mjs");
}

const result = {
  skillDir,
  version,
  previous: previous || null,
  releaseEntries: headings.length,
  errors
};
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);

