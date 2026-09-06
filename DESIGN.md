# DESIGN.md — Naga Adarsh Portfolio v2 (Colorful, Funky, Portfolio-First)

v2 is a MATERIAL REDESIGN of the v1 single-page site (v1 rejected as "basic" and résumé-like). Project type: `static` single page, React/Vite, no Supabase. Base template `react-vite-base`. No Tailwind.

## Product goal & audience

Convert a recruiter's ~30-second scan into a "say hi" click by proving Naga Adarsh can ship: patent, SIH finals, paid freelance, competitive-coding scores, live demos. Kills the résumé/dossier read entirely: NO résumé button, no document metaphor, no chronology wall. The work is the hero. Audience: tech recruiters + hiring managers, laptop and phone.

## Visual direction

"Sticker wall, not filing cabinet." Warm ivory gallery wall where every proof is a deliberately placed sticker: solid color blocks with 2px ink outline, ink text on every fill, hard-offset shadows, offset rectangles and dot clusters, one oversized ink name with a lime marker swipe. Color is structural and abundant but ORGANIZED: paper stays ~65% of the page; each accent owns a region (tangerine = work 01 + freelance + LeetCode tile; teal = work 02 + education + CodeChef tile; lime = work 03 + primary CTA + mailto band). Accents are never text-on-paper (all fail AA as text) — they live in fills, borders, swipes, shapes. Zero photos, zero emoji, zero decorative gradients (lime marker = inset box-shadow). Funky energy from composition: sticker rotation ≤2° (≥768 only), offset shapes, tight oversized type — never chaos.

## Reference Sources (vendor grounding)

- `vendor/open-design/adapter/STATIC_POLICY.md` — static-use boundaries; translate, don't copy.
- `vendor/open-design/upstream/design-systems/Citrus-Verve-Editorial/DESIGN.md`, `tokens.css`, `components.html` — primary baseline (warm paper, flat color blocks, color-as-structure, flat elevation).
- `vendor/open-design/upstream/design-systems/doodle/DESIGN.md` — playful-discipline check (playfulness must not reduce readability; adopted, handwritten look rejected).
- `vendor/open-design/upstream/craft/anti-ai-slop.md`, `color.md`, `typography.md`, `typography-hierarchy.md`, `animation-discipline.md`, `accessibility-baseline.md`.
- `subagents/canvas-designer/references/output-contract.md`.

Intentional deviations (named): three-accent system overrides color.md single-accent cap (compensating controls: accents never as text on paper, ink text mandatory on every accent fill, neutrals ≥65% of page); system fonts replace EB Garamond/DM Sans (zero webfonts, zero layout shift); doodle sketchiness rejected (crisp CSS/SVG only); stat tiles 2×2 at all breakpoints in a ≤40rem sub-grid; one ink-fill exception tile (patent 92%).

## Design Tokens

Color (Citrus court, user-locked hex — do not alter):
- `--paper:#FFFBEA` (bg) · `--sand:#F6F2E1` (neutral panel) · `--ink:#26180D` (text/borders/outlines/shadows) · `--ink-muted:#786E61` (secondary, 4.8:1) · `--hairline:#E1DBCB`
- `--tang:#FF6B1A` · `--lime:#C6F12E` · `--teal:#19B0A2`
- washes (12% over paper): `--wash-tang:#FFEAD1` · `--wash-teal:#E3F2E1` · `--wash-lime:#F8FAD3`

Contrast (verified): ink on paper 16.6:1; ink on tang 6.05:1; ink on lime 13.1:1; ink on teal 6.4:1; ink on washes 14.7–16.1:1; ink-muted on paper 4.8:1. Reverse rule: never paper/off-white text on accent fills; never accent as text color on paper (tang 2.75:1 / teal 2.6:1 / lime 1.3:1 fail).

Typography (system stacks only):
- `--font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif` — all readable text.
- `--font-mono: ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, "Liberation Mono", monospace` — eyebrows, greeting, chips/labels, meta, close line, small captions only. No mono body prose.
- Weights: 400 body / 600 labels-CTAs / 800 display+headlines.
- Scale: display `clamp(2.75rem,13vw,7rem)` lh .98 ls -.02em; h2 `clamp(1.75rem,4.5vw,2.75rem)` w800; hero value `clamp(1.125rem,4.2vw,1.5rem)`; card title 1.375rem; body 1rem lh 1.55; mono chip 0.75rem; giant index `clamp(2.5rem,8vw,4.5rem)`; caps labels tracking +0.08em.

