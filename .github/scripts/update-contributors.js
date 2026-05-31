const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const README_PATH = path.join(process.env.GITHUB_WORKSPACE || ".", "README.md");

const START_MARKER = "<!-- CONTRIBUTORS-START -->";
const END_MARKER   = "<!-- CONTRIBUTORS-END -->";

function sh(cmd) {
  return execSync(cmd, {
    encoding: "utf8",
    cwd: process.env.GITHUB_WORKSPACE,
  }).trim();
}

function getNewCommitters() {
  const before = process.env.BEFORE_SHA;
  const after  = process.env.AFTER_SHA;
  const committers = new Map(); // username -> { username, name, email }

  // Build the range of commits introduced by this push.
  let range = "";
  if (before && after && before !== "0000000000000000000000000000000000000000") {
    range = `${before}..${after}`;
  } else {
    range = "HEAD~1..HEAD";
  }

  try {
    // Get name + email for every commit in the range.
    const log = sh(
      `git log --format='%an|%ae' --no-merges ${range} 2>/dev/null || git log --format='%an|%ae' -1 HEAD`
    );

    const lines = log.split("\n").filter(Boolean);
    for (const line of lines) {
      const [name, email] = line.split("|");
      if (!email) continue;

      let username = "";
      const noreplyMatch = email.match(/^\d+\+([^@]+)@users\.noreply\.github\.com$/);
      if (noreplyMatch) {
        username = noreplyMatch[1];
      } else {
        // Fallback: use the part before '@' (e.g. from a personal email)
        username = email.split("@")[0].toLowerCase();
      }

      // Skip the GitHub Actions bot itself.
      if (username.includes("github-actions")) continue;

      if (!committers.has(username)) {
        committers.set(username, { username, name: name || username, email });
      }
    }
  } catch (err) {
    console.error("Failed to read git log:", err.message);
  }

  return Array.from(committers.values());
}

async function enrichContributor({ username, name, email }) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "update-contributors-bot",
      },
    });

    if (res.ok) {
      const data = await res.json();
      return {
        username: data.login,
        name: data.name || data.login,
        avatarUrl: data.avatar_url,
        htmlUrl: data.html_url,
      };
    }
  } catch (_) {
    // API call failed – fall back to constructed URLs.
  }

  return {
    username,
    name: name || username,
    avatarUrl: `https://github.com/${username}.png`,
    htmlUrl: `https://github.com/${username}`,
  };
}

function getExistingContributors(content) {
  const startIdx = content.indexOf(START_MARKER);
  const endIdx   = content.indexOf(END_MARKER);

  if (startIdx === -1 || endIdx === -1) {
    return { usernames: new Set(), blockContent: "" };
  }

  const blockContent = content.slice(startIdx + START_MARKER.length, endIdx);
  const existing = new Set();

  const linkRegex = /href="https:\/\/github\.com\/([^"/]+)"/g;
  let match;
  while ((match = linkRegex.exec(blockContent)) !== null) {
    existing.add(match[1].toLowerCase());
  }

  return { usernames: existing, blockContent };
}

function parseExistingContributors(blockContent) {
  const contributors = [];
  const linkRegex = /href="https:\/\/github\.com\/([^"/]+)"/g;
  const seen = new Set();
  let match;

  while ((match = linkRegex.exec(blockContent)) !== null) {
    const username = match[1];
    if (!seen.has(username.toLowerCase())) {
      seen.add(username.toLowerCase());
      contributors.push({
        username,
        name: username,
        avatarUrl: `https://github.com/${username}.png`,
        htmlUrl: `https://github.com/${username}`,
      });
    }
  }

  return contributors;
}

function buildContributorRow({ username, name, avatarUrl, htmlUrl }) {
  const safeName = name
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  return [
    `    <td align="center">`,
    `      <a href="${htmlUrl}" title="${safeName}">`,
    `        <img src="${avatarUrl}&s=100" width="80px;" alt="${safeName}"/><br />`,
    `        <sub><b>${safeName}</b></sub>`,
    `      </a>`,
    `    </td>`,
  ].join("\n");
}

