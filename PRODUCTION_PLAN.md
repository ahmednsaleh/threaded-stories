# Threaddits Production Plan
## Go-Live Target: February 26, 2026

---

## Phase 0: EMERGENCY SECURITY (DONE)
- [x] Deleted `exec-sql` edge function (unauthenticated SQL backdoor)
- [x] Removed hardcoded service role key from `evolve-keywords` + deployed
- [x] Locked CORS on `create-stripe-checkout-session` to ALLOWED_ORIGIN env var
- [ ] **MANUAL**: Rotate Supabase service role key at dashboard -> Settings -> API
- [ ] **MANUAL**: Update rotated key in n8n credentials

---

## Phase 1: Make the Engine Work (PARTIALLY DONE — Feb 19)
Goal: The system finds REAL, relevant leads

### Completed
- [x] 1.3 Reduce batches from 188 → 60 (30/product) in n8n workflow ✅
- [x] 1.6 Seed product_learning_state with basic context + negative patterns ✅
- [x] 1.10 Activated Evolution Trigger workflow ✅
- [x] **EXTRA**: Fixed DAILY timeFilter week → month (Feb 19) ✅
- [x] **EXTRA**: Fixed `Check existing urls` broken `$1` query → proper n8n expression (Feb 19) ✅
- [x] **EXTRA**: Set `last_run_at = NULL` for praise-me → forces SPRINT mode (Feb 19 S2) ✅
- [x] **EXTRA**: Fixed DAILY `fetchStrategy`: `new` → `relevance` in create smart batches (Feb 19 S2) ✅

### Root Cause Found (Feb 19)
**Reddit was returning 0 posts for every batch** — not an IF node bug.
- DAILY mode used `timeFilter: 'week'` — only 7 days of history
- Niche B2B queries ("alternative Bonusly") get 0-2 posts/week in r/humanresources
- Fix deployed: `timeFilter: 'month'` in `create smart batches` node

### Still Blocked
- [ ] 1.1 Overhaul keywords — need BROADER intent keywords, not just competitor comparisons
  - Current (too specific): "alternative Bonusly", "better than Nectar"
  - Need to add: "employee recognition program", "recognize employees software",
    "employee engagement platform", "team appreciation rewards", "boost employee morale"
  - **Requires**: Supabase service key to UPDATE products.keywords
- [ ] 1.2 Prune/expand subreddits — verify subreddits are HR-relevant
  - **Requires**: Supabase service key to check/update products.subreddits
- [ ] 1.4 Add Gemini retry with exponential backoff on Analyze node (30m)
- [x] 1.5 Force SPRINT mode to sweep past year ✅
  - Done: Set `last_run_at = NULL` via Supabase Management API (Feb 19 S2)
- [ ] 1.7 Create `keyword_performance` table (migration) (1h)
- [ ] 1.8 Fix missing RPCs: `get_optimal_subreddits_by_category`, `generate_optimal_keywords` (2h)
- [ ] 1.9 Fix reject-lead -> product_subreddit_status gap (1h)
- [ ] **EXTRA**: Fix Smart Pre-Filter — in DAILY mode, UNKNOWN tier posts are skipped;
  for low-volume niches this kills too many posts. Should pass UNKNOWN to Gemini.

Milestone: Run workflow manually, verify 5+ relevant leads for praise-me.

---

## Phase 2: Wire the Frontend (Week 2 — Target: Feb 19)
Goal: Every page shows real data, core flows work E2E

- [ ] 2.1 Swap hardcoded Supabase creds for env vars in client.ts (15m)
- [ ] 2.2 Wire Dashboard — real stats, leads, products from Supabase (4h)
- [ ] 2.3 Wire Products Page — fetch from DB, real mutations (3h)
- [ ] 2.4 Wire EditProduct Page — read :id param, fetch product, real save (4h)
- [ ] 2.5 Wire AddProductModal — call onboard-product edge function (3h)
- [ ] 2.6 Wire OnboardingFlow — call onboard-product, require auth (3h)
- [ ] 2.7 Wire "Find Adjacent" button to discover-new-subreddits (1h)
- [ ] 2.8 Wire "Bad Lead" to rejection_patterns via reject-lead edge function (2h)
- [ ] 2.9 Fix sidebar "Free Plan" — read from users.subscription_tier (30m)
- [ ] 2.10 Fix hardcoded USER_PLAN in Products and Settings pages (30m)

