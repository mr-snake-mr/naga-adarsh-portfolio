# SEO audit — nag.is-a.dev

Target: `https://nag.is-a.dev/` · source: this repository (React 18.3.1 + Vite 5.4.11, static single page, no router in use).
Audit and implementation date: 2026-10-12. All numbers below were measured on this machine against the production build; nothing is estimated.

---

## 1. What was actually wrong

Ordered by impact.

1. **Nothing was crawlable without JavaScript.** `dist/index.html` shipped an empty `<div id="root">` (639 bytes of HTML). Every fact — name, projects, patent number, credentials — existed only after the 178 kB JS bundle executed. Google can render JS eventually; Bing, most social scrapers, AI crawlers and link-preview bots largely do not. This was the single largest discoverability problem.
2. **No canonical URL.** Vercel serves the page at both `/` and `/index.html` with identical content and no canonical tag, so the two could be treated as duplicates.
3. **No `robots.txt`, no `sitemap.xml`.** Confirmed 404 in production (`/robots.txt`, `/sitemap.xml`, `/favicon.svg` all returned `NOT_FOUND`).
4. **No structured data.** Zero JSON-LD — no machine-readable statement of who this is, what the site is, or what the three projects are.
5. **Incomplete social metadata.** Open Graph had only `type`/`title`/`description`; no `og:url`, `og:image`, `og:site_name`, `og:locale`. Twitter used `summary` with no image. No PNG icon or `apple-touch-icon`.
6. **A render-blocking third-party request on the critical path.** The Google Fonts stylesheet (`<link rel="stylesheet">` + two `preconnect`s) measured **694 ms** of blocking time on a cold cache in this environment.
7. **The `<h1>` text node read `naga` + `adarsh` with no separator** → text extraction saw `nagaadarsh`.
8. **No control over soft 404s, caching or security headers** for the one non-HTML public asset (`/assets/resume.pdf`).

Already good, and left alone: `lang="en"`, viewport, `theme-color`, skip link, single `<h1>` with a real heading hierarchy (h2 per section, h3 per card), `aria-labelledby` on every section, `aria-label`s on icon-only links, visible focus rings, ≥44 px targets, `prefers-reduced-motion` handling. The design has **no `<img>` elements at all**, so image alt text, image dimensions, lazy-loading and image weight were not applicable (verified: 0 `<img>` tags in the built HTML).

---

## 2. Files created

| File | Purpose |
|---|---|
| `src/entry-server.jsx` | Renders `<App/>` to a string at build time. |
| `scripts/prerender.mjs` | Injects that markup into `dist/index.html`; fails the build if the marker is missing or the output is implausibly small. |
| `public/robots.txt` | Allows everything, points at the sitemap. |
| `public/sitemap.xml` | One canonical URL. |
| `public/og-image.png` | Real 1200×630 social card (rendered locally, brand palette). |
| `public/apple-touch-icon.png`, `public/favicon-192.png` | 180×180 and 192×192 PNG icons. |
| `public/fonts/*.woff2` (6 files, 102 KB) | Latin subsets of Space Grotesk 500/600/700 and JetBrains Mono 400/600/700. |
| `vercel.json` | `301 /index.html → /`, `nosniff` + `Referrer-Policy`, 1 h cache on the résumé PDF. |
| `SEO-AUDIT.md` | This report. |

## 3. Files modified

| File | Change |
|---|---|
| `package.json` | `build` now runs client build → SSR bundle → prerender. `build:client` and `prerender` added for debugging. No new dependencies. |
| `index.html` | Canonical, robots directives, author; complete Open Graph + `summary_large_image` Twitter card; SVG + PNG icons; two font preloads; one JSON-LD `@graph`; Google Fonts links removed. |
| `src/main.jsx` | `hydrateRoot` when `#root` already has markup, plain `createRoot` otherwise. |
| `src/components/TopBar.jsx` | `document` access guarded for the server render; theme icon chosen by CSS, label synced after mount (no hydration mismatch for visitors with a saved theme). |
| `src/components/Hero.jsx` | Explicit space between the two `<h1>` lines → `naga adarsh`. |
| `src/styles.css` | `@font-face` block for the self-hosted families + `.theme-ico` visibility rules. |
| `.gitignore` | Ignores the `.prerender` SSR build output. |
| `DESIGN.md` | v9 entry recording the font-delivery and theme-icon changes. |