Spacing (rem): .25/.5/.75/1/1.25/1.5/2/2.5/3/4. Section rhythm `clamp(3.5rem,8vw,7rem)`; hero bottom `clamp(4rem,10vw,8rem)`.
Radius: `--r-s:.375rem` tags · `--r-m:.75rem` chips/stickers · `--r-l:1.25rem` cards · `--r-pill:999px` CTAs.
Border: 2px solid `--ink` sticker outline everywhere key. Elevation (poster): `4px 4px 0 var(--ink)` stickers; cards `6px 6px 0 var(--ink)`; hover cards `8px 8px 0`. No blurred shadows.
Layout: container `75rem` max, gutter `clamp(1rem,4vw,2.5rem)`; QA 375/768/1280. `html,body{overflow-x:clip}` belt + section `overflow:clip`.
Focus: `:focus-visible{outline:3px solid var(--ink); outline-offset:3px}`; ink-filled interactive overrides outline-color lime.
Motion: fast 120ms / base 200ms, ease cubic-bezier(.2,0,0,1); hover transform only; everything transform-based stripped under `prefers-reduced-motion:reduce`. No scroll-triggered choreography.

## Page Structure (single page)

Landmarks header/nav/main/footer; one h1; scroll-margin-top 5rem on anchors.
1. **Top bar** (`site-header`): brand `naga adarsh` (lowercase, ink, 600) + nav anchors `work · client work · proof · contact` (≥768) + lime sticker `open to work — class of 2027` (hidden <480) + 3-dot deco (teal/lime/tang, aria-hidden). Sticky, opaque paper, 2px ink bottom rule. Menu disclosure <768 (button aria-expanded/controls, close on click/Escape, panel in-gutter paper w/ ink border).
2. **Hero** (`#top`): mono greeting `hi, i'm · chennai, in · class of 2027`; name on two block lines `naga` / `adarsh` with lime marker swipe on `adarsh` (inset box-shadow); value line "Final-year IT undergrad building AI + backend tools with receipts — a published Indian patent, two SIH finals, paid clients, and code you can run."; four filled chips (patent A1→PDF, SIH ×2 span, leetcode 670+→profile, codechef 1700+→profile); CTAs: lime `see the work ↓` (#work) + ink-outline `say hi →` (mailto); mono soul-line `no résumé here — the work is the résumé`.
3. **Selected work** (`#work`): heading `selected work ( 03 )` + one context line. 3 cards, identical geometry, per-card accent via CSS var: 01 freshness **tang** · 02 scholar rag **teal** · 03 nag-link **lime**. Card = accent numeral tile (ink numeral on solid accent) → title → one-sentence story → impact pill (accent fill) → links (`view code` · `live demo` · `patent pdf`; 02 carries mono note `(demo may cold-boot)`) → mono tech tags with accent dot separators. Whole-card links: title+code repo primary; demo second.
4. **Client work** (`#client`): heading `client work ( 01 )`; two tinted panels ≥768: freelance panel (wash-tang + 2px ink border + 4px offset shadow): "Paid freelance, 2025 — a real client, a real brief, a ₹10,000 invoice. The engagement doc is linked." link `read the engagement doc` (drive 1pUfP7mc...); education panel (wash-teal): B.Tech IT, Easwari Engineering College · CGPA 8.3/10 · 2023–2027 · class of 2027.
5. **Proof** (`#proof`): heading `proof ( 04 )`, subline "patent, finals, credentials — the receipts are linked, not claimed." Four sticker badges: patent A1 (lime, link PDF) · SIH ×2 college-level finalist (tang, span) · Azure Developer Associate (teal, link MS credential) · CCNA 1–3 (sand + ink border, div). Stat tiles 2×2 (≤40rem sub-grid): `670+` LeetCode problems → tang, links leetcode; `1700+` CodeChef rating → teal, links codechef; `750+` Codolio problems → lime, links codolio; `92%` CV accuracy · freshness indicator → ink-fill exception (paper text), links patent PDF.
6. **Footer** (`#contact`): full-bleed lime band. Giant fluid ink mailto `say hi → nagaadarsh354@gmail.com` (overflow-wrap anywhere, wbr before @), five 44×44 profile chips (github · linkedin · codechef · leetcode · codolio; paper fill, 2px ink border; aria-labels), mono close `designed + built by naga adarsh · chennai · class of 2027`.

## Component inventory (data-component)

site-header · nav-menu · open-sticker · deco-dot-cluster · hero · hero-chips · section-heading · work-showcase · project-card · client-strip · client-panel · proof-badges · badge · stat-grid · stat-tile · site-footer · icon-link · skip-link. All interactive elements native `<a>`/`<button>`; decorative shapes aria-hidden. Non-linked chips/badges are `<span>`/`<div>` — never dead anchors.

## Copy (numbers exact; claims precise)

Claim language: patent = "published Indian patent application IN202641004962 A1"; SIH = "college-level finalist 2024 & 2025" (never "won"). Numbers allowed: 92%, 3,000+, 670+, 1700+, 750+, ₹10,000, 8.3/10, 2023–2027.
Project stories:
- 01 "A CNN that judges fruit freshness in real time — 92% accurate on 3,000+ images and published as Indian patent application IN202641004962 A1." pill `92% accuracy · 3,000+ images`
- 02 "A RAG engine that answers research questions from your own sources, so you stop reading forty papers to find one fact." pill `plain-language research answers`
- 03 "A no-drama URL shortener — long link in, short link out, a backend that stays out of your way." pill `long url in · short url out`
Forbidden anywhere: résumé, CV, download, experience (as section word), objective, passionate, harnessing, leveraging, tech enthusiast, on a mission, synergy, unlock, journey, emoji icons, all-caps sentences.

## Verified links (exact hrefs, all resolve)

Repos: github.com/mr-snake-mr/Real-Time-Freshness-Indicator · github.com/mr-snake-mr/scholar-rag-engine · github.com/mr-snake-mr/nag-shortener
Demos: kishore200630-freshness-indicator.hf.space · snakeeee-scholar-rag-engine.hf.space (may cold-boot) · nagssho.vercel.app
Patent PDF: drive.google.com/file/d/1-oCO61LDZnqCTJXcOmF623QZO5dA4dUV/view
Freelance doc: drive.google.com/file/d/1pUfP7mcnX1AhtBRK5o1q-XyZDtyGZ6cA/view
Profiles: github.com/mr-snake-mr · linkedin.com/in/naga-adarsh · codechef.com/users/mr_snake_mr · leetcode.com/naga_adarsh_s · codolio.com/profile/fOaTXef
Azure credential: learn.microsoft.com/api/credentials/share/en-us/NagaAdarsh-7898/699D12D414C38A62
Mailto: nagaadarsh354@gmail.com

## Responsive rules

Mobile-first 375/768/1280; zero horizontal overflow; never `white-space:nowrap` on chips/labels/URLs; grids use `minmax(0,1fr)`; mono/URL text `overflow-wrap:anywhere`; display name wraps per word; email fluid + wrap anywhere; sticker shadows (4–6px) < gutter min (16px). 375: anchors hidden behind menu, chips wrap, CTAs stack ≥44px. 768: nav inline, client strip 2-col. ≥900: cards 3-up, equal-height (flex col, link row margin-top auto). Rotation decorations only ≥768. All targets ≥44px except inline copy links. Color never the only state signal (ink outline + underline deltas).

## Interaction & motion

Hover: cards translate(-2px,-2px) + shadow to 8px 8px 0 (120–200ms); links underline; no parallax/marquee/loops; reduced-motion strips transforms & keeps color-only changes.

## Image Manifest

Zero images. Typographic + CSS/SVG geometry only (sticker language). No public/assets/images entries, no external image URLs, no imageGenerate. `none — CSS/SVG-only design`.

## Open questions / risk notes

1. Stat-tile 92% duplicates card pill — accepted (proof sections restate crown stat); tile links patent PDF. Alternative ₹10,000 if redundant at review.
2. Ink-fill exception tile (92%) — deliberate; swap to tang fill on request (ink text still 6.05:1).
3. Scholar HF demo may cold-boot (returns 500 to bots) — note `(demo may cold-boot)` on card; repo is primary link.
