import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { cp, rm } from "node:fs/promises";
import { ensureVercelRoutesManifest, watchVercelRoutesManifest } from "./ensure-vercel-routes-manifest.mjs";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const projectRoot = new URL("../", import.meta.url);
const controller = new AbortController();

const watcher = watchVercelRoutesManifest({ signal: controller.signal });
const build = spawn(process.execPath, [nextBin, "build", "--webpack"], {
  cwd: projectRoot,
  stdio: "inherit",
});

const exitCode = await new Promise((resolve) => {
  build.on("close", resolve);
});

controller.abort();

if (exitCode === 0) {
  await watcher;
  await ensureVercelRoutesManifest();

  // Vercel's post-build validator ALWAYS checks /vercel/path0/.next/ (workpath + distDir)
  // regardless of rootDirectory or outputDirectory settings. The build outputs to
  // project/.next/ (entrypath + distDir). We copy the entire .next to the repo root
  // so both locations satisfy the validator and the deployment respectively.
  const nextDir = new URL("../.next/", import.meta.url);      // project/.next/
  const rootNextDir = new URL("../../.next/", import.meta.url); // repo root .next/
  try {
    await rm(rootNextDir, { recursive: true, force: true });
    await cp(nextDir, rootNextDir, { recursive: true });
    console.log("Copied .next to repo root for Vercel post-build validation.");
  } catch (err) {
    console.error("Warning: could not copy .next to repo root:", err.message);
  }
}

process.exit(exitCode ?? 1);
