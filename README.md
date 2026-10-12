# naga-adarsh-portfolio

Source for my personal site — **live at [nag.is-a.dev](https://nag.is-a.dev/)**.

Naga Adarsh · final-year B.Tech IT student in Chennai · computer vision, retrieval and backend work.

- **Live site:** https://nag.is-a.dev/
- **Design system + decisions:** [DESIGN.md](DESIGN.md)
- **SEO/GEO audit and measurements:** [SEO-AUDIT.md](SEO-AUDIT.md)

## Stack

React 18 + Vite 5, hand-written CSS, no CSS framework, no UI kit, no tracking. The page is
prerendered to static HTML at build time (`scripts/prerender.mjs`) and hydrated in the browser,
so the content is present without JavaScript. Fonts are self-hosted from `public/fonts` (latin
subsets). Deployed on Vercel.

## Develop

```bash
npm install
npm run dev      # dev server
npm run build    # client build → SSR bundle → prerender into dist/
npm run preview  # serve dist/
```

There is no test suite; `npm run build` and a manual pass over the built output are the checks.

## Content

Everything on the site is factual and verifiable: the patent application (IN202641004962 A1),
the Smart India Hackathon finals, the Azure certification, the client work, and the three
projects each link to their public repository.
