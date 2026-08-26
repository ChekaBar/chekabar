# CLAUDE.md — Project & Git workflow instructions

Project: **CHEKA — Bar Café & Luggage Storage** website.

- **Repository:** `https://github.com/ChekaBar/chekabar` — remote `origin`, default
  branch **`main`**.
- **Local path:** `D:\github\chekabar` (the working directory may open at the
  parent `D:\github` — if so, `cd` into `chekabar` before any Git command).
- **Stack:** static **HTML5 + CSS3 + vanilla JavaScript** only. No frameworks, no
  build step, no backend. Must keep working when `index.html` is opened directly
  and when deployed on **GitHub Pages** — all asset/link paths stay **relative**
  (never a leading `/`).

All editable content lives in `js/data.js`. Behaviour lives in `js/script.js`
(safe to load on both `index.html` and `luggage-storage.html` — every module
guards for missing elements). Design tokens are in `css/styles.css` `:root`.
`.nojekyll` must stay in the repo root (GitHub Pages needs it).

---

## Git workflow — follow this in EVERY session

### Before starting new work
1. Verify this folder is the `chekabar` Git repo with remote `origin` pointing at
   `github.com/ChekaBar/chekabar`, and that the current branch is **`main`**
   (`git status`, `git remote -v`, `git branch --show-current`).
2. Fetch the latest changes: `git fetch origin`.
3. Safely update the local branch if it is behind:
   - Fast-forward only: `git pull --ff-only origin main`.
   - If it cannot fast-forward (local commits diverge), **stop and explain**. Do
     not force, do not rebase already-pushed commits, do not discard local work
     without asking.

### After completing and checking every website change
1. **Review the changed files** — `git status`, `git diff`, `git diff --staged`.
   Actually read what changed.
2. **Check the website for obvious errors** — valid HTML/CSS/JS, no console errors
   on `index.html` and `luggage-storage.html`, no broken links or images, no
   horizontal overflow, mobile + desktop still sane. Fix issues before committing.
3. **Stage only the files related to the current request** — explicit paths
   (`git add path/to/file`). Never `git add -A` / `git add .` blindly.
4. **Commit** with a clear message:
   - Short imperative summary line (≤ ~72 chars); blank line; brief body when the
     "why" isn't obvious.
   - End the message with:
     `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`
5. **Push** to the current branch: `git push origin main`.
6. **Confirm the push succeeded** (`git push` output shows the update;
   `git status` says "up to date with 'origin/main'") and report the **commit
   hash + summary line** back to the user.

### Hard rules — never break these
- **Never force-push** (`--force`, `--force-with-lease`) unless the user explicitly
  says so in the same session.
- **Never rewrite or delete Git history** — no `reset --hard` on pushed commits,
  no rebase of pushed commits, no branch deletion — without explicit instruction.
- **Never commit secrets** — no passwords, API tokens, keys, `.env` files,
  credentials, or private personal information. If a change would include one,
  stop and tell the user.
- Do not commit unrelated files, editor/OS cruft, or large binaries.
- If there is a **merge conflict**, an **authentication problem**, or a **failed
  check/test**: **stop and explain the problem** — do not work around it, do not
  force the push.

### Commit hygiene
- One logical change per commit where practical.
- Keep `js/data.js` placeholder markers (`TODO CHEKA`, `REPLACE_`) intact unless
  the user is supplying the real value.

---

## Deployment note
GitHub Pages: repo **Settings → Pages → Deploy from a branch → `main` / `/ (root)`**.
Once the final domain is known, update `business.siteUrl` in `js/data.js` and the
`<link rel="canonical">` + `og:url` tags in both HTML files.
