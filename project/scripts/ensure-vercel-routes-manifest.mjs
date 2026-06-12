import { copyFile, access, mkdir } from "node:fs/promises";
import { constants } from "node:fs";

// Primary: project/.next/routes-manifest-deterministic.json (matches outputDirectory in vercel.json)
const source = new URL("../.next/routes-manifest.json", import.meta.url);
const target = new URL("../.next/routes-manifest-deterministic.json", import.meta.url);

// Vercel's post-build validator (lstat) ALWAYS checks /vercel/path0/.next/ at the repo root
// regardless of the outputDirectory setting. We copy both manifest files there too.
const rootNextDir = new URL("../../.next/", import.meta.url);
const rootManifest = new URL("../../.next/routes-manifest.json", import.meta.url);
const rootDeterministic = new URL("../../.next/routes-manifest-deterministic.json", import.meta.url);

async function copyToRootNext() {
  try {
    await mkdir(rootNextDir, { recursive: true });
    await copyFile(source, rootManifest);
    await copyFile(source, rootDeterministic);
  } catch {
    // Best-effort — project/.next copy is still valid for deployment.
  }
}

export async function ensureVercelRoutesManifest() {
  try {
    await access(target, constants.F_OK);
  } catch {
    await copyFile(source, target);
  }
  // Always replicate manifests to root .next so Vercel's post-build lstat succeeds.
  await copyToRootNext();
}

export async function watchVercelRoutesManifest({ signal, timeoutMs = 120000 } = {}) {
  const startedAt = Date.now();
  let copiedRoutesManifest = false;

  while (!signal?.aborted && Date.now() - startedAt < timeoutMs) {
    try {
      await access(source, constants.F_OK);
      await ensureVercelRoutesManifest();
      copiedRoutesManifest = true;
    } catch {
      // The file appears late in Next's build. Keep polling until it exists.
    }

    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  return copiedRoutesManifest;
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  if (process.argv.includes("--watch")) {
    const copied = await watchVercelRoutesManifest();
    process.exit(copied ? 0 : 1);
  }

  await ensureVercelRoutesManifest();
}
