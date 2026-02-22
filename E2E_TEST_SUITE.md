# Threaddits E2E Test Suite — Real User Perspective
**App URL**: `https://threaddits.lovable.app/`
**Auth Method**: Google OAuth (Supabase)
**Last Updated**: 2026-02-21
**How to run**: Paste each "Prompt" block into the Claude Chrome Extension. The extension controls the browser and reports back.

---

## Status Snapshot (Feb 21)

| Page | Data Source | Status |
|------|------------|--------|
| Auth | Supabase Google OAuth | ✅ REAL |
| Dashboard — Vitals, Top Leads, Products | useLeadMetrics / useLeads / useProducts | ✅ REAL |
| Dashboard — System Evolution | lead_feedback table | ✅ REAL (wired Feb 21) |
| Leads Feed (`/feed`) | useLeads / useLeadMetrics | ✅ REAL |
| Products (`/products`) | useProducts | ✅ REAL |
| Edit Product (`/products/:id`) | useProduct | ✅ REAL |
| Onboarding Flow | extract-product-info + onboard-product edge functions | ⚠️ NEEDS VERIFICATION |
| Add Product Modal | Direct Supabase insert (no onboard-product call) | ⚠️ NEEDS VERIFICATION |
| Draft Reply in LeadCard | Client-side template string (no API) | ⚠️ MOCK — improve |
| Settings / Stripe | Hardcoded price ID | ❌ NOT READY |
| Profile | useUserProfile (Supabase users table) | ✅ REAL |

---

## SCENARIO 1: New User — First Time Ever

**Who**: SaaS founder lands on homepage, converts to paying setup.
**Goal**: Verifies the full signup-to-first-lead pipeline works.

### 1A. Homepage → Sign Up

**Prompt:**
```
Navigate to https://threaddits.lovable.app/

Wait for full page load. Verify from top to bottom:

1. HERO: Large heading "Stop Searching." on first line. Second line starts with "Start" followed by a word that rotates through "Selling.", "Scaling.", "Sustaining." with a blinking orange cursor animation.
2. HERO SUBTITLE: Mentions "autonomous lead engine for Reddit" or similar
3. HERO INPUT: A URL input field with placeholder similar to "https://your-product.com" and an orange button "Analyze" or "Start Hunting"
4. SOCIAL PROOF / SHOWCASE: Below hero, some visual section showing leads or product demo
5. FAQ section (look for accordion-style questions about Reddit, bans, buying signals)
6. PRICING section (plan cards, should show Starter and Pro tiers)
7. A CTA section or footer

Interactions:
- Click the logo or "Log in" button (top right if not logged in) — should navigate to /auth
- From /auth page: verify there is a "Sign in with Google" button

Report: Whether all hero sections render, whether the rotating word animation works, whether FAQ accordion expands/collapses, whether pricing plans are visible and what prices are shown. Screenshot the hero, the FAQ, and the pricing.
```

**Pass criteria**: Hero animation works. FAQ toggles. Pricing shows ≥2 tiers. "Sign in with Google" button exists on /auth.
**Fail / Flag**:
- ⚠️ **KNOWN GAP**: Pricing section currently shows hardcoded prices. Stripe integration is NOT wired. Clicking "Upgrade" will not create a real checkout session. Flag this as a blocker for go-live.

---

### 1B. Onboarding Flow — Product Setup

**Prompt:**
```
Navigate to https://threaddits.lovable.app/

Make sure you are logged in. In the hero input field, type a real SaaS URL:
  https://cal.com

Click the Analyze button (orange, should say "Analyze" or "Start Hunting").

STEP 2 - ANALYSIS:
Watch for an analysis animation. It should show:
- "Analyzing your product details..." heading
- 4 log lines appearing one by one: Extracting product DNA... | Identifying Target Persona... | Mapping Pains... | Generating keywords...
- A progress bar

Wait up to 30 seconds. This calls a real Supabase Edge Function (extract-product-info).
If you see an error like "Failed to analyze" or a network error — report it.
If you see the review form — proceed.

STEP 3 - REVIEW:
You should see pre-filled fields:
- Product Name (should be "Cal.com" or similar)
- Target Persona (some role like "sales reps, recruiters")
- Pains / Frustrations (something about scheduling back-and-forth)
- Subreddits (tag chips, ideally 3-8 relevant subreddits)
- Keywords (tag chips)

Edit the Product Name to "Cal.com - E2E Test".
Remove one subreddit by clicking the X on its chip.
Add a new keyword: type "book meeting without email" and press Enter.
Then click "Looks Good! Start Hunting".

STEP 4 - LAUNCH:
Watch for a checklist animation (Connecting to Reddit API... / Filtering noise... / Scoring leads...).
Wait for it to complete.
After completion, you should be redirected to /dashboard.

Report:
- Did the edge function call succeed (did you see real pre-filled data)?
- What product name, subreddit list, and keywords did it extract from cal.com?
- Did the review form accept edits?
- Did the launch animation play?
- Did it redirect to /dashboard?
- Screenshot each step.
```

