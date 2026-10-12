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

## v3 design pass — delta against the v2 contract above

Applied on top of v2. Anything not listed here still follows the v2 rules.

**Structure**
- Numbered section markers: every section heading is now `[index chip] — hairline` above the h2, note beside it, bottom-aligned, wrapping under at <22rem. New components: `eyebrow`, `eyebrow-num`, `eyebrow-rule`.
- `aria-labelledby` references on sections now resolve (`id` is threaded through `SectionHeading`) — they were dangling before.
- Hero gains the proof-chip row + mono soul-line from v2 §2 that were specified but never built; the dead `.deco-row`/`.deco-squares`/`.greeting` block is gone.
- Résumé moved out of the nav into a `cv-pill` beside the theme toggle (it is a download, not a section); still in the mobile panel and the footer.
- Footer restructured: eyebrow → `footer-title` → `big-mail` → meta → icon chips. Adds `footer-end`, `to-top`.
- Proof: patent A1 badge restored (v2 §5) and the 92% ink-fill tile restored, making the stat grid 2×2 as v2 specifies.

**Chrome & components (new)**
- `topbar-progress` — reading-position bar on the header's bottom rule.
- Nav current-section marker swipe (`is-active`, IntersectionObserver) matching the hero name's marker.
- `link-cta` — the primary link on each card promoted to a filled target; `card-head` + `card-kind` add the accent numeral / category row.
- `mono-link` — the footer résumé link now wears the same 44px chip as the icon links instead of bare underlined text.
- `status-dot`, `side-note` in the hero.

**Intentional deviations**
- Paper texture: `body` carries a 22px radial dot grid (`--dot`, 5.5% ink light / 5% in dark) in place of the flat paper fill. This is a pattern, not a decorative gradient; it is the only gradient function in the sheet.
- Hero name is sized with container query units (`23cqw` on `.hero-main`, with the v2 `clamp(…, 11vw, …)` as fallback). At the v2 vw sizing, "adarsh" clipped past the 7fr column between ~1024px and ~1200px.
- One orchestrated load animation for the hero (staggered `riseIn`, marker fade at 340ms), not scroll-triggered. Stripped under `prefers-reduced-motion`.
- Theme now follows `prefers-color-scheme` on a first visit instead of always defaulting to light.

**Contrast fixes (v2 rules that the code was breaking)**
- Accent chips, card numerals, impact pills, `link-cta`, and `eyebrow-num` all take `color: var(--on-accent)`. In dark mode the accents are pastels, so the inherited near-white `--ink` was ~1.9:1 on amber.
- Removed `paper`-on-accent hovers (footer `big-mail`, hero side card) — 1.3:1. The email now inverts to ink-on-paper.
- Removed the `--lime` focus outline override: a lime ring on paper is 1.3:1 and effectively invisible. Ink outline everywhere.
- `.menu-panel a:hover` was `--tang` on paper (2.75:1) → now a wash fill with an ink bar.

**Measured breakpoint changes**
- Inline nav starts at 1024 (was 768): below that the row (brand + 6 nav items + sticker + actions) overflowed and was silently clipped by `overflow-x: clip`.
- The status sticker and dot cluster show at ≥1152 / ≥1280 respectively; both signals are restated in the hero eyebrow and footer. Verified at 390, 504, 1024, 1440.
- `cv-pill` hidden below 400px.

**Deleted dead CSS**
`.lab-controls`, `.lab-input`, `.lab-go`, `.lab-samples`, `.lab-hint`, `.lab-error`, `.lab-line`, `.lab-rows`, `.lab-row`, `.param`, `.lab-foot`, `.stat-wrap`, `.visually-hidden`, `.side-line`, `.side-mail`, `.hero-value`, `.fill-ink`, `.section-heading .count`, `.badge a.b-title`. `styles.css` 33.4 KB → 30.9 KB.

## v4 — "riso studio" (supersedes v2 and v3 where they conflict)

Brief: keep every fact on the page, drop the elements that read as accidents, and make the craft obvious. Funky now comes from composition and scale; professional comes from one type scale, one spacing scale, and no unearned rotation.

