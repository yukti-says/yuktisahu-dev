# Deploy on Cloudflare (free)

This project deploys as a Cloudflare Worker with static assets (`wrangler.jsonc`).
The site files are served straight from Cloudflare's CDN, and `worker/index.ts` only runs
for the two live-feed endpoints, `/api/writing` and `/api/github`.

## Connect GitHub (every `git push` redeploys)

1. Push this project to a GitHub repository.
2. In https://dash.cloudflare.com go to **Workers & Pages** > **Create** > **Import a repository**.
3. Pick your repo. Leave the defaults:
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
4. Click **Deploy**. You get a `https://<name>.<account>.workers.dev` address.

The worker name in `wrangler.jsonc` ("name") should match the project name in Cloudflare.

## Or deploy from your computer

```bash
npm install
npx wrangler login
npm run deploy
```

## Test locally with the live feeds

```bash
npm run cf:dev
```

## Optional settings

- **GITHUB_TOKEN**: project > Settings > Variables and Secrets. Only needed if GitHub rate-limits.
- **Custom domain**: project > Settings > Domains & Routes. Then update the URLs in
  `public/sitemap.xml`, `public/robots.txt` and `index.html`.

## Checking it works

- `/blog`: Tech and Life tabs fill with your Dev.to and Medium articles.
- `/projects`: your GitHub repos appear.
- A product page shows your screenshots.
