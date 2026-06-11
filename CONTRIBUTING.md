# Contributing to Demon Tech Roadmap

Thank you for your interest in contributing! 🚀
We welcome contributions from developers of all experience levels — whether it's your first PR or your hundredth.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Branch Naming & Commit Style](#branch-naming--commit-style)
3. [Claiming Issues & Asking Questions](#claiming-issues--asking-questions)
4. [Contribution Guidelines](#contribution-guidelines)
5. [PR Checklist](#pr-checklist)
6. [Need Help?](#need-help)

---

# Getting Started

Follow these steps to make your first contribution:

### 1. Fork the repository

Click the **Fork** button at the top right of the repo page. This creates your own copy of the project.

### 2. Clone your fork

```bash
git clone https://github.com/your-username/DemonTechRoadmap.git
cd DemonTechRoadmap
```

### 3. Create a new branch

```bash
git checkout -b feature/your-feature-name
```

### 4. Make your changes

Edit the files you need to change. Test that everything works before moving on.

### 5. Commit your changes

```bash
git commit -m "Add: your feature"
```

### 6. Push your branch

```bash
git push origin feature/your-feature-name
```

### 7. Open a Pull Request

Go to your fork on GitHub. You'll see a **"Compare & pull request"** button — click it, fill in the description, and submit.

---

# Branch Naming & Commit Style

Using a consistent format makes it easier for maintainers to understand your work at a glance.

## Branch Names

| Type          | Format                      | Example                           |
| ------------- | --------------------------- | --------------------------------- |
| New feature   | `feature/short-description` | `feature/add-python-roadmap`      |
| Bug fix       | `fix/short-description`     | `fix/broken-link`                 |
| Documentation | `docs/short-description`    | `docs/improve-contributing-guide` |

## Commit Messages

Follow this format for every commit:

```text
Add: what was added
Fix: what was fixed
Docs: what documentation was changed
Update: what was updated
```

### Examples

```bash
git commit -m "Add: Python roadmap section"
git commit -m "Fix: broken link in README"
git commit -m "Docs: improve PR checklist in CONTRIBUTING.md"
```

---

# Claiming Issues & Asking Questions

New to open source? Here's how to get started the right way:

* **Comment before you start.** Find an issue you want to work on, leave a comment like *"Hi, I'd like to work on this!"*, and wait to be assigned before writing any code.
* **Don't open a PR for an unassigned issue.** It may be closed without review.
* **Ask questions early.** If something in the issue is unclear, ask in the comments — don't guess.
* **Communicate if you're stuck.** If you can't finish an issue, let the maintainer know so someone else can pick it up.
* **One issue at a time.** Finish and submit your current work before claiming another issue.

---

# Contribution Guidelines

* Follow the existing project structure — don't reorganize folders or rename files unnecessarily
* Write clean, readable code — keep it simple and easy to understand
* Test your changes locally before submitting
* Keep each PR focused on **one issue only** — don't bundle unrelated changes
* Always reference the issue your PR resolves in the PR description
* **Roadmap Data Quality:** Please read our [Roadmap Data Quality Guidelines](ROADMAP_DATA_QUALITY.md) before submitting or modifying roadmap topics and resources.

---

## Resource Link Review Checklist

When adding, updating, or reviewing external learning resources (articles, videos, documentation) for our roadmaps, please use this checklist to ensure high-quality content:

* [ ] **No Duplicates:** Verify that this exact resource URL isn't already used somewhere else in the project.
* [ ] **Active & Working:** Click the link to confirm it loads successfully and does not return a 404 or dead page error.
* [ ] **Free & Accessible:** Ensure the primary content is free to access. Avoid resources hidden behind mandatory paywalls.
* [ ] **Beginner Friendly:** Confirm the material is easy to follow, avoids unnecessary jargon, and suits the roadmap level.
* [ ] **Up to Date:** Check that the information is modern and relevant to the current state of technology.

### What to do with Broken or Low-Quality Links?
If you find a link during your review that is broken, outdated, or paid-only:
1. **Replace It (Preferred):** Find a high-quality, free alternative resource and update the URL/title in your pull request.
2. **Remove It:** If no immediate alternative is available, remove the link entirely so users don't encounter dead ends.
3. **Flag It:** If you aren't sure what to replace it with, open an issue on the repository detailing the broken link so the community can find an alternative.

# PR Checklist

Before you open a Pull Request, go through every item below. PRs missing key items may be sent back for revision.

* [ ] I have tested my changes locally and they work correctly
* [ ] I have linked the related issue (e.g. `Closes #51`) in the PR description
* [ ] My PR addresses only one issue — no unrelated changes are included
* [ ] I have attached screenshots or a screen recording *(required for any visual or UI changes)*
* [ ] My code follows the existing project structure and style
* [ ] My branch name uses the correct format: `feature/`, `fix/`, or `docs/`
* [ ] My commit messages use the correct format: `Add:`, `Fix:`, `Docs:`, or `Update:`
* [ ] I have read and followed this CONTRIBUTING guide

---

# Need Help?

Stuck on something? Don't hesitate to reach out:

* 💬 **Discord** — Join our community server for quick help
* 🗣️ **GitHub Discussions** — Open a discussion thread in this repository
* 📝 **Issue Comments** — Ask directly on the issue you're working on

We're happy to help — no question is too small!

Happy Contributing! 🎉