**Type**
- Two webfonts, both from Google, both with `display=swap` and `preconnect`:
  `Space Grotesk` 500/600/700 (display: name, headings, titles, big numbers, buttons) and
  `JetBrains Mono` 400/600/700 (labels, chips, meta, all mono).
- Body prose stays on the system stack — no third download, no FOIT on long paragraphs.
- Supersedes the v2 "zero webfonts" rule. Budget: `dist` CSS is 29.6 KB (5.8 KB gzip).

**Palette** — same idea, retuned, plus a fourth accent
- `--paper #faf6eb`, `--paper-sunk #f2ecda`, `--card #fffdf6`, `--ink #17140f`, `--ink-soft #5c5446`, `--rule #e2dac6`
- `--flame #ff5a1f`, `--citron #c9f03c`, `--lagoon #0ea394`, `--grape #6c4bf4` with matching `--*-wash` tints
- Section accents: work = flame, demo = grape, experience = lagoon, credentials = citron, contact band = citron.
- `--ink-soft` moved to `#5c5446` (7.0:1 on paper). The v2 `#786E61` was 4.8:1.
- `--on-accent: #16130e` is applied to **every** accent fill, in both themes. In dark the accents are pastels, so an inherited near-white `--ink` measured ~1.9:1 on amber — the single biggest contrast defect carried over from v2.

**Elevation** — one shadow token, theme-aware
`--lift-1/2/3` are hard offsets driven by `--shadow-ink`, which flips to near-black in dark. This removed ~14 scattered per-theme `box-shadow: none` overrides.

**Structural changes**
- **Hero** — right column is now a `spec-card`: a citron header strip, hairline-divided mono key/value rows, and a sunk footer link. It replaced a tangerine block of undifferentiated mono lines. Hero meta split into a status pill + a soft mono meta line.
- **The name is lowercase**, set in Space Grotesk at 25cqw inside a container query. Uppercase came off: it read as shouting, and lowercase is the stronger designer signal at this scale.
- **Project cards gained a tinted header band** (`.card-head` on `--wash`, hairline below, title inside) so the three cards are distinguishable at a glance instead of three identical white boxes. Content moved into `.card-body`.
- **Experience panels** carry an 8px accent top border; **credential badges** a 7px accent left border. Both replaced per-item background fills and the tilted stickers.
- **Lab** is a `--card` panel with a grape top border. The canvas reads `--card` for its ground so it sits flush inside the panel.
- **Footer is a full-bleed ink band in both themes**, on dedicated `--band*` tokens so it cannot invert in dark. The email is citron at ~15:1 and inverts to a citron fill on hover. This replaced the citron band plus three dark-mode companion overrides.
- Rotations are now limited to one place: the card numeral tile rotating 2° on card hover.
- Chip row is capped at 26rem so the four receipts settle 2x2 rather than 3+1.
- Token aliases `--tang/--lime/--teal/--sand` are gone; `CnnLab.jsx` now reads `--flame/--citron/--lagoon/--paper-sunk` directly.

**Dark mode is designed, not inverted**
- `--card #182030` sits clearly above `--paper #0a0d15` so panels read as panels; `--rule #2e3849` makes hairlines visible; `--dot` raised to 7%.
- The `--*-wash` tints are carried bright (`#4a2410`, `#38430f`, `#0f3833`, `#2f2560`). At v4's original values every card header collapsed into the same near-black — that was the single biggest reason dark mode felt flat, since the tinted header band is the one thing that tells the three project cards apart.
- `--band` becomes a deep indigo `#1a1450` in dark, so the closing band is a colour moment instead of one more dark rectangle. The citron email stays at ~13:1 on it.
- Soft accent washes behind the hero and the lab panel add depth over the flat field.

