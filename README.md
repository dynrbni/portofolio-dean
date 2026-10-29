# Dean Rabbani · Portfolio

A responsive portfolio for Dean Rabbani, an independent fullstack developer based in Depok, Indonesia. Built with Next.js 16, React 19, TypeScript, and CSS.

## Development

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

```bash
npm run lint
npm run build
npm start
```

## Content

Edit `src/data/portfolio.ts` for projects, contact details, and services. Main sections live in `src/app/page.tsx`, with design tokens and responsive styles in `src/app/globals.css`.

Featured projects: PoundasiERP, Attala Wedding, TamiasPOS, and PorLapor. The project gallery supports category filtering and accessible native dialog previews. Contact links open an email application; the copy action includes success and failure feedback.

## Images

`public/images/dean-ciremai.webp` is the photograph supplied by Dean. Attala Wedding and TamiasPOS images are screenshots of their live websites. PoundasiERP shows the public application sign-in screen. PorLapor was captured from the local project preview. Screenshots were captured on October 29, 2026. They are previews, not claims about customer numbers or product performance.

## Deployment

Push to the existing GitHub repository and use its configured hosting integration. No API keys or environment variables are required for the portfolio.

## Stack logos and motion

Technology logos are local SVG assets from [Devicon v2.17.0](https://github.com/devicons/devicon/tree/v2.17.0), with its MIT license retained in `public/stack/LICENSE`. The stack rail has pause/resume controls. Hero entrances, scroll reveals, project interactions, and dialog transitions respect `prefers-reduced-motion`; all content remains available without JavaScript.