### Structured data (all values already stated on the page)
One `<script type="application/ld+json">` with an `@graph` of: `Person` (name, email, role, Chennai, Easwari Engineering College, `knowsAbout`, Azure credential with its verification URL, SIH award, 5 profile links), `WebSite`, `ProfilePage`, and three `SoftwareSourceCode` nodes pointing at the real repositories. No ratings, no reviews, no invented organisations, no `SearchAction` (the site has no search), no telephone number (deliberate — it is on the page but does not need to be machine-harvestable).

---

## 4. Build and test results

**Build**: `npm run build` completes clean — 1591 modules; `dist/index.html` 8.74 kB (2.63 kB gzip) now carrying 27,051 characters of prerendered markup; CSS 33.9 kB (6.7 kB gzip); JS 178.3 kB (57.3 kB gzip). No new dependencies, no warnings.

**69/69 deterministic checks pass** (`node` script over `dist/`): title/description lengths, canonical, robots directives, all OG and Twitter tags, both icon links, single and parseable JSON-LD with all internal `@id` references resolving, prerendered text for all three projects + patent + college + email, exactly one `<h1>` with 5 `<h2>`/6 `<h3>`, every in-page anchor target present (`main top work play client proof contact`), all 34 `target="_blank"` links carrying `rel="noopener"`, no `javascript:` or empty hrefs, no placeholders, all 7 expected files present in `dist/`, robots/sitemap content rules, sitemap valid XML.

**HTTP over the built site** (local preview of `dist/`): `/`, `/robots.txt`, `/sitemap.xml`, `/favicon.svg`, `/favicon-192.png`, `/apple-touch-icon.png`, `/og-image.png`, `/assets/resume.pdf` all `200` with correct content types (`text/plain`, `text/xml`, `image/svg+xml`, `image/png`, `application/pdf`).

**Real browser pass** (installed Chrome driven over CDP, production build):
- 0 console messages, 0 uncaught exceptions, 0 failed/4xx requests.
- Hydration clean: `#root` retains 27,068 characters after hydration; one `<h1>` reading `naga adarsh`.
- Interaction smoke test passed: theme toggle flips `data-theme` light↔dark and persists the choice, mobile menu opens/closes (`aria-expanded`), the neural-net lab trains to a verdict and paints its decision-map canvas.

**Performance — same harness, fresh browser profile, cold cache, 1280×900, local preview (lab numbers, not field data):**

| | before | after |
|---|---|---|
| FCP | 1292 – 1468 ms | **584 ms** |
| LCP (element) | 1520 – 1820 ms (`span.line`, the hero name) | **584 ms** |
| CLS | 0.0005 | 0.0005 |
| third-party requests before first paint | fonts.googleapis.com stylesheet, 694 ms blocking | **none** |
| font faces declared | 27 | 6 |
| requests / transferred | 4 / 64.8 kB | 3 HTML+CSS+JS / 64.8 kB, fonts from own origin |

The webfonts still render: CDP `CSS.getPlatformFontsForNode` reports Space Grotesk (custom) on the `h1` and brand, JetBrains Mono (custom) on the mono chips. Verified visually in both themes at 1440 px and 390 px: no horizontal overflow, correct icon per theme, identical layout.

**Not measured here**: Lighthouse, PageSpeed Insights, and CrUX field data — they need an external service, and PSI would only see the currently-stale production build. INP is not meaningful on a page with this little JS work, so it was not asserted.

---

## 5. Remaining technical limitations