**Follow-up fixes (from a review at 2x zoom)**
- `.fact` now sets `color` explicitly. It styles `<button>`s in the lab, and buttons do not inherit `body` colour — the preset chips were falling back to the UA grey. A `:disabled` rule dims the surface rather than the text, so presets stay readable while a run is in flight (the UA's disabled grey was the washed-out look).
- `.btn` gained an explicit `color` and a `:disabled` state (flat, no shadow, 78% opacity) so "run the full experiment" stays legible mid-run.
- Stat grid goes 4-across at ≥1024. The 2×2-at-40rem rule from v2 left the right half of the credentials section empty on desktop.

**Verified** — built and rendered offline at 1440x950 and 1440x6200 in both themes (headless Chrome, `file://` with `--allow-file-access-from-files`). `data-theme` was forced with a `setAttribute` interception in the `<head>` so both themes render deterministically, and the locked-preset state was verified by forcing `disabled` on the preset buttons. Also checked at 504px. No clipping or horizontal overflow at any width checked.

## v5 — light by default, and the hero recomposed

**Light is the default on every device.** `main.jsx` no longer consults `prefers-color-scheme`: with no saved toggle it sets light. `:root` declares `color-scheme: light` and the meta tag matches it, so UA widgets (scrollbars, form controls) don't render dark on a dark-set device before the CSS lands. A saved toggle still wins, and `html[data-theme='dark']` still flips `color-scheme`.

**Hero recomposed around a masthead band.** The availability pill and the location moved out of the left column into a full-width band with a hairline beneath it, so the two-column split begins at the name rather than after two lines of meta text.

**Proof chips became a `receipts` panel.** This is the substantive fix. The hero's columns were badly out of balance: left ran to ~823px (meta, name, lead, four chip pills, buttons, soul-line) against a ~365px right column (toolbox card + note) — roughly 460px of dead space at the bottom right, which was the main compositional flaw visible at desktop.
- The four proof points are now mono label/value rows in a panel that shares the toolbox card's `.spec-*` primitives, and the hero's right column stacks TOOLBOX + RECEIPTS + previously-note to ~533px against a left column of ~519px.
- Each receipts row keeps its accent as an 8px square (citron / flame / lagoon / grape), so the colour survived the restructure.
- Both hero panels carry the same citron header on purpose: the rows inside are what distinguishes them, so the two cards read as one system.
- `.chip` and `.hero-chips` are gone (single-use).
- `.soul-line` is now a full-width rule that closes the hero beneath both columns.

**The header dropped its availability sticker.** "open to internships — class of 2027" in the sticky header repeated the hero pill plus the location line inside the same first viewport. The claim now lives in the hero masthead and the footer only; `.sticker*` removed and the dot cluster now carries the 1152px breakpoint alone.

## v6 — "elements" (supersedes v2/v3/v4/v5 where they conflict)

Brief: replace the riso palette with a six-element system — professional in discipline, elemental in colour. Every hue has a job; nothing is on the page as decoration. The structure, type scale, spacing scale and elevation are unchanged from v4/v5.

### The six elements

| element | job | light | dark |
|---|---|---|---|
| light | the ground, and the highlight | `#f7f3e8` | `#14110c` |
| bark | structure — every letter, outline and hairline | `#221a11` | `#f3eee1` |
| fire | action | `#bc3a16` | `#ee6b41` |
| water | information | `#175f74` | `#4fb3c9` |
| earth | mass | `#8a5a24` | `#c98a45` |
| wind | quiet | `#4e6e72` | `#8fb3b0` |

Six matching `--*-wash` tints carry the pale panel fills. Internal token names `--paper` / `--paper-sunk` / `--card` were deliberately left alone through the rewrite: they are the light element's surfaces, and renaming 40+ call sites for cosmetics is how silent `var()` breaks get introduced.

### The two rules that make it safe

1. **Text on a pigment fill is `--on-accent`, never inherited.** The pigments are deep in the light theme and bright in the dark one, so the text on them is bone in light and bark in dark — fill and text swap ends together. `light` is the single exception: it is a light pigment in both themes, so it carries bark through `--on-light`.
2. **An outline around a fill is always `--ink`.** Not `--on-accent`: in the light theme a bone hairline around a deep tile vanishes into the paper. Bark outlines are the craft signature and stay bark in light, bone in dark.

Every element may also be used as **text on the ground** — fire 5.0:1, water 6.5:1, earth 5.3:1, wind 5.0:1, bark 12.4:1 in light; 5.5–11.3:1 in dark. One ban: **gold is never text on the ground** (2.1:1 on paper). `light` is a fill, a rule and a marker only.

### The marker exception

The name swipe, the nav's active swipe and `markIn` all read `--marker`, not `--light` directly. A marker sits *behind* letterforms, so it has to contrast with them rather than with the page: bark letters need a light swipe, so light is gold; bone letters need a dark swipe, so dark is bronze `#8a6410`. At the first v6 draft both themes used gold, and in dark the bottoms of "adarsh" measured **1.4:1** — the letters washed out. Any future swipe or highlight token must be checked against the theme's ink, not its ground.

### Every element is assigned

- **Sections carry a stratum.** `.section[data-el]` puts a 4px rule of the section's element on its top edge, directly on the 2px bark hairline that closes the section above. work = fire, demo = water, experience = earth, credentials = bark. The footer's closing strata is light, so the page ends by lighting up.
- **Element names are printed, not implied.** `SectionHeading`'s `accent` prop doubles as the printed word, so a chip's colour and its label cannot drift apart. Element names are always lowercase mono; uppercase belongs to component names — that contrast (`TOOLBOX` vs `earth`) is the visual grammar.
- **Sibling cards take their own element** even where their section has one, because "three identical cards" is the specific failure v4 fixed. Work cards = fire / water / earth. Experience panels = earth / water / wind. Credential badges = light / fire / water / wind. Stat tiles = fire / water / earth / **light** — gold marks the crown stat and stays the one tile that stands out.

### The hero is the one place all six appear at once

Each component declares its own element instead of inheriting one:

| component | element | how it reads |
|---|---|---|
| availability pill | fire | fire-wash surface + ember dot |
| location + year | earth | clay text + clay square |
| name | light | gold marker behind bark caps |
| lead paragraph | bark | plain prose — bark is the prose element |
| `see the projects` | fire | the page's only filled button |
| `email me` | water | card surface, water edge and label |
| TOOLBOX | earth | `el-earth` → header fill + link hover |
| RECEIPTS | bark | `el-bark` → header fill |
| receipt rows | light / fire / water / wind | one square each |
| soul-line | wind | slate rule closing the hero |

Each element therefore appears exactly twice in the hero. `.spec-card` reads its fill from `--spec-el`, so a panel cannot end up half-recoloured. The panel footer link hovers into its own element rather than a global accent.

### The name is set in caps

`text-transform: uppercase` on `.hero-name`; the DOM text stays lowercase so a screen reader reads a name instead of spelling an initialism out. Caps measure about 4em for six letters, so the width-bound size came down from `25cqw` to `22cqw` and the tracking opened from `-0.045em` to `-0.03em` — at 25cqw "ADARSH" measured past its column. Verified at 1100px, where the column is ~536px and the caps occupy ~470px.

The header brand and the footer credit stay lowercase. A lowercase wordmark against monumental caps is the hierarchy, not an oversight.

### Contrast work this pass

- Every accent fill re-checked under both `--on-accent` and `--on-light`; all text-on-fill pairs land 5.0:1–12.4:1.
- The spec-head element label is kept **at full opacity** on purpose. Dimming it to 0.72 dropped the pair to 3.7:1 against the dark theme's brighter bark header.
- Hover swipes behind text use the element's **wash**, never its pigment — those labels are bark, and bark on a deep pigment measures ~3.2:1.
- `.card-title a:hover` became an underline instead of a swipe: the title sits on the card's own wash, where a second tint of that same wash does not read at all.
- Verdict states carry meaning without green, which this palette does not have: light = healthy fit, fire = overfitting (the alarm), wind = underfitting (merely unsatisfying), sunk = not trained.

### Also this pass

- `toggle` classes `tilt-l` / `tilt-r` were dead data on the badges (no CSS behind them since v4) — removed.
- `CnnLab`'s canvas and SVG read `--light` / `--fire` / `--water` directly; its "green neurons" copy now says "lit neurons", which is true again.
- `::selection` is fire-on-bone in light and gold-on-bark in dark.
- Removed across the sheet: `flame`, `citron`, `lagoon`, `grape`, `tang`, `lime`, `teal`, `sand`, `--on-accent`-as-border, `a-teal` / `a-lime` / `panel-*` / `b-*` / `tile-ink` / `lg-lime` / `verdict-*` legacy class names, and `btn-lime`.

### Verified

`vite build` clean (1591 modules; CSS 31.40 kB / 6.35 kB gzip; JS 177.80 kB / 57.17 kB gzip). Rendered over HTTP from `dist` at 1440×980 and 1100×860, in both themes, by seeding `localStorage['na-theme']` in a `dist/__dark.html` harness so the real `main.jsx` boot path picks dark rather than faking the attribute afterwards. No clipping, no horizontal overflow. Light remains the unconditional default on every device.

## v7 — element families (supersedes the v6 outline rule and the v6 hero table)

Brief: in the hero, every component must be built from **exactly one element**, with no colour borrowed from another. At v6 each hero component carried its element but still leaned on the shared bark outline and a neutral card surface, so nothing was purely one element. v7 gives each element a complete family and makes each hero component self-contained.

### Each element ships four parts

| part | what it is | used for |
|---|---|---|
| `--<el>` | the pigment | fills, edges, rules, marks |
| `--<el>-wash` | the pale surface | the component's own background |
| `--<el>-ink` | the text tone | the component's words |
| `--on-accent` / `--on-light` | text on the pigment | words inside a solid fill |

A component is now assembled only from its own row of that table. Light theme inks:

`--fire-ink #8f2a0f` · `--water-ink #11485a` · `--earth-ink #6b4415` · `--wind-ink #3a5357` · `--bark-ink #2a1d12` · `--light-ink #8a6410`

Every one of those clears **4.5:1 both on the page ground and on its own wash** — that is the constraint that sets the value, because a component uses one ink on both.

In dark the pigments are already light enough to be their own text tone, so `--<el>-ink` simply resolves to `--<el>`.

`--fire-wash` was lightened `#f7e2d8 → #fae7dd` so the fire pigment clears 4.5:1 as text on it (it measured 4.46:1, just under).

### Supersedes the v6 outline rule

v6 said "an outline around a fill is always `--ink`". That still holds for the page's own chrome — the top bar rule, section borders, hairline band, card shadows — where bark is the **ink medium**. It no longer holds *inside a hero component*: there, edges are that element's own pigment. An earth panel now has an ochre border, not a bark one; a fire pill has an ember edge, not bark.

So the distinction is: **bark is the ink of the page, not a colour you paint components with.**

### The hero, component by component

| component | element | surface | edge | words |
|---|---|---|---|---|
| availability pill | fire | `--fire-wash` | `--fire` | `--fire-ink` |
| location + year | earth | ground | `--earth` | `--earth-ink` |
| name | bark | ground | — | `--ink` (+ light marker) |
| lead paragraph | bark | ground | — | `--ink` |
| `see the projects` | fire | `--fire` | `--fire-ink` | `--on-accent` |
| `email me` | water | `--water-wash` | `--water` | `--water-ink` |
| TOOLBOX | earth | `--earth-wash` | `--earth` | `--earth-ink` |
| RECEIPTS frame | bark | `--bark-wash` | `--bark` | `--bark-ink` |
| receipt row ×4 | light / fire / water / wind | its own wash | its own pigment | its own ink |
| soul-line | wind | ground | `--wind` | `--wind-ink` |

`.spec-card` holds `--spec-el` / `--spec-ink` / `--spec-wash` and every part of the panel — header, row rules, `dt`, `dd`, footer link, foot note — reads from those three, so a panel can only ever be one element's colours. Rows use the pigment for `dt` and the ink for `dd`: a hierarchy inside one family, rather than two elements stacked in one row.

**Each receipt row is its own component**, which is what lets four differently-coloured rows sit inside one bark frame without any of them mixing. Row surface = its own wash, rule and square = its own pigment, label and value = its own ink. `.spec-rows` lost its vertical padding so the tinted row surfaces do not leave strips of the frame showing through.

### Still true from v6

- The six elements, their jobs and their hexes; deep in light, bright in dark.
- `--marker` (gold in light, bronze `#8a6410` in dark) and why a swipe token is checked against the theme's ink, not its ground.
- Section strata, printed element names, sibling cards taking their own element, the name in caps.
- Light remains the unconditional default on every device.

**Deliberately not changed:** the hard offset shadows stay `--shadow-ink`. A shadow is elevation ink for the whole page, not a component's fill — tinting it per element turns it into a glow in the dark theme, where the pigments are brighter than the ground.

### Verified

`vite build` clean (1591 modules; CSS 32.20 kB / 6.55 kB gzip; JS 177.84 kB / 57.18 kB gzip). Rendered over HTTP from `dist` at 1440×980 in both themes using a seeded-`localStorage` `dist/__dark.html` harness. Every component confirmed single-element and every label legible in both themes; harness since deleted.

## v8 — closing the last crossings in the hero

Feedback after v7: "colours are still crossing." Fair — v7 made each hero component read from its own element, but three things still carried another element's colour. All three are now fixed.

### 1. The RECEIPTS card had no right to exist

v7 gave each receipt row its own element while the card around them stayed bark. A bark frame holding rows in four other elements **is** a crossing, however pure each row is. So the shared card is gone: the receipts are now four independent, individually-bordered strips with no common parent.

Each `.receipt-strip` is assembled only from its own element — wash for the surface, pigment for the border and the square, ink for the words. The `receipts` label above the stack and the `previously —` note below it are page ink with no colour of their own; they are labels, not components.

`.receipt-block` / `.receipt-list` / `.receipt-strip` / `.receipt-block-title` / `.receipt-note` replace `.receipt-row` and `.spec-foot`. `.spec-card.el-bark` was deleted with it: TOOLBOX is the only `spec-card` left, and it is earth.

### 2. The name was bark wearing a gold swipe

The last colour crossing in the hero. The name is now **a light component end to end**: letterforms in `--light-ink` (dark amber `#4a3208`) with the gold marker behind them, both inside the light family. Contrast holds in both directions — amber on the ground 10.9:1, amber on the gold marker 5.2:1.

`--light-ink` therefore has to satisfy three surfaces at once (ground, light wash, gold marker), which is why it is a dark amber rather than the mid amber a wash-only token would use. In the dark theme `--light-ink` resolves to `--ink`, because there the marker is bronze and bone letters are what stand off it at 4.6:1.

### 3. Every shadow was bark

Each hero component was casting `--shadow-ink`. Shadows now come from `--<el>-shadow`:

- **Light theme** — the element's ink is already a dark tint of its hue, so the two coincide.
- **Dark theme** — a shadow is darkness, and the bright pigments would turn one into a glow, so each element gets a deep version of its hue (`--fire-shadow #351206`, `--water-shadow #05222b`, …).

`.btn` reads `--shadow-tint` (set by `.btn-fire` and `.btn-water`); `.spec-card` sets it to `--earth-shadow`; `.receipt-strip` reads `--rc-shadow`.

### Also

- The header dot cluster was three different elements in one mark. It is now three fire dots, matching the brand square and the reading bar — the header's element is fire. Three colours in one cluster was a crossing too.
- `a.receipt-value:hover` became an underline in the strip's own pigment instead of a swipe behind the glyphs: an underline cannot collide with the letterforms, and the row text is now the element's ink rather than bark.

### Still true from v7

The four-part family per element, the `--<el>-ink` values and the 4.5:1-on-ground-and-wash constraint, `--marker`, section strata, printed element names, sibling cards taking their own element, caps name, light as the unconditional default.

**Unchanged on purpose:** `--ink` (bark) remains the page's text and chrome colour — the top-bar rule, section borders, the masthead hairline, body prose. Bark is the page's ink, not a colour painted onto components; the distinction v7 drew still holds.

### Verified

`vite build` clean (1591 modules; CSS 32.91 kB / 6.67 kB gzip; JS 177.83 kB / 57.19 kB gzip). Rendered over HTTP from `dist` at 1440×1000 in **both** themes with a seeded-`localStorage` `__dark.html` generated from the built `index.html`, then inspected component by component. Harness deleted, preview server stopped.

## v9 — SEO and delivery (supersedes the v4 font-delivery decision)

Brief: the page must be readable by crawlers and must not wait on a third party before first paint. No visual change is intended anywhere in this pass; `SEO-AUDIT.md` holds the findings and the measured numbers.

**The page is prerendered.** `scripts/prerender.mjs` renders `<App/>` to a string via `src/entry-server.jsx` and bakes that markup into `dist/index.html`, so the document ships with its real content instead of an empty `#root`; `main.jsx` hydrates it. Two rules follow:

- Anything read from `document` during render must be guarded (`TopBar.currentTheme`), because the same components run on the server.
- DOM that depends on the visitor's saved theme cannot be decided in JS state during the first render.

**The theme toggle's icon is chosen by CSS, not by JS.** The button renders both icons and `.theme-ico-light` / `.theme-ico-dark` show one each off `html[data-theme]`. Picking the icon from state would be a hydration mismatch for anyone with a saved theme. Its `aria-label` starts neutral and is corrected in an effect — invisible, and mismatch-free.

**Fonts are self-hosted** (supersedes v4's Google Fonts links): six latin `.woff2` files in `public/fonts` with `@font-face` rules at the top of `styles.css`, and the two above-the-fold faces preloaded from `index.html`. The third-party stylesheet was render-blocking and measured **694 ms** of the critical path. `document.fonts.size` drops 27 → 6. The families, weights and fallback stacks are untouched, so the type looks identical — only its origin changed.

**Also:** an explicit space between the two `<h1>` lines (text extraction read `nagaadarsh`), plus the metadata, icons, JSON-LD, `robots.txt`, `sitemap.xml` and `vercel.json` described in `SEO-AUDIT.md`.

**Verified** — `npm run build` clean (1591 modules; HTML 8.74 kB carrying 27,051 chars of prerendered markup; CSS 33.9 kB / 6.7 kB gzip; JS 178.3 kB / 57.3 kB gzip). Rendered over HTTP at 1440×1000 and 390×844 in both themes: webfonts still in use (checked with CDP `CSS.getPlatformFontsForNode`), exactly one theme icon per theme, no horizontal overflow, 0 console messages, 0 failed requests, hydration clean. FCP/LCP 584 ms self-hosted vs 1292–1468 / 1520–1820 ms before; CLS 0.0005 both ways. Lab numbers on one machine, not field data.

## v10 — "a dictionary of colour" (supersedes the v2 citrus palette, the v6/v7/v8 element values, and v9's "the type looks identical")

Brief: replace the palette with something thematic and elegant, using **Sanzo Wada's *A Dictionary of Color Combinations* (1933)** as the reference. Layout, structure, copy and component grammar are unchanged; this pass is colour, elevation, and the brand surfaces.

### The method comes from the book, not from taste

The dictionary is **159 named swatches published only as 360 fixed pairings**. Its own dataset note is the constraint that shapes everything below: *only 140 of the 360 combinations hold a pair legible enough for body text*, and the library leans warm and mid-chroma. So a web palette built from it cannot lift its text colours — it has to **derive** them. Verified independently against the dataset: 140/360 clear 4.5:1 on the strongest in-combination pair.

The rule that follows: **the paper, the ink and the six pigments are the book's own hex values; every text tone is derived.**

| Role | Wada swatch | Hex | Notes |
|---|---|---|---|
| `--paper` | Sulpher Yellow #39 | `#f5ecc2` | Pairs with Black #159 at **15.67:1** — the book's own combination 52 |
| `--ink` | Black #159 | `#111314` | The dictionary's darkest swatch |
| `--fire` | Carmine Red #29 | `#a62c37` | combination 104 with Sulpher Yellow |
| `--water` | Deep Lyons Blue | `#1c4286` | |
| `--earth` | Brick Red #28 | `#a84222` | Burnt Sienna was tried first and measured **4.38:1** — under the bar |
| `--wind` | Slate Color #158 | `#34454c` | |
| `--bark` | Dusky Madder Violet #153 | `#4e1d4c` | Also the closing band |
| `--light` | Yellow Ocher #60 | `#e2b540` | A light pigment in both themes, so it carries ink |

Derived and then measured, never guessed: washes are **18% of the pigment over the paper**; each element's `-ink` is the **most saturated** tone of its own pigment that still clears 4.5:1 on the ground *and* on that element's wash. Bone text on a pigment fill clears on all five deep pigments — fire 5.82, earth 5.09, water 8.13, wind 8.40, bark 11.01.

### The one rule that had to change

`.spec-row dt` set the element's **raw pigment as text on its own wash**. That is 3.7:1 for Brick Red and **1.46:1** for Yellow Ocher — invisible, not merely weak. Labels now take `--spec-ink` and values take `--ink`; the hierarchy survives as two different darks, and both are verified on the wash.

### De-brutalising (this is what makes it read as "elegant")

The v6 palette was only half the theme; the other half was structural, and it was structural in the opposite direction.

- **38 rule-weight outlines → hairlines.** Components now separate with `1px solid var(--rule)` rather than `2px solid var(--ink)`. Kept at full weight only where they are *strata*: the section top rules, panel and lab spines, badge edges, the footer's light rule.
- **Hard offset shadows → soft layered elevation.** `3px 3px 0` offsets on buttons, spec card, receipts and numerals are gone; `--lift-1/2/3` are two-blur layers tinted with the palette's own black (`rgba(17,19,20,…)`), so depth reads as light on a sheet rather than a second copy of the element.
- **Rotation removed**, along with the 24px `--dot` page grid. Both were the loudest "sticker" signals left.
- Radius scale tightened (`.25/.375/.55/.8rem`) to suit a printed sheet.

### Dark theme, inverted from the same book

The ground is **Black #159** and the bone is **Sulpher Yellow #39** — the paper and ink trade places, so dark mode is still only reading from the dictionary. The pigments turn luminous and each is likewise a named swatch: Eugenia Red A, Light Glaucous Blue, Yellow Ocher, Warm Gray, Spinel Red. `--on-accent` becomes the black. Dusky Madder Violet holds as the closing band in **both** themes.

One fix carried forward: the marker behind the name's letterforms is **Carmine Red**, because bone letters on the dictionary's own gold measure 1.4:1 and washed out. Deep carmine reads at **5.82:1**.

### Type and brand surfaces

**Fraunces replaces Space Grotesk** as `--font-display` (supersedes v9's claim that the type was untouched): a high-contrast serif is the other half of "elegant", and it is self-hosted like the rest. The `space-grotesk-*.woff2` files stay in `public/fonts` but are no longer declared or preloaded, so nothing fetches them. `--font-body` remains the system stack; JetBrains Mono keeps labels and chips. `index.html` preloads `fraunces-700` instead, and `theme-color` / the pre-CSS boot background move to `#f5ecc2`.

The brand surfaces were still wearing the old citrus palette and had to be rebuilt rather than left behind: `favicon.svg` is now a Carmine Red tile with a Sulpher Yellow N, `favicon-192.png` / `apple-touch-icon.png` were re-rendered from it, and `og-image.png` was regenerated at 1200×630 — Fraunces name, Yellow Ocher marker, hairline chips, the same verified claims as before.

### Verified

`npm run build` clean (1591 modules; HTML 9.08 kB carrying **27,105** chars of prerendered markup; CSS **33.55 kB** / 6.64 kB gzip; JS **178.23 kB** / 57.33 kB gzip).

Rendered over HTTP from `dist` through headless Chrome over CDP at 1440×900 and 390×844, in both themes, toggling the real `.theme-btn`:

- `body` background computed as `rgb(245, 236, 194)` in light and `rgb(17, 19, 20)` in dark; `body` colour the exact inverse.
- `.hero-name` computes to `Fraunces, "Iowan Old Style", Georgia, "Times New Roman", serif` — the serif is actually loading, not falling back.
- `.project-card` border `1px`, shadow the two-layer `--lift-1`; `.site-footer` `rgb(78, 29, 76)` (Dusky Madder Violet) in **both** themes.
- `document.fonts.status === "loaded"`; **0** elements whose text colour equals its painted background; **0** horizontally overflowing elements; `scrollWidth === innerWidth` at 1440 and at 390.
- `og-image.png` 1200×630, `favicon-192.png` 192×192, `apple-touch-icon.png` 180×180 — dimensions read back from the PNG headers after generation.

Screenshots captured to `theme-check/` for review; headless Chrome closed through CDP and the preview server stopped.
