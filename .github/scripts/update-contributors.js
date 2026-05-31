const fs = require("fs");
const path = require("path");
const { execSync, execFileSync } = require("child_process");

const README_PATH = path.join(process.env.GITHUB_WORKSPACE || ".", "README.md");

const START_MARKER = "<!-- CONTRIBUTORS-START -->";
const END_MARKER   = "<!-- CONTRIBUTORS-END -->";

function sh(cmd) {
  return execSync(cmd, {
    encoding: "utf8",
    cwd: process.env.GITHUB_WORKSPACE,
  }).trim();
}

function git(...args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    cwd: process.env.GITHUB_WORKSPACE,
  }).trim();
}

function getNewCommitters() {
  const before = process.env.BEFORE_SHA;
  const after  = process.env.AFTER_SHA;
  const committers = new Map();

  let range = "";
  if (before && after && before !== "0000000000000000000000000000000000000000") {
    range = `${before}..${after}`;
  } else {
    range = "HEAD~1..HEAD";
  }

  try {
    const log = sh(
      `git log --format='%an|%ae' --no-merges ${range} 2>/dev/null || git log --format='%an|%ae' -1 HEAD`
    );

    const lines = log.split("\n").filter(Boolean);
    for (const line of lines) {
      const [name, email] = line.split("|");
      if (!email) continue;

      let guessedUsername = "";
      const noreplyMatch = email.match(/^\d+\+([^@]+)@users\.noreply\.github\.com$/);
      if (noreplyMatch) {
        guessedUsername = noreplyMatch[1];
      } else {
        guessedUsername = email.split("@")[0].toLowerCase();
      }

      if (guessedUsername.includes("github-actions")) continue;

      if (!committers.has(email.toLowerCase())) {
        committers.set(email.toLowerCase(), {
          guessedUsername,
          name: name || guessedUsername,
          email,
        });
      }
    }
  } catch (err) {
    console.error("Failed to read git log:", err.message);
  }

  return Array.from(committers.values());
}

const USERNAME_RE = /^[a-z0-9]([a-z0-9]|-(?!-)){0,38}$/i;