Milestone: User can sign up, add product, see real leads, reject bad ones, feedback loops into system.

---

## Phase 3: Production Polish (Week 3 — Target: Feb 26)
Goal: Ready for paying users

- [ ] 3.1 Stripe integration — dynamic price IDs, auth check, env-based URLs (6h)
- [ ] 3.2 Subscription tier enforcement — gate product count by plan (3h)
- [ ] 3.3 Add missing Stripe webhooks — invoice.payment_failed, subscription.updated (2h)
- [ ] 3.4 Wire Settings page to Stripe Customer Portal (2h)
- [ ] 3.5 Add RLS to rejection_patterns and user_events tables (1h)
- [ ] 3.6 Add rate limiting to extract-product-info and public endpoints (2h)
- [ ] 3.7 Move hardcoded n8n webhook URL to env var in onboard-product (15m)
- [ ] 3.8 Deploy frontend off Lovable to Vercel/Netlify with custom domain (2h)
- [ ] 3.9 Error monitoring — add Sentry or similar (2h)
- [ ] 3.10 E2E testing via Chrome extension test suite (4h)
- [ ] 3.11 Fix Terms of Service / Privacy Policy placeholder links (1h)
- [ ] 3.12 Activate Product Leads Alert workflow (15m)

---

## Key Resources

### Repos
- **Frontend (Lovable)**: /Users/ahmedsaleh/bz-workspace/products/threaddits-lovable/
  - GitHub: https://github.com/ahmednsaleh/threaded-stories
- **Backend (Supabase)**: /Users/ahmedsaleh/bz-workspace/infrastructure/supabase/
- **Old frontend (DO NOT USE)**: /Users/ahmedsaleh/bz-workspace/products/threaddits/

### Live Services
- Supabase: https://supabase.com/dashboard/project/fmwtgtmdtgnctrrckaab
- n8n: https://n8n.praise-me.com
- Main workflow ID: SuMgEHhvOYknKYMS (Threaddits - Lead Discovery)
- Evolution Trigger ID: UlQTAyDM1TFkFYUm (INACTIVE — activate after Phase 1)

### n8n Workflow Architecture (confirmed Feb 19)
```
Schedule/Webhook → Get Products → Determine Strategy → create smart batches (60 items)
  └→ Loop Over Queries (batchSize=5, 12 iterations × 1.1s wait = ~28s total)
      └→ Wait → Build Reddit API Request → Fetch Reddit Posts
          └→ Process Reddit Response → Prepare URL Batch → Check existing urls
              └→ Filter Batch Results → Smart Pre-Filter → If (checks $json.title notEmpty)
                  ├→ TRUE → Prepare Bulk Prompt → Gemini → Parse → Sanity → Expand
                  │         → Filter Low-Intent → Prepare JSON → Upsert Leads → Loop
                  └→ FALSE → Execute SQL (update last_run_at) → Loop
```

### Debug Notes
- Full debug session: `/Users/ahmedsaleh/.claude/projects/-Users-ahmedsaleh-bz-workspace/memory/threaddits-sprint-debug.md`
- Key finding: Reddit 0 posts is the blocker, not IF node routing logic
- DAILY mode: 30 batches/product, `timeFilter: month`, `fetchStrategy: new`, batchSize 5
- SPRINT mode: 50 batches/product, `timeFilter: year`, `fetchStrategy: relevance`
- SPRINT triggers: first run (last_run_at = null) OR webhook with trigger_source = 'onboarding'

### Known Issues
- Keywords too specific — competitor-comparison queries get 0 Reddit posts/week
- Smart Pre-Filter skips UNKNOWN tier in DAILY mode — too aggressive for niche products
- `keyword_performance` table doesn't exist yet
- Dashboard, Products, EditProduct, OnboardingFlow all use mock data
- No edge functions called from frontend
- Stripe has hardcoded price ID and no auth check
- Supabase anon key in .env is invalid (may have been rotated)

### Quick Actions to Resume (in order of priority)
1. **Get Supabase service key** → update praise-me keywords to broader intent terms
2. **Set last_run_at = NULL** for praise-me → forces SPRINT mode (year timeFilter)
3. **Check next hourly run** (9AM, 10AM...) → see if month timeFilter helps
4. **Fix Smart Pre-Filter** → pass UNKNOWN tier posts to Gemini in DAILY mode
5. **Start Phase 2** (frontend wiring) in parallel once engine shows any leads