- Single-page site: one indexable URL. Per-page metadata has nothing to attach to, and `#work` / `#play` anchors are not separate documents — which is correct, but it means there is no long-tail URL surface.
- `robots.txt` allows the résumé PDF to be indexed. It is intentionally public; add `Disallow: /assets/resume.pdf` if you would rather it not surface as its own result.
- Latin-only font subsets. Non-Latin text (and the arrow glyphs `→ ↗ ↓`, which Google's own subsets also omit) falls back to system fonts exactly as before.
- The neural-net lab and the decision map are JS-only canvases. The surrounding explanation and headings are now in the HTML, but the demo itself cannot be crawled — nothing to fix, just not indexable.
- `react-router-dom` is a dependency but unused; removing it would shrink neither the bundle (tree-shaken) nor the install meaningfully, so it was left alone.
- Local lab timings are not field data. Real-user CWV depends on network conditions and will differ.

## 6. External steps you must complete (in order)

1. **Redeploy.** Production is serving an older build — the live HTML still has the old description and `theme-color: #fffbea`, and `/robots.txt`, `/sitemap.xml`, `/favicon.svg` return 404. Push this commit and let Vercel build (`npm run build` now includes the prerender step; output stays `dist/`).
2. **Google Search Console**: add `https://nag.is-a.dev/` as a URL-prefix property, verify by DNS TXT record for `is-a.dev` or by uploading an HTML verification file to `public/`. Then submit `https://nag.is-a.dev/sitemap.xml` and use URL Inspection → Request indexing on the homepage.
3. **Bing Webmaster Tools**: add the site (it can import from Search Console) and submit the same sitemap.
4. **Validate after deploy**: Rich Results Test / Schema Markup Validator against the live URL; confirm the 301 from `/index.html` to `/`; confirm `https://nag.is-a.dev/og-image.png` loads (Facebook Sharing Debugger, X Card Validator).
5. Optional and only if you want it: PageSpeed Insights on the live URL once deployed, to get a field/lab read on the real network.

Do not expect immediate indexing or any ranking outcome — those are search engines' decisions, not something this work can claim.

## 7. Still needs production validation

- The `301 /index.html → /` redirect and the two security headers only take effect on Vercel's edge, not in local preview.
- `og:image` scraping by Facebook/X/LinkedIn (each caches aggressively; re-scrape after the first fetch).
- Whether Google treats the JSON-LD as eligible for a rich result, and how it renders the prerendered page.
- Real-world Core Web Vitals under production network latency and on low-end mobile devices.
- That the CDN serves the six `.woff2` files with long-lived caching (Vercel does this automatically for `/fonts/*`; not verifiable locally).

---

## 8. Post-deploy actions and their verified results (2026-10-12)

Everything below was executed and re-checked against production, not planned.

| Action | Verified result |
|---|---|
| Pushed `971c14f` to `main` | Vercel deployed it; `https://nag.is-a.dev/` now returns the prerendered build (35,960 bytes of HTML instead of a 639-byte shell) |
| `robots.txt`, `sitemap.xml`, `favicon.svg`, `og-image.png` | all `200` in production (they were `404` before) |
| `/index.html` | `308 Permanent Redirect` → `/` |
| `naga-adarsh-portfolio.vercel.app` (the host linked from the GitHub repo) | `308 Permanent Redirect` → `https://nag.is-a.dev/`, so the one existing backlink now consolidates onto the canonical host instead of splitting it |
| Canonical, robots directives, Open Graph, JSON-LD, self-hosted font preload | present in the live HTML |
| IndexNow submission | `HTTP 202 Accepted` for `https://nag.is-a.dev/` — Bing, Yandex, Seznam and Naver are notified directly; the key file `/<key>.txt` is live at the root |
| `README.md` with the live link | live at `raw.githubusercontent.com/mr-snake-mr/naga-adarsh-portfolio/main/README.md`, giving github.com a crawlable link to the site |
| Site's own domain in visible text | the footer now reads `chennai, in · class of 2027 · nag.is-a.dev`; before this the string appeared only in metadata |
| Security headers | `Referrer-Policy: strict-origin-when-cross-origin` and `X-Content-Type-Options: nosniff` confirmed on the live `200` |
| Cache headers (found during verification) | Vercel was serving **everything** with `max-age=0, must-revalidate`, including content-hashed JS/CSS and the font files — i.e. a revalidation round trip on the critical path for every repeat visit. Rules now added for `/assets/*.js|css` (1 year, immutable), `/fonts/*` and the icons (1 week + `stale-while-revalidate`), and the résumé PDF (`max-age=0, must-revalidate`, so a replaced CV is never served stale). |
| CV replaced (`fa32e46`) | `public/assets/resume.pdf` swapped for the updated single-page CV. The path is unchanged so existing shared links keep working, the download links now carry `?v=2026-10-12` to defeat already-cached copies, and the live file was confirmed byte-identical to the source by SHA-256 (`7ea982796038b7f7239ad6b7b663a55d533663ba3902be9db40c2cfd7438d925`, 81,605 bytes). |

### What IndexNow does and does not cover

IndexNow notifies **Bing, Yandex, Seznam and Naver** immediately. **Google does not participate in IndexNow** — Google discovery still runs through crawling of links plus Search Console submission, which is why step 2 of the external list below remains the one action that cannot be done from this repository.

### Still outstanding, with the reason

1. **Google Search Console** — needs an account action from you (verification token or driving your signed-in browser). This is the only remaining lever that speeds up Google indexing; without it Google must find the site by crawling the GitHub link, which can take days to weeks for a new, low-authority domain.
2. **GitHub repo "Website" field** — still points at `naga-adarsh-portfolio.vercel.app`. It now redirects correctly, but setting it to `https://nag.is-a.dev/` is a 30-second fix in the repo settings.
3. **Profile links** — the site is currently linked only from GitHub. Adding `https://nag.is-a.dev/` to the GitHub profile README, LinkedIn, LeetCode, CodeChef and Codolio profiles is the cheapest way to give a name query several crawlable references.
4. No claim is made here about indexing or ranking: those are the search engines' decisions. Bing/Yandex have been notified; Google has not yet been told.

---

## 9. Search Console outcome (2026-10-12, done in your signed-in Chrome)

- Property `https://nag.is-a.dev/` (**URL prefix**) — **verified**, via the HTML-file method. The verification file `google14317e2017d6fd24.html` is live at the site root (`200`, body `google-site-verification: google14317e2017d6fd24.html`). **Do not remove it** — Google requires it to stay, or the property loses verification.
- Sitemap `sitemap.xml` — submitted. On first look Google's row showed `Type: Unknown`, Status **"Couldn't fetch"**, 0 discovered pages.
- URL Inspection on `https://nag.is-a.dev/` — "URL is not on Google / URL is unknown to Google" (expected for a brand-new site, no crawl had happened yet). **Request indexing** was accepted: "URL was added to a priority crawl queue."

### The "Couldn't fetch" status is not a defect on the site

Fetched immediately afterwards with the Googlebot user agent:

| Resource | Result as Googlebot |
|---|---|
| `/sitemap.xml` | `200`, 0 redirects, `Content-Type: application/xml`, 264 bytes, parses as valid XML, `<loc>https://nag.is-a.dev/</loc>`, `<lastmod>2026-10-12</lastmod>` |
| `/robots.txt` | `200`, `text/plain`, allows all, references the sitemap |
| `/google14317e2017d6fd24.html` | `200`, exact token body |
| `/` | `index, follow`, no `noindex`, self-referencing canonical |

Google's Sitemaps row reads "Couldn't fetch" until it processes a freshly submitted sitemap for the first time; it should become "Success" within about a day. Re-check the Sitemaps report then — resubmitting does not change queue priority.

### Blocked: the GitHub-only backlink work

Attempted in your signed-in Chrome and deliberately stopped: **Chrome is not signed in to GitHub**, so nothing was changed.

- `mr-snake-mr/naga-adarsh-portfolio` → About / Website still `https://naga-adarsh-portfolio.vercel.app/`. That URL does `308` to `nag.is-a.dev`, so the link is not broken, but it is not pointing at the canonical host.
- `mr-snake-mr/mr-snake-mr` (the profile README repo) **exists** and has a README, so the portfolio link can be added in a single commit.

Both edits take about a minute once GitHub is signed in.

### Realistic expectations

Indexing is queued, not done. For a new domain with one backlink, Google typically takes **days** to index and longer to settle ranking; Bing and Yandex were notified directly through IndexNow. Nothing here guarantees a position — the site is now fully eligible, which is what the work can control.