async function enrichContributor({ guessedUsername, name, email }) {
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "update-contributors-bot",
  };

  // 1. Direct lookup by guessed username
  try {
    const direct = await fetch(
      `https://api.github.com/users/${guessedUsername}`,
      { headers }
    );
    if (direct.ok) {
      const data = await direct.json();
      // Validate API response fields
      if (
        data.login &&
        USERNAME_RE.test(data.login) &&
        typeof data.avatar_url === "string" &&
        data.avatar_url.startsWith("https://avatars.githubusercontent.com/") &&
        typeof data.html_url === "string" &&
        data.html_url.startsWith("https://github.com/")
      ) {
        console.log(`    ✓ direct lookup: @${data.login}`);
        return {
          username: data.login,
          name: data.name || data.login,
          avatarUrl: data.avatar_url,
          htmlUrl: data.html_url,
        };
      }
      console.warn(`    ⚠ direct lookup returned invalid fields for "${guessedUsername}", falling through`);
    }
  } catch (err) {
    console.warn(`    ⚠ API error for "${guessedUsername}": ${err.message}`);
  }

  // 2. Name-based search
  if (name && name !== guessedUsername) {
    try {
      const q = encodeURIComponent(`${name} in:name type:user`);
      const search = await fetch(
        `https://api.github.com/search/users?q=${q}&per_page=5`,
        { headers }
      );
      if (search.ok) {
        const { items } = await search.json();
        if (items && items.length > 0) {
          const lowerName = name.toLowerCase();
          const scored = items.map((item) => {
            let score = 0;
            const loginLower = item.login.toLowerCase();
            const nameLower = (item.name || "").toLowerCase();
            if (nameLower === lowerName) score += 100;
            if (loginLower === lowerName) score += 90;
            if (nameLower.includes(lowerName)) score += 50;
            if (loginLower.includes(lowerName.replace(/\s+/g, ""))) score += 40;
            if (loginLower.includes(lowerName.replace(/\s+/g, "-"))) score += 40;
            return { ...item, score };
          });
          scored.sort((a, b) => b.score - a.score);
          const best = scored[0];

          if (best.score > 0) {
            console.log(`    ✓ name search: "${name}" → @${best.login} (score: ${best.score})`);
            return {
              username: best.login,
              name: best.login,
              avatarUrl: best.avatar_url,
              htmlUrl: best.html_url,
            };
          }
        }
      }
    } catch (err) {
      console.warn(`    ⚠ API error during name search: ${err.message}`);
    }
  }

  // 3. Commit-based lookup using email
  if (email) {
    try {
      const emailEncoded = encodeURIComponent(email);
      const repoParts = (process.env.GITHUB_REPOSITORY || "").split("/");
      const repoQuery = repoParts.length === 2 ? `repo:${repoParts[0]}/${repoParts[1]}+` : "";
      const commitSearch = await fetch(
        `https://api.github.com/search/commits?q=${repoQuery}author-email:${emailEncoded}&per_page=1`,
        {
          headers: {
            ...headers,
            Accept: "application/vnd.github.cloak-preview",
          }
        }
      );
      if (commitSearch.ok) {
        const data = await commitSearch.json();
        if (data.items && data.items.length > 0) {
          const author = data.items[0].author;
          if (author) {
            console.log(`    ✓ commit search found: @${author.login}`);
            return {
              username: author.login,
              name: author.login,
              avatarUrl: author.avatar_url,
              htmlUrl: author.html_url,
            };
          }
        }
      }
    } catch (err) {
      console.warn(`    ⚠ Commit search error: ${err.message}`);
    }
  }

  // 4. Fallback
  console.log(`    ⚠ using fallback for guessed username "${guessedUsername}"`);
  const safeUsername = USERNAME_RE.test(guessedUsername) ? guessedUsername : "unknown-user";
  return {
    username: safeUsername,
    name: name || safeUsername,
    avatarUrl: `https://github.com/${safeUsername}.png`,
    htmlUrl: `https://github.com/${safeUsername}`,
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
  const rowRegex = /<td[\s\S]*?<\/td>/g;
  const seen = new Set();
  let match;

  while ((match = rowRegex.exec(blockContent)) !== null) {
    const td = match[0];
    const hrefMatch = td.match(/href="(https:\/\/github\.com\/([^"/]+))"/);
    const srcMatch = td.match(/src="([^"]+)"/);
    const nameMatch = td.match(/<sub><b>([^<]+)<\/b><\/sub>/);

    if (hrefMatch && srcMatch) {
      const username = hrefMatch[2];
      if (!seen.has(username.toLowerCase())) {
        seen.add(username.toLowerCase());
        contributors.push({
          username,
          name: nameMatch ? nameMatch[1] : username,
          avatarUrl: srcMatch[1],
          htmlUrl: hrefMatch[1],
        });
      }
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

  const separator = avatarUrl.includes("?") ? "&" : "?";

  return [
    `    <td align="center">`,
    `      <a href="${htmlUrl}" title="${safeName}">`,
    `        <img src="${avatarUrl}${separator}s=100" width="80px;" alt="${safeName}"/><br />`,
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
  newCommitters.forEach((c) => console.log(`  • ${c.guessedUsername} <${c.email}>`));
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

  if (existingUsernames.size === 0) {
    console.log("::group::🌱 First run — seeding all historical contributors");
    const history = sh(
      "git log --format='%an|%ae' --no-merges --reverse"
    );
    const histLines = history.split("\n").filter(Boolean);
    const seen = new Set();
    const historicalCommitters = [];

    for (const line of histLines) {
      const [name, email] = line.split("|");
      if (!email) continue;

      const noreplyMatch = email.match(/^\d+\+([^@]+)@users\.noreply\.github\.com$/);
      const guessedUsername = noreplyMatch
        ? noreplyMatch[1]
        : email.split("@")[0].toLowerCase();

      if (guessedUsername.includes("github-actions")) continue;
      if (seen.has(email.toLowerCase())) continue;

      seen.add(email.toLowerCase());
      historicalCommitters.push({ guessedUsername, name: name || guessedUsername, email });
    }

    console.log(`Found ${historicalCommitters.length} historical contributor(s):`);
    historicalCommitters.forEach((c) => console.log(`  • ${c.guessedUsername}`));

    const enrichedHistory = [];
    for (const c of historicalCommitters) {
      const profile = await enrichContributor(c);
      enrichedHistory.push(profile);
    }

    const seedBlock = buildContributorBlock(enrichedHistory);
    const startIdx = originalContent.indexOf(START_MARKER);
    const endIdx   = originalContent.indexOf(END_MARKER);
    const updatedContent =
      originalContent.slice(0, startIdx) +
      seedBlock +
      originalContent.slice(endIdx + END_MARKER.length);

    console.log("::group::💾 Writing seeded README");
    fs.writeFileSync(README_PATH, updatedContent, "utf8");
    console.log(`✅ Seeded ${enrichedHistory.length} contributor(s)`);
    console.log("::endgroup::");

    console.log("::group::🚀 Committing seed");
    git("config", "user.name", "github-actions[bot]");
    git("config", "user.email", "github-actions[bot]@users.noreply.github.com");
    git("add", "README.md");
    git("commit", "-m", "docs: seed contributor table with all historical contributors");

    try {
      git("pull", "--rebase", "origin", "main");
    } catch (err) {
      console.error("❌ Rebase failed — likely conflicting changes. Exiting.");
      process.exit(1);
    }

    git("push", "origin", "HEAD:main");
    console.log("✅ Seed committed");
    console.log("::endgroup::");
    return;
  }

  console.log("::group::✨ Resolving GitHub profiles");
  const enriched = [];
  for (const c of newCommitters) {
    const profile = await enrichContributor(c);
    enriched.push(profile);
  }
  console.log("::endgroup::");

  const trulyNew = [];
  for (const profile of enriched) {
    if (!existingUsernames.has(profile.username.toLowerCase())) {
      trulyNew.push(profile);
    } else {
      console.log(`⏭️  @${profile.username} – already in README, skipping`);
    }
  }

  if (trulyNew.length === 0) {
    console.log("✅ All committers already listed. Nothing to do.");
    return;
  }

  const existingContributors = parseExistingContributors(blockContent);
  const allContributors = [...existingContributors, ...trulyNew];
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

  const names = trulyNew.map((c) => `@${c.username}`).join(", ");
  const commitMsg = `docs: add contributor(s) ${names} to README`;

  console.log("::group::🚀 Committing & pushing");
  git("config", "user.name", "github-actions[bot]");
  git("config", "user.email", "github-actions[bot]@users.noreply.github.com");

  const status = git("status", "--porcelain", "README.md");
  if (status) {
    git("add", "README.md");
    git("commit", "-m", commitMsg);

    try {
      git("pull", "--rebase", "origin", "main");
    } catch (err) {
      console.error("❌ Rebase failed — likely conflicting changes. Exiting.");
      process.exit(1);
    }

    git("push", "origin", "HEAD:main");
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