**Pass criteria**: Edge function returns real data. All 4 steps animate. Redirects to dashboard.
**Fail / Flag**:
- ⚠️ **KNOWN GAP**: `AddProductModal` (used from `/products` page) saves directly to Supabase WITHOUT calling `onboard-product` edge function. Leads will not be discovered for products added via modal. Only OnboardingFlow calls `onboard-product`. These two paths need to be unified.
- ⚠️ If `extract-product-info` times out (>30s), the UX needs a retry button. Check if one exists.

---

## SCENARIO 2: Daily User Ritual — Morning Check

**Who**: Ahmed (existing user, 24 products in pipeline). Does this every morning.
**Goal**: Verifies the core daily workflow — arrive, check leads, rate them, reply.

### 2A. Dashboard Morning Brief

**Prompt:**
```
Navigate to https://threaddits.lovable.app/dashboard

Wait up to 10 seconds for all data to load.

VITALS ROW (4 metric cards):
Record the ACTUAL values shown for:
- Total Leads
- High Intent (8+)
- Quality Density (percentage)
- New Leads (unreviewed count)

These should be REAL numbers from Supabase, not hardcoded. If all show 0 and the products panel is empty, report as a data issue.

TOP 5 HIGH-INTENT LEADS panel:
- How many leads are shown? (should be 1-5)
- Record the intent score and title of the first lead
- Click on any lead row — it should navigate to /feed

ACTIVE PRODUCTS panel:
- How many products are listed?
- Record the product names visible
- Click "Manage" — should go to /products
- Navigate back to /dashboard

SYSTEM EVOLUTION panel (bottom right):
- Does it show any feedback events, or "No feedback yet. Rate leads to train the scoring engine."?
- If events exist, record the first event: verdict (thumbs up/down), post title, subreddit, product

Report all values. Take a full screenshot of the dashboard.
```

**Pass criteria**: All 4 metrics show numbers (not 0/0/0/0 with no explanation). Top leads list renders. Products list renders with real product names. System Evolution shows either events or empty state message.
**Fail / Flag**:
- ❌ **IMPROVEMENT NEEDED**: Vitals row labels should show contextual period ("last 7 days") next to the number — currently "Total Leads" is all-time which is misleading for a daily brief. Recommend adding "7d" or "24h" sub-label.
- ❌ **IMPROVEMENT NEEDED**: System Evolution panel shows nothing until the user has given feedback. For new users this is an empty white box with no actionable guidance. Should show a tip: "Rate leads in the Feed to calibrate your scoring engine."

---

### 2B. Lead Review — The Core Loop

**Prompt:**
```
Navigate to https://threaddits.lovable.app/feed

Wait for leads to load (up to 15 seconds).

PIPELINE BAR: Record Total / New / Potential / Top Matches counts.

FIRST LEAD CARD — examine all parts:
- Intent score badge (color and number)
- Post title (full text)
- Author username (u/...)
- Subreddit (r/...)
- Time ago
- "Open Thread" link — right-click and copy the URL, check it's a real reddit.com URL
- Intelligence box: relevance summary, core pain, urgency, competitors mentioned
- Post excerpt text

RATING — Good Lead:
- Click "Good Lead" (thumbs up icon, top-right of card)
- Verify: success toast appears saying something like "Marked as Good Lead" or "Feedback recorded"
- Verify: lead card stays visible (does not disappear)

STATUS CHANGE:
- On the SAME lead card, look for the status dropdown at bottom left (shows "New", "Contacted", "Won", or "Rejected")
- Click it, select "Contacted"
- Verify: button text changes to "Contacted"
- Verify: no error toast

OPEN THREAD:
- Click the "Open Thread" link (opens Reddit in a new tab)
- Verify it opens a real Reddit URL (reddit.com/r/...)
- Close the tab

SECOND LEAD CARD — Bad Lead:
- Find the SECOND lead card in the list
- Click "Bad Lead" (thumbs down icon)
- Verify: toast appears ("Marked as Bad Lead" or similar)
- Verify: the second lead DISAPPEARS from the feed (dismissed)

Report: all pipeline bar values, all fields from the first lead card, whether Good Lead / Status Change / Bad Lead each worked, whether the Reddit URL was real.
```

