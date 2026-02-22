# Threaddits

Reddit lead intelligence for B2B SaaS teams. Finds high-intent buyers discussing your product category — not just brand mentions.

**Live**: https://threaddits.com (Verifying DNS) | https://threaddits.lovable.app

## What it does

- Scans Reddit for posts showing active buying intent (evaluating tools, frustrated with competitors, asking for recommendations)
- Scores leads 1-10 using Gemini — filters out competitors, founders validating ideas, and off-topic noise
- SPRINT mode on first run: sweeps 12 months of history → 100+ scored leads on day 1
- DAILY mode: fresh leads from the past week, every hour
- Multi-product: track all your competitors' Reddit mentions in one dashboard

## Tech Stack

- **Frontend**: React + Vite + TypeScript + Tailwind + shadcn-ui
- **Backend**: Supabase (Postgres + Edge Functions + RLS)
- **Engine**: n8n workflow on n8n.praise-me.com (Lead Discovery: `SuMgEHhvOYknKYMS`)
- **AI**: Gemini 2.0 Flash for lead scoring and keyword evolution
- **Payments**: Stripe ($29/mo Starter, $79/mo Growth)
- **Auth**: Supabase Auth

## GitHub

- **Repo**: https://github.com/ahmednsaleh/threaded-stories
- **Deploy**: Lovable (auto-syncs from GitHub `main` branch)

## Local Development

```sh
cd products/threaddits-lovable
yarn install
yarn dev
```

**Note**: Supabase anon key is hardcoded in `src/integrations/supabase/client.ts` — do NOT use `import.meta.env.VITE_*` for Supabase creds in Lovable (Lovable injects old build-time values that can't be overridden at runtime).

## Backend

- **Supabase project**: `fmwtgtmdtgnctrrckaab`
- **Edge functions**: `infrastructure/supabase/functions/`
- **Migrations**: `infrastructure/supabase/migrations/`
- **n8n workflow docs**: `PRODUCTION_PLAN.md` → n8n Workflow Architecture section

## Status

See `PRODUCTION_PLAN.md` for full production status and go-live checklist.

**Current grade**: A++++ — engine clean, 24 products, 1,884+ leads, all pages wired, Stripe live, DNS verifying.