function buildContributorBlock(contributors, maxPerRow = 6) {
  const rows = [];
  for (let i = 0; i < contributors.length; i += maxPerRow) {
    const rowContributors = contributors.slice(i, i + maxPerRow);
    const cells = rowContributors.map(buildContributorRow).join("\n");
    rows.push(`  <tr>\n${cells}\n  </tr>`);
  }

  return [
    START_MARKER,
    "",
    "<table>",
    ...rows,
    "</table>",
    "",
    END_MARKER,
  ].join("\n");
}


async function main() {
  console.log("::group::📄 Reading README");
  const originalContent = fs.readFileSync(README_PATH, "utf8");
  console.log("✅ README loaded");
  console.log("::endgroup::");

  if (!originalContent.includes(START_MARKER)) {
    console.log("::warning:: START_MARKER not found in README.");
    console.log("Place these exactly where you want the contributor grid:");
    console.log(`  ${START_MARKER}`);
    console.log(`  ${END_MARKER}`);
    process.exit(0);
  }

  console.log("::group::🔍 Finding new committers");
  const newCommitters = getNewCommitters();
  console.log(`${newCommitters.length} unique author(s) in this push:`);
  newCommitters.forEach((c) => console.log(`  • ${c.username} <${c.email}>`));
  console.log("::endgroup::");

  if (newCommitters.length === 0) {
    console.log("ℹ️  No committers found. Exiting.");
    return;
  }

  console.log("::group::📋 Checking existing contributors");
  const { usernames: existingUsernames, blockContent } =
    getExistingContributors(originalContent);
  console.log(`${existingUsernames.size} contributor(s) already listed.`);
  console.log("::endgroup::");

  const trulyNew = [];
  for (const c of newCommitters) {
    if (!existingUsernames.has(c.username.toLowerCase())) {
      trulyNew.push(c);
    } else {
      console.log(`⏭️  @${c.username} – already in README, skipping`);
    }
  }

  if (trulyNew.length === 0) {
    console.log("✅ All committers already listed. Nothing to do.");
    return;
  }

  console.log("::group::✨ Enriching via GitHub API");
  const enriched = [];
  for (const c of trulyNew) {
    const profile = await enrichContributor(c);
    enriched.push(profile);
    console.log(`  ✓ @${profile.username} → ${profile.name}`);
  }
  console.log("::endgroup::");

  const existingContributors = parseExistingContributors(blockContent);
  const allContributors = [...existingContributors, ...enriched];
  const newBlock = buildContributorBlock(allContributors);

  const startIdx = originalContent.indexOf(START_MARKER);
  const endIdx   = originalContent.indexOf(END_MARKER);
  const updatedContent =
    originalContent.slice(0, startIdx) +
    newBlock +
    originalContent.slice(endIdx + END_MARKER.length);

  console.log("::group::💾 Writing updated README");
  fs.writeFileSync(README_PATH, updatedContent, "utf8");
  console.log("✅ README written");
  console.log("::endgroup::");

  const names = enriched.map((c) => `@${c.username}`).join(", ");
  const commitMsg = `docs: add contributor(s) ${names} to README`;

  console.log("::group::🚀 Committing & pushing");
  sh(`git config user.name "github-actions[bot]"`);
  sh(`git config user.email "github-actions[bot]@users.noreply.github.com"`);

  const status = sh("git status --porcelain README.md");
  if (status) {
    sh(`git add README.md`);
    sh(`git commit -m "${commitMsg}"`);
    sh(`git push origin HEAD:main`);
    console.log(`✅ Committed: ${commitMsg}`);
  } else {
    console.log("⚠️  No changes detected (README unchanged).");
  }
  console.log("::endgroup::");
}

main().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