**Pass criteria**: Leads load from Supabase. Good Lead toast fires. Status changes persist. Bad Lead dismisses card. Reddit links are real URLs.
**Fail / Flag**:
- ❌ **IMPROVEMENT NEEDED**: `Draft Reply` button generates a templated string client-side (no AI call). The draft says "Hi u/[author], I saw your post..." with post fields filled in, but it is NOT AI-generated — it's a static template. For a product claiming "AI-drafted replies", this needs a real Gemini call to `/generate-reply` or similar. This is a trust/expectation gap.
- ⚠️ After refreshing, check whether the "Contacted" status persisted. If it shows "New" again after refresh, the mutation is not saving to Supabase.

---

### 2C. Hot Filter — Only Show Score 8+

**Prompt:**
```
Navigate to https://threaddits.lovable.app/feed

Wait for leads to load. Click the "Top Matches" segment in the pipeline bar.

Verify:
- The segment becomes visually active (orange bottom border)
- Only lead cards with green score badges (intent_score >= 8) are now visible
- If no leads have score 8+, you should see an empty state message, not a blank screen

Now use the search box:
- Type a word from the first visible lead's title (e.g. a unique word)
- Leads should filter in real time as you type
- Clear the box, all leads come back

Use the Time Filter dropdown:
- Click "All Time" (or current filter button)
- Select "Last 24h"
- Count how many leads remain
- Select "Last Week"
- Count how many leads remain
- Reset to "All Time"

Use the Status Filter:
- Click the status filter, select "New"
- Count leads shown
- Reset to "Show All"

Report all counts (before/after each filter). Confirm filters combine correctly (Top Matches + Last 24h shows intersection).
```

**Pass criteria**: All 4 filter types work independently. Combinations work (score filter + time filter). Empty states show proper messages.

---

## SCENARIO 3: Product Management

### 3A. View and Edit a Product

**Prompt:**
```
Navigate to https://threaddits.lovable.app/products

Wait for load. Record:
- Number of product cards shown
- Name and status (Live/Paused) of each product
- "Leads Found" number for each product

Click the "Edit" button on the FIRST product card.
You should navigate to /products/[some-uuid].

On the Edit Product page, verify these sections exist:
- Product name input (pre-filled with real product name)
- Subreddits section (chips showing real subreddits for this product)
- Keywords section (real keywords, not "Intercom pricing" mock data)
- A performance section (total leads, last run time)

Click the product name input. Change it to "[original name] - EDITED".
Click Save.
Verify: success toast appears.
Navigate back to /products.
Verify: the product card now shows the updated name.
Change the name back and save.

Report: product list, edit page fields, whether save worked and persisted.
```

**Pass criteria**: Products load from Supabase (real product names like Calendly, Loom, Notion — not mock "Intercom Alternative"). Edit saves and reflects on products page.
**Fail / Flag**:
- ❌ **IMPROVEMENT NEEDED**: The Products page shows `last_run_at` as "No sweeps yet" for products with `last_run_at = null` (set intentionally for SPRINT mode). This confuses users — they see a live product but think it never ran. Should show "Running first sweep..." or check crawler_runs table instead.

---

### 3B. Pause / Resume a Product

**Prompt:**
```
Navigate to https://threaddits.lovable.app/products

Find any product card that shows "Live Hunting" (green pulsing dot).
Click the "Pause" button on that card.

Verify:
- The status indicator changes from green "Live Hunting" to gray "Paused"
- A toast appears confirming the status change

Refresh the page.
Verify: the product still shows "Paused" (change persisted in Supabase).

Now click "Resume" on the same card.
Verify: status returns to "Live Hunting".
Refresh again. Verify status is "Live Hunting" in DB.

Report: whether toggle works, whether it persists after refresh.
```

**Pass criteria**: Pause/resume toggle is instant, persists in Supabase, reflected after refresh.

