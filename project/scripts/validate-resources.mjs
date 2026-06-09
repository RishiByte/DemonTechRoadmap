/**
 * validate-resources.mjs
 *
 * Validates every JSON file under `project/src/data/resources/`.
 * Checks for:
 *   - Valid JSON syntax
 *   - Required top-level fields (id, title, description, categories)
 *   - Required category fields (categoryId, name, resources)
 *   - Required resource fields (id, name, url, type, difficulty)
 *   - Duplicate resource IDs within a file
 *   - Duplicate resource URLs within a file
 *   - Empty or whitespace-only titles / names
 *   - Invalid difficulty values
 *
 * Usage:
 *   node project/scripts/validate-resources.mjs
 *
 * Exit code 0 = all valid, exit code 1 = errors found.
 */

import { readdir, readFile } from "node:fs/promises";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const RESOURCES_DIR = join(__dirname, "..", "src", "data", "resources");

const VALID_DIFFICULTIES = new Set([
  "Beginner",
  "Intermediate",
  "Advanced",
  "Beginner to Intermediate",
  "Intermediate to Advanced",
  "Beginner to Advanced",
]);

const REQUIRED_TOP_LEVEL = ["id", "title", "description", "categories"];
const REQUIRED_CATEGORY = ["categoryId", "name", "resources"];
const REQUIRED_RESOURCE = ["id", "name", "url", "type", "difficulty"];

/**
 * Collects validation errors for a single resource JSON file.
 *
 * @param {string} filePath - Absolute path to the JSON file.
 * @returns {Promise<string[]>} A list of human-readable error messages.
 */
async function validateResourceFile(filePath) {
  const errors = [];
  const fileName = basename(filePath);

  let raw;
  try {
    raw = await readFile(filePath, "utf-8");
  } catch {
    errors.push(`${fileName}: Could not read file.`);
    return errors;
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (parseErr) {
    errors.push(`${fileName}: Invalid JSON – ${parseErr.message}`);
    return errors;
  }

  // --- Top-level field checks ---
  for (const field of REQUIRED_TOP_LEVEL) {
    if (data[field] === undefined || data[field] === null) {
      errors.push(`${fileName}: Missing required top-level field "${field}".`);
    }
  }

  if (typeof data.title === "string" && data.title.trim() === "") {
    errors.push(`${fileName}: Top-level "title" is empty.`);
  }

  if (!Array.isArray(data.categories)) {
    errors.push(`${fileName}: "categories" must be an array.`);
    return errors;
  }

  const allResourceIds = new Set();
  const allResourceUrls = new Set();

  // --- Category & resource checks ---
  data.categories.forEach((cat, catIdx) => {
    const catLabel = `${fileName} > category[${catIdx}]`;

    for (const field of REQUIRED_CATEGORY) {
      if (cat[field] === undefined || cat[field] === null) {
        errors.push(`${catLabel}: Missing required field "${field}".`);
      }
    }

    if (typeof cat.name === "string" && cat.name.trim() === "") {
      errors.push(`${catLabel}: Category "name" is empty.`);
    }

    if (!Array.isArray(cat.resources)) {
      errors.push(`${catLabel}: "resources" must be an array.`);
      return;
    }

    cat.resources.forEach((res, resIdx) => {
      const resLabel = `${fileName} > category[${catIdx}] > resource[${resIdx}]`;

      for (const field of REQUIRED_RESOURCE) {
        if (res[field] === undefined || res[field] === null) {
          errors.push(`${resLabel}: Missing required field "${field}".`);
        }
      }

      // Empty name check
      if (typeof res.name === "string" && res.name.trim() === "") {
        errors.push(`${resLabel}: Resource "name" is empty.`);
      }

      // Empty URL check
      if (typeof res.url === "string" && res.url.trim() === "") {
        errors.push(`${resLabel}: Resource "url" is empty.`);
      }

      // Difficulty validation
      if (typeof res.difficulty === "string" && !VALID_DIFFICULTIES.has(res.difficulty)) {
        errors.push(
          `${resLabel}: Invalid difficulty "${res.difficulty}". ` +
          `Allowed: ${[...VALID_DIFFICULTIES].join(", ")}.`
        );
      }

      // Duplicate ID check
      if (res.id) {
        if (allResourceIds.has(res.id)) {
          errors.push(`${resLabel}: Duplicate resource ID "${res.id}".`);
        }
        allResourceIds.add(res.id);
      }

      // Duplicate URL check
      if (res.url) {
        if (allResourceUrls.has(res.url)) {
          errors.push(`${resLabel}: Duplicate resource URL "${res.url}".`);
        }
        allResourceUrls.add(res.url);
      }
    });
  });

  return errors;
}

/**
 * Main entry point. Discovers all JSON files in the resources directory
 * and runs validation against each one.
 */
async function main() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║       Resource JSON Validation                  ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  let files;
  try {
    files = (await readdir(RESOURCES_DIR)).filter((f) => f.endsWith(".json"));
  } catch {
    console.error(`❌ Could not read resources directory: ${RESOURCES_DIR}`);
    process.exit(1);
  }

  if (files.length === 0) {
    console.log("⚠️  No JSON files found in the resources directory.");
    process.exit(0);
  }

  console.log(`Found ${files.length} resource file(s):\n`);

  let totalErrors = 0;

  for (const file of files) {
    const filePath = join(RESOURCES_DIR, file);
    const errors = await validateResourceFile(filePath);

    if (errors.length === 0) {
      console.log(`  ✅ ${file}`);
    } else {
      console.log(`  ❌ ${file} — ${errors.length} error(s):`);
      errors.forEach((err) => console.log(`     • ${err}`));
      totalErrors += errors.length;
    }
  }

  console.log("");

  if (totalErrors > 0) {
    console.log(`❌ Validation failed with ${totalErrors} error(s). Please fix the issues above.`);
    process.exit(1);
  } else {
    console.log("✅ All resource files passed validation.");
    process.exit(0);
  }
}

main();
