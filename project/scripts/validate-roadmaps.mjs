/**
 * validate-roadmaps.mjs
 *
 * Validates every JSON file under `project/src/data/roadmaps/`.
 * Checks for:
 *   - Valid JSON syntax
 *   - Required top-level fields (id, title, description, metadata, phases)
 *   - Required metadata fields (difficulty, estimatedTime, version, lastUpdated)
 *   - Required phase fields (phaseId, title, topics)
 *   - Required topic fields (topicId, name, description, importance)
 *   - Duplicate phase IDs within a file
 *   - Duplicate topic IDs within a file
 *   - Empty or whitespace-only titles / names
 *   - Invalid importance values
 *   - Resource entries missing name or url within topics
 *
 * Usage:
 *   node project/scripts/validate-roadmaps.mjs
 *
 * Exit code 0 = all valid, exit code 1 = errors found.
 */

import { readdir, readFile } from "node:fs/promises";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROADMAPS_DIR = join(__dirname, "..", "src", "data", "roadmaps");

const VALID_IMPORTANCE = new Set(["Critical", "High", "Medium", "Low"]);

const REQUIRED_TOP_LEVEL = ["id", "title", "description", "metadata", "phases"];
const REQUIRED_METADATA = ["difficulty", "estimatedTime", "version", "lastUpdated"];
const REQUIRED_PHASE = ["phaseId", "title", "topics"];
const REQUIRED_TOPIC = ["topicId", "name", "description", "importance"];

/**
 * Collects validation errors for a single roadmap JSON file.
 *
 * @param {string} filePath - Absolute path to the JSON file.
 * @returns {Promise<string[]>} A list of human-readable error messages.
 */
async function validateRoadmapFile(filePath) {
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

  // --- Metadata checks ---
  if (data.metadata && typeof data.metadata === "object") {
    for (const field of REQUIRED_METADATA) {
      if (data.metadata[field] === undefined || data.metadata[field] === null) {
        errors.push(`${fileName}: Missing required metadata field "${field}".`);
      }
    }
  } else {
    errors.push(`${fileName}: Missing or invalid "metadata" object.`);
  }

  if (!Array.isArray(data.phases)) {
    errors.push(`${fileName}: "phases" must be an array.`);
    return errors;
  }

  const allPhaseIds = new Set();
  const allTopicIds = new Set();

  // --- Phase & topic checks ---
  data.phases.forEach((phase, phaseIdx) => {
    const phaseLabel = `${fileName} > phase[${phaseIdx}]`;

    for (const field of REQUIRED_PHASE) {
      if (phase[field] === undefined || phase[field] === null) {
        errors.push(`${phaseLabel}: Missing required field "${field}".`);
      }
    }

    if (typeof phase.title === "string" && phase.title.trim() === "") {
      errors.push(`${phaseLabel}: Phase "title" is empty.`);
    }

    // Duplicate phase ID check
    if (phase.phaseId) {
      if (allPhaseIds.has(phase.phaseId)) {
        errors.push(`${phaseLabel}: Duplicate phase ID "${phase.phaseId}".`);
      }
      allPhaseIds.add(phase.phaseId);
    }

    if (!Array.isArray(phase.topics)) {
      errors.push(`${phaseLabel}: "topics" must be an array.`);
      return;
    }

    phase.topics.forEach((topic, topicIdx) => {
      const topicLabel = `${fileName} > phase[${phaseIdx}] > topic[${topicIdx}]`;

      for (const field of REQUIRED_TOPIC) {
        if (topic[field] === undefined || topic[field] === null) {
          errors.push(`${topicLabel}: Missing required field "${field}".`);
        }
      }

      // Empty name check
      if (typeof topic.name === "string" && topic.name.trim() === "") {
        errors.push(`${topicLabel}: Topic "name" is empty.`);
      }

      // Importance validation
      if (typeof topic.importance === "string" && !VALID_IMPORTANCE.has(topic.importance)) {
        errors.push(
          `${topicLabel}: Invalid importance "${topic.importance}". ` +
          `Allowed: ${[...VALID_IMPORTANCE].join(", ")}.`
        );
      }

      // Duplicate topic ID check
      if (topic.topicId) {
        if (allTopicIds.has(topic.topicId)) {
          errors.push(`${topicLabel}: Duplicate topic ID "${topic.topicId}".`);
        }
        allTopicIds.add(topic.topicId);
      }

      // Validate resources within topics (if present)
      if (Array.isArray(topic.resources)) {
        topic.resources.forEach((res, resIdx) => {
          const resLabel = `${topicLabel} > resource[${resIdx}]`;

          if (!res.name || (typeof res.name === "string" && res.name.trim() === "")) {
            errors.push(`${resLabel}: Resource "name" is missing or empty.`);
          }

          if (!res.url || (typeof res.url === "string" && res.url.trim() === "")) {
            errors.push(`${resLabel}: Resource "url" is missing or empty.`);
          }
        });
      }
    });
  });

  return errors;
}

/**
 * Main entry point. Discovers all JSON files in the roadmaps directory
 * and runs validation against each one.
 */
async function main() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║       Roadmap JSON Validation                   ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  let files;
  try {
    files = (await readdir(ROADMAPS_DIR)).filter((f) => f.endsWith(".json"));
  } catch {
    console.error(`❌ Could not read roadmaps directory: ${ROADMAPS_DIR}`);
    process.exit(1);
  }

  if (files.length === 0) {
    console.log("⚠️  No JSON files found in the roadmaps directory.");
    process.exit(0);
  }

  console.log(`Found ${files.length} roadmap file(s):\n`);

  let totalErrors = 0;

  for (const file of files) {
    const filePath = join(ROADMAPS_DIR, file);
    const errors = await validateRoadmapFile(filePath);

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
    console.log("✅ All roadmap files passed validation.");
    process.exit(0);
  }
}

main();