---

## SCENARIO 4: Auth Flows

### 4A. Session Persistence

**Prompt:**
```
Navigate to https://threaddits.lovable.app/dashboard
Verify you are logged in (you see the Dashboard content).

Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R).
Wait 5 seconds.

Verify:
- You are still on /dashboard (not redirected to /auth)
- The sidebar shows your user name/email
- Metric cards load their numbers

Now close and reopen the tab (or open a new tab to the same URL).
Verify the session is still active (no login required).

Report: whether session survives hard refresh and tab close/reopen.
```

**Pass criteria**: Session persists across hard refresh and tab reopen (Supabase persists tokens in localStorage).

---

### 4B. Protected Route Guard

**Prompt:**
```
First, log out: click the logout icon at the bottom of the sidebar.
Verify redirect to /auth.

Now attempt to access each protected route directly:
1. Navigate to https://threaddits.lovable.app/dashboard → should redirect to /auth
2. Navigate to https://threaddits.lovable.app/feed → should redirect to /auth
3. Navigate to https://threaddits.lovable.app/products → should redirect to /auth

Public routes that should NOT redirect:
4. Navigate to https://threaddits.lovable.app/ → should show homepage
5. Navigate to https://threaddits.lovable.app/auth → should show login page

Report a table: Route | Expected | Actual | Pass/Fail
```

**Pass criteria**: All 3 protected routes redirect to /auth. Both public routes load without redirect.

---

## SCENARIO 5: Edge Cases and Stress Tests

### 5A. Empty States

**Prompt:**
```
Navigate to https://threaddits.lovable.app/feed

Apply the Time Filter "Last 24h" AND the pipeline bar "Top Matches" filter together.
If this returns 0 results, verify:
- The page shows an empty state message (NOT a blank white area, NOT a loading spinner)
- The message says something like "No signals found matching criteria."

Now apply Status Filter "Won" (most likely 0 won leads).
Same check: empty state message should appear.

Navigate to /dashboard.
In the System Evolution panel, if there are no feedback events:
- Does it show an empty state message?
- Or is it a blank/invisible box?

Navigate to /settings.
In the Billing History section, verify:
- "No invoices yet." message OR a table with real invoices
- NOT a loading spinner that never resolves

Navigate to https://threaddits.lovable.app/nonexistent-route
Verify: a 404 page shows with a "Return to Home" or similar button.
Click it — should go back to the homepage.

Report: whether each empty state is handled gracefully (message shown) or crashes/blanks.
```

**Pass criteria**: All empty states show user-friendly messages. No blank white boxes. 404 page exists and links back.
**Fail / Flag**:
- ⚠️ GitHub Pages SPA routing: `/nonexistent-route` may return GitHub's 404 page (not the app's) unless the `404.html` redirect trick is in place. Check whether this was configured.

---

### 5B. Mobile Viewport

**Prompt:**
```
Set viewport to 375px wide × 812px tall (iPhone dimensions).

Navigate to https://threaddits.lovable.app/dashboard

Verify:
- The sidebar is HIDDEN (collapsed on mobile)
- A hamburger menu icon exists (top-left or top-right)
- Click the hamburger icon — sidebar slides in from left
- Nav links (Dashboard, Leads, Products, Billing) are all visible in the mobile sidebar
- Click outside or press X to close the sidebar

Check /feed on mobile:
- Pipeline bar 4 segments fit horizontally without overflow
- Lead cards are full-width, nothing cut off
- Score badge, title, rating buttons (Good/Bad) all visible

Check /products on mobile:
- Product cards stack in 1 column
- Edit / Pause buttons accessible

Report: sidebar behavior, layout issues, any horizontal scroll, any buttons too small to tap.
```

**Pass criteria**: Mobile sidebar works. No horizontal scroll. All interactive elements accessible on 375px viewport.
**Fail / Flag**:
- ⚠️ The control strip on `/feed` (search + 2 filter buttons) may overflow on 375px — verify it wraps or scrolls cleanly.

---

## What Needs Improvement (Flagged for Review)

These are real gaps found during test design. **You evaluate which to fix before go-live.**

