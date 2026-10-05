# Yukti Sahu — Personal Site

The digital home for Yukti Sahu: field notes (blog), project case studies, digital
products, free resources, and a newsletter — built as a single, fast, React +
TypeScript site with a hand-designed "index card" visual identity.

## Design language

The site's signature motif is the **library index card** — the hero and several
panels are styled like a physical catalog card (`.index-card` in `src/index.css`),
and section labels ("File No. 001 — About") echo the same catalog-tab system
(`.catalog-tab`). This is deliberate: it ties the personal-brand-as-library
concept (guides, roadmaps, resources) to the visual language of the site itself,
instead of a generic SaaS hero.

- **Type:** [Fraunces](https://fonts.google.com/specimen/Fraunces) (display serif,
  used sparingly for headings) + [Work Sans](https://fonts.google.com/specimen/Work+Sans)
  (body) + [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (labels,
  tags, metadata — reinforces the "catalog card" feel).
- **Color:** warm unbleached-paper background, near-black ink text, a moss/forest
  green as the primary accent, muted ochre and brick as secondary accents. Full dark
  mode with an inverted near-black/paper-text palette. See `tailwind.config.js`.
- **Motion:** a single orchestrated hero fade-in, plus restrained hover states —
  no scattered/decorative animation. Respects `prefers-reduced-motion`.

## Features

- Fully responsive, accessible (visible focus states, semantic landmarks, alt text
  hooks), dark mode with persisted preference
- Blog with search + category filter, reading time, featured posts
- Project gallery with case-study detail pages (problem / challenges / learnings)
- Digital products store with category filter, product detail pages, and a
  Razorpay-link placeholder
- Free resources list with download-link placeholders
- Newsletter page + inline signup + a non-intrusive scroll-triggered popup
  (dismissible, session-scoped)
- Contact form (placeholder submit handler) + social links
- Scroll progress bar, back-to-top button, custom 404 page
- SEO: per-page `<title>`/meta description via a lightweight `Seo` component,
  Open Graph + Twitter Card tags, JSON-LD `Person` structured data, `robots.txt`,
  `sitemap.xml`, `manifest.json`, and a generated favicon

## Folder structure

```
├── public/                  # robots.txt, sitemap.xml, favicon, manifest
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, Layout (route shell)
│   │   └── ui/               # Button, Tag, cards, Seo, newsletter widgets, etc.
│   ├── data/                 # posts.ts, projects.ts, products.ts, resources.ts
│   ├── hooks/                 # useTheme, useScrollProgress, useBackToTop
│   ├── lib/                   # utils.ts (cn, formatDate)
│   ├── pages/                 # one file per route
│   ├── types/                 # shared TypeScript interfaces
│   ├── App.tsx                 # route definitions
│   ├── main.tsx                 # app entry
│   └── index.css                 # design tokens + base styles
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · React Router · Framer Motion ·
Lucide icons. No CMS or backend — content lives in `src/data/*.ts` as typed
arrays, ready to be swapped for Markdown/MDX or a headless CMS later (see
"Add a blog post" below).

---

## Setup instructions (beginner-friendly)

### 1. Download the project
If you received this as a `.zip`, unzip it anywhere on your computer.

### 2. Install dependencies
You need [Node.js](https://nodejs.org) 18+ installed. Then, in a terminal, `cd`
into the project folder and run:

```bash
npm install
```

### 3. Run it locally
```bash
npm run dev
```
This starts a local dev server (usually `http://localhost:5173`) with hot reload.
Open that URL in your browser.

### 4. Build for production
```bash
npm run build
```
This type-checks the project and outputs an optimized static site into `dist/`.
Preview the production build locally with:
```bash
npm run preview
```

### 5. Deploy to Cloudflare Pages for free
See `DEPLOY.md` for the full step-by-step guide (Cloudflare Workers with static assets, config in `wrangler.jsonc`).

### 6. Connect a custom domain later
In your Vercel project, go to **Settings → Domains**, add your domain (e.g.
`yuktisahu.dev`), and follow the DNS instructions Vercel gives you (usually
adding an `A` or `CNAME` record at your domain registrar).

### 7. Connect Razorpay later
1. In your Razorpay Dashboard go to **Payment Pages** and create one per product (set the price, upload a cover image).
2. Under **Action after successful payment**, choose **Show custom message** and put the product's Notion duplicate link in it (or **Redirect to your website** to send buyers to a thank-you page).
3. Copy the Payment Page link into `razorpayUrl` for that product in `src/data/products.ts` and change `price` to e.g. `'₹499'`.
4. The "Buy now" button on that product's page now opens your Payment Page. For a paid product, make sure the public preview page in `previewUrl` is NOT a duplicable copy (see below).

### 8. Writing and projects update themselves
- **Writing** is pulled live from Dev.to (`yuktisays`, shown as Tech) and Medium (`@Yuktisahu345`, shown as Life & Reflections) by `functions/api/writing.ts`.
- **Projects** are pulled live from GitHub (`yukti-says`) by `functions/api/github.ts`. Forks and archived repos are skipped.
- Both are cached for about 10 minutes, so new posts and pushes appear without redeploying. Give a repo a description and topics on GitHub to make its card look good.
- These run as Cloudflare Pages Functions (in `functions/api/`). To test them locally run `npm run cf:dev`; plain `npm run dev` shows a friendly fallback on those pages.
- Free PDFs: put them in `public/resources/` using the filenames listed in `public/resources/README.txt`.

### 9. Add a new project or product
Same pattern: add an entry to `src/data/projects.ts` or `src/data/products.ts`
following the existing shape (see `src/types/index.ts` for the exact fields).

### 10. Update general content
- Navigation links: `src/components/layout/Navbar.tsx`
- Footer links/socials: `src/components/layout/Footer.tsx`
- Hero copy and homepage sections: `src/pages/Home.tsx`
- About page story/timeline/values: `src/pages/About.tsx`
- Site-wide colors/fonts: `tailwind.config.js`
- Meta tags, structured data, fonts: `index.html`

## Customization guide

- **Colors:** every color is defined once in `tailwind.config.js` under `theme.extend.colors`
  (`paper`, `ink`, `forest`, `ochre`, `brick`, `night*`). Change a hex value there
  and it updates everywhere.
- **Fonts:** swap the Google Fonts `<link>` in `index.html` and update the
  `fontFamily` block in `tailwind.config.js` to match.
- **The "index card" motif:** defined once in `src/index.css` under `.index-card`
  and `.catalog-tab` — reuse those classes anywhere you want the same catalog-card
  treatment.
- **Newsletter/contact form backends:** both forms currently have placeholder
  submit handlers (`src/components/ui/NewsletterInline.tsx`,
  `src/pages/Contact.tsx`) — wire them to your email provider (e.g. Beehiiv,
  ConvertKit) or a form service (e.g. Formspree) by replacing the `handleSubmit`
  function with a real `fetch` call.

## Future improvements

- Swap the static `src/data/posts.ts`, `projects.ts`, and `products.ts`
  arrays for Markdown/MDX files or the same Notion-backed approach used for
  TIL/Reading/Ideas, once content volume grows.
- Add a real search index (e.g. Pagefind or Algolia) if the blog grows beyond a
  page or two.
- Add a command palette (`cmdk`) for fast navigation once there are more pages.
- Wire the newsletter and contact forms to real backends (see above).
- Add view-transition page animations between routes once broader browser
  support lands.