| # | Issue | Severity | Where | Fix |
|---|-------|----------|-------|-----|
| 1 | **Draft Reply is a static template, not AI** | HIGH | LeadCard | Call a generate-reply edge function with lead context → real Gemini-drafted reply |
| 2 | **AddProductModal doesn't call onboard-product** | HIGH | AddProductModal | After save, call `onboard-product` edge function with the new product_id |
| 3 | **Stripe not wired** | HIGH | /settings | Fix price IDs, add auth check, test checkout session creation |
| 4 | **"No sweeps yet" for SPRINT-mode products** | MEDIUM | ProductCard | Check `crawler_runs` table for recent run OR show "First sweep running..." when `last_run_at = null` |
| 5 | **System Evolution empty on new accounts** | MEDIUM | Dashboard | Show instructional empty state: "Rate leads in your Feed to start calibrating the engine" |
| 6 | **r/undefined in Telegram hot lead alerts** | MEDIUM | n8n workflow | Fix subreddit field lookup in "Telegram Hot Lead Alert" node (source_subreddit comes from nested data) |
| 7 | **Dashboard Vitals: "Total Leads" is all-time** | LOW | Dashboard | Add sub-label clarifying period. OR change to 7-day leads + trend % vs prior week |
| 8 | **404 routing on GitHub Pages** | LOW | gh-pages | Confirm 404.html redirect script is present; test /nonexistent-route |
| 9 | **No loading state on Onboarding if edge function is slow** | LOW | OnboardingFlow | Add timeout message: "Still analyzing... (this takes up to 30s)" after 10s |
| 10 | **Leads "Last 24h" likely shows 0** | MEDIUM | /feed | Confirm DAILY mode fetchStrategy=new is finding fresh posts. Test this filter produces results |

---

## When to Add the Paywall

**Short answer: Now — but conditionally.**

**Condition 1 — Gate on Stripe working (Issue #3 above)**
The settings page has a hardcoded Stripe price ID. Until 3.1–3.4 from Phase 3 are done, the upgrade button leads nowhere real. Fix Stripe first (est. 1 day), then the paywall is live.

**Condition 2 — Gate on the core loop being trustworthy**
The paywall should activate AFTER:
- Draft Reply is real (Issue #1) — or explicitly labeled "suggested template" not "AI draft"
- AddProductModal calls onboard-product (Issue #2) — otherwise paid users add products that never get leads

**Recommended sequencing:**

```
Right now (Week of Feb 21):
  ✅ Fix Draft Reply (call edge function or label as template)
  ✅ Fix AddProductModal → call onboard-product
  ✅ Fix Stripe (price IDs, auth, checkout session)

Feb 26 go-live (as planned):
  ✅ Activate paywall
  ✅ STARTER (free): 1 product, Telegram alerts off, basic lead feed
  ✅ PRO ($79/mo): 3 products, hot lead Telegram alerts, full System Evolution, CSV export
  ✅ AGENCY ($199/mo): 10 products, dedicated crawls, priority scoring

The paywall gating already exists in the codebase:
  - Products page: checks subscription_tier → STARTER blocks at 1 product
  - Locked slots show "Upgrade to Pro" CTA
  - useUserProfile hook reads subscription_tier from DB

What's missing: Stripe webhook → write to users.subscription_tier in Supabase.
Without this, even paying users stay on STARTER forever.
```

**Do NOT gate behind paywall yet:**
- The Leads feed itself (core value — let free users see leads so they feel the value before converting)
- The feedback (Good/Bad Lead) flow — this trains the system, even free users should do it
- The Dashboard metrics — showing the number going up is your best conversion hook

---

## Test Schedule (Run Daily)

| Time | Scenario | Est. Duration | Who Triggers |
|------|----------|--------------|--------------|
| 7:00 AM | Scenario 2A — Dashboard Morning Brief | 3 min | Claude Chrome Extension |
| 7:05 AM | Scenario 2B — Lead Review Core Loop | 5 min | Claude Chrome Extension |
| 9:00 AM | Scenario 2C — Hot Filter | 2 min | Claude Chrome Extension |
| On deploy | Scenario 1B — Onboarding Flow | 5 min | Manual / Claude |
| Weekly | Scenario 4B — Protected Routes | 2 min | Claude Chrome Extension |
| Weekly | Scenario 5B — Mobile Viewport | 3 min | Claude Chrome Extension |

**Output format for each run:**
- PASS / FAIL / PARTIAL per scenario
- Screenshots of failures
- Count of leads visible (tracks if engine is finding new leads)
- Any console errors (use `read_console_messages` with `onlyErrors: true`)
