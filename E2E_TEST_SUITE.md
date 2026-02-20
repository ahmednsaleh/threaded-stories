# Threaddits E2E Test Suite for Claude Chrome Extension

**App URL**: `https://threaddits.lovable.app/`
**Auth Method**: Google OAuth (Supabase)
**Last Updated**: 2026-02-05

> Each test below is a self-contained prompt you paste into the Claude Chrome Extension.
> The extension controls the browser, clicks elements, reads content, and reports results.

---

## AUTHENTICATION TESTS

---

### TEST 1: Login Flow (Google OAuth)
**What it tests**: The Google Sign-In button on /auth page works and initiates OAuth flow
**Preconditions**: User is NOT logged in (no active Supabase session). Clear cookies/storage for threaddits.lovable.app if needed.

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/auth

Wait for the page to fully load. Verify the following elements are present:

1. A logo at the top of the page (clickable, should link to homepage)
2. A card with the heading "Access Your Dashboard"
3. A subheading that says "Sign in to start finding high-intent leads."
4. A button with text "Sign in with Google" — it should be an orange/burnt-orange button (bg color #C2410C) with a Google icon inside a white circle to the left of the text
5. Text at the bottom mentioning "Terms of Service" and "Privacy Policy" links

Now click the "Sign in with Google" button.

After clicking, observe what happens:
- The button text should change to show a spinning loader (the text "Sign in with Google" disappears and a spinner appears)
- The browser should begin redirecting to Google's OAuth consent screen (accounts.google.com)

Report:
- Whether all 5 elements were found on the /auth page
- Whether clicking the button showed a loading spinner
- Whether a redirect to Google OAuth was initiated (the URL should start changing to accounts.google.com or similar)
- Screenshot the auth page before clicking, and screenshot after clicking (or during redirect)
```

**Expected Result**: All 5 UI elements present. Button shows spinner on click. Browser redirects to Google OAuth.
**Failure Indicators**: Missing elements, button does nothing, no redirect, JavaScript errors in console.

---

### TEST 2: Session Persistence (Refresh Check)
**What it tests**: After logging in, refreshing the page keeps the user authenticated
**Preconditions**: User IS logged in (has active session). Must be on a protected route like /dashboard.

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/dashboard

Wait for the page to fully load. Check if the page shows:
1. A sidebar on the left with a dark background (bg-[#0F172A]) containing navigation links
2. The main content area with the heading "Dashboard" and subheading "Your autonomous lead pipeline."

If you see these elements, the user is logged in. Take a screenshot.

Now refresh the page (press F5 or navigate to the same URL again).

Wait for the page to fully load again (up to 10 seconds). During loading, you may briefly see a spinner (an orange spinning circle).

After the page reloads, verify:
1. The page still shows the Dashboard content (heading "Dashboard")
2. The sidebar is still visible with navigation links: "Dashboard", "Leads", "Products", "Billing"
3. You were NOT redirected to /auth
4. The user profile section at the bottom of the sidebar shows user info (name or email)

Report whether the session persisted after refresh, and take a screenshot of the reloaded page.
```

**Expected Result**: Page reloads and user remains on /dashboard with all elements intact. No redirect to /auth.
**Failure Indicators**: Redirected to /auth after refresh. Blank page. Infinite loading spinner.

---

### TEST 3: Logout
**What it tests**: Clicking the logout button signs the user out and redirects to /auth
**Preconditions**: User IS logged in.

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/dashboard

Wait for the page to load. Look at the sidebar on the left side of the page.

At the very bottom of the sidebar, there should be:
1. A user profile section showing the user's name/email and "Free Plan" text
2. To the right of the profile section, a logout button with a LogOut icon (an arrow pointing right out of a door shape)

The logout button has a title attribute "Log out" and when hovered turns red.

Click the logout button.

After clicking, observe:
1. The page should redirect to /auth (the login page)
2. The URL should change to https://threaddits.lovable.app/auth
3. The login page should show "Access Your Dashboard" and the "Sign in with Google" button

Now try navigating directly to https://threaddits.lovable.app/dashboard

Observe: You should be redirected back to /auth because the session was cleared.

Report:
- Whether the logout button was found and clickable
- Whether clicking it redirected to /auth
- Whether navigating to /dashboard after logout redirected back to /auth
- Take screenshots at each step
```

**Expected Result**: Logout button visible, click redirects to /auth, attempting /dashboard after logout also redirects to /auth.
**Failure Indicators**: Logout button missing, no redirect after click, can still access /dashboard after logout.

---

### TEST 4: Protected Routes (Unauthenticated Access)
**What it tests**: Unauthenticated users cannot access /dashboard, /feed, /products, /settings, /profile
**Preconditions**: User is NOT logged in.

**Prompt for Chrome Extension:**
```
Make sure you are not logged in. If you are logged in, first navigate to https://threaddits.lovable.app/auth and look for the logout mechanism or clear site data.

Now test each protected route one by one:

1. Navigate to https://threaddits.lovable.app/dashboard
   Wait 5 seconds. Record the final URL you end up on.

2. Navigate to https://threaddits.lovable.app/feed
   Wait 5 seconds. Record the final URL you end up on.

3. Navigate to https://threaddits.lovable.app/products
   Wait 5 seconds. Record the final URL you end up on.

4. Navigate to https://threaddits.lovable.app/settings
   Wait 5 seconds. Record the final URL you end up on.

5. Navigate to https://threaddits.lovable.app/profile
   Wait 5 seconds. Record the final URL you end up on.

For each route, report:
- The URL you navigated to
- The final URL you ended up on
- Whether you were redirected to /auth
- What content is visible on the page

All 5 routes should redirect to /auth since they are wrapped in the AppLayout component which checks for authentication.

Also test the public routes that should NOT redirect:
6. Navigate to https://threaddits.lovable.app/
   This should show the homepage (landing page with hero text "Stop Searching. Start Selling/Scaling/Sustaining.")

7. Navigate to https://threaddits.lovable.app/auth
   This should show the login page.

Report a summary table of all 7 routes tested.
```

**Expected Result**: Routes 1-5 redirect to /auth. Routes 6-7 load their respective public pages.
**Failure Indicators**: Any protected route loads without redirecting. Public routes redirect unnecessarily.

---

## DASHBOARD TESTS

---

### TEST 5: Dashboard Load and Metrics Display
**What it tests**: Dashboard page loads with all sections: stats grid, top leads, active products, system evolution
**Preconditions**: User IS logged in.

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/dashboard

Wait for the page to fully load. Verify the following sections exist in order:

SECTION 1 - HEADER:
- Heading text: "Dashboard"
- Subheading: "Your autonomous lead pipeline."

SECTION 2 - THE VITALS (Stats Grid):
Look for a row of 4 metric cards. Each card should have:
- A label in small uppercase text
- A large number value
Check for these 4 metrics:
  a. "Leads Found (7d)" with a number and a percentage badge (e.g., "+12%")
  b. "High Intent (8+)" with a number
  c. "Quality Density" with a percentage and "Signal Ratio" text
  d. "Market Coverage" with a number and "Posts Scanned" text

NOTE: These may show MOCK data (hardcoded values like 42, 18, 14%, 12.4k) OR real data from Supabase. Record whatever values are shown.

SECTION 3 - TOP 5 HIGH-INTENT LEADS:
- A card with header "Top 5 High-Intent Leads" and a Target icon
- A "View All" button that should link to /feed
- A list of up to 5 lead items, each showing: a score badge, title text, subreddit tag, and a match reason
- NOTE: These may be hardcoded mock leads (scores like 9.8, 9.4, 8.9, 8.5, 8.2) or real data

SECTION 4 - ACTIVE PRODUCTS:
- A card with "Active Products" header and a "Manage" button
- Product cards showing product name, keyword count, and "Live" status
- An "Add Product" button with a dashed border at the bottom
- NOTE: May show mock products ("Intercom Alternative", "Agency Scale Tool") or real data

SECTION 5 - SYSTEM EVOLUTION:
- A card with "System Evolution" header and a brain icon
- A timeline of events with colored dots (blue for optimization, green for discovery, amber for warning)
- Each event shows a type label, time ago, and description

Report:
- Whether all 5 sections were found
- The actual values shown in the stats grid
- How many leads are in the top leads list
- How many products are shown
- How many evolution events are visible
- Whether the data appears to be MOCK (hardcoded) or REAL (from database)
- Take a full-page screenshot
```

**Expected Result**: All 5 sections render. Stats show numbers. Leads list has items. Products section shows at least one product.
**Failure Indicators**: Missing sections, blank areas, loading spinners that never resolve, JavaScript errors.

---

## PRODUCTS TESTS

---

### TEST 6: Products Page - List All Products
**What it tests**: Products page loads and shows product cards with correct information
**Preconditions**: User IS logged in.

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/products

Wait for the page to fully load. Verify:

1. PAGE HEADER:
   - Heading "My Products"
   - A plan badge showing "Plan: STARTER"
   - Subtext: "Manage target personas and value propositions."

2. PRODUCT CARDS:
   For each product card visible, record:
   - Product name (shown as a bold heading)
   - Status indicator: look for a green pulsing dot with "Live Hunting" text, or "Paused"
   - An "AVG" quality badge with a score (e.g., "AVG 8.4")
   - TARGET section with a persona description
   - TRIGGERS section with pain point tags
   - "LEADS FOUND" with a large number
   - "Last sweep" timestamp
   - Action buttons at the bottom: "Edit" button, "Pause"/"Resume" button, and a trash icon button

3. EMPTY SLOTS:
   - After the product cards, there should be empty slot placeholders
   - Some slots may show "Add New Product" (clickable)
   - Some may show "Unlock Slot" with a lock icon (for plan-limited slots)
   - The locked slots should have an "Upgrade to Pro" link

4. SLOT CAPACITY:
   - Total grid should show 3 slots (products + empty slots = 3)
   - On STARTER plan, only 1 product slot is usable; slots 2 and 3 should be locked

NOTE: Products page uses MOCK data locally (not from Supabase). The mock product is "Intercom Alternative" with persona "Bootstrapped SaaS Founders".

Report:
- Number of product cards shown
- Details of each product card
- Number of empty/locked slots
- Whether the plan limitation is enforced (STARTER = 1 product max)
- Take a screenshot
```

**Expected Result**: 1 mock product card ("Intercom Alternative") + 2 empty slots (1 unlocked "Add New Product", 1 locked "Unlock Slot"). Total = 3 grid items.
**Failure Indicators**: No products shown, wrong slot count, plan badge missing.

---

### TEST 7: Products - Add New Product (Onboarding Modal)
**What it tests**: The add product modal flow: URL input, analysis simulation, review form, save
**Preconditions**: User IS logged in, on /products page. Note: On STARTER plan, adding a second product shows an error toast.

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/products

Wait for the page to load.

STEP 1: TRIGGER THE MODAL
Click on the empty slot that says "Add New Product" (it should be the first empty slot after the existing product card, with a "+" icon and dashed border).

OBSERVE: Since the plan is STARTER and there is already 1 product, clicking should show an ERROR TOAST notification at the top of the page saying "Plan limit reached" with description "Upgrade to Pro ($49/mo) to add more products."

The modal should NOT open on STARTER plan with 1 existing product.

Record whether the error toast appeared and what it said.

STEP 2: TEST THE MODAL ON HOMEPAGE INSTEAD
Since the products page blocks adding on STARTER, let's test the onboarding flow on the homepage instead.

Navigate to https://threaddits.lovable.app/

On the homepage, look for a URL input field in the hero section. It should have placeholder text like "https://your-product.com" or similar, with a button that says something like "Start Hunting" or "Analyze".

Type "https://example-saas.com" into the input field and press Enter or click the analyze button.

OBSERVE the flow:
a. ANALYSIS STEP: The page should switch to an analysis view showing:
   - "Analyzing your product details..." heading
   - A progress bar filling up
   - Log messages appearing one by one:
     - "Extracting product DNA and Value Prop..."
     - "Identifying Target Persona and Primary Job..."
     - "Mapping Pains & Frustrations..."
     - "Generating strategic keywords..."

b. REVIEW STEP: After ~5 seconds, it should switch to a review form:
   - "Here's what our AI understood." heading
   - Editable fields for: Product Name, Target Persona, Primary Job, Pains or Frustrations, Value Proposition, Found Subreddits (tag chips), Strategic Keywords (tag chips)
   - Pre-filled with mock data (e.g., "Threaddits", "B2B SaaS Founders & Growth Marketers")
   - A "Looks Good! Start Hunting" button at the bottom

c. Try editing the Product Name field to "Test Product E2E"

d. Click "Looks Good! Start Hunting"

e. LAUNCH STEP: Should show "Initializing Autonomous Agents..." with a checklist:
   - "Connecting to Reddit API..."
   - "Filtering noise (Student/Career posts)..."
   - "Scoring leads (Intent Model v2)..."
   Each item should animate from "Queued" to "Active" (with spinner) to "Success" (with green checkmark)

f. After the launch animation completes, it should redirect to /dashboard

Report on each step: what you saw, whether animations played, and the final redirect destination.
Take screenshots at the analysis, review, and launch steps.
```

**Expected Result**: STARTER plan blocks adding via products page (toast error). Homepage onboarding flow works through all 4 steps (input -> analysis -> review -> launch -> redirect to /dashboard).
**Failure Indicators**: No error toast on products page, onboarding gets stuck at any step, no redirect after launch.

---

### TEST 8: Products - Edit Existing Product
**What it tests**: Navigating to /products/:id shows the edit page with product configuration
**Preconditions**: User IS logged in.

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/products/1

Wait for the page to fully load. Verify the following sections:

SECTION 1 - HEADER:
- Product name heading: "Intercom Alternative"
- A status toggle button showing "Live Hunting" with a green icon (or "Paused")
- Subtext: "Configure your autonomous agents and monitor performance."

SECTION 2 - PRODUCT DNA (Left Column):
A card with "Product DNA" header and a "Save" button (orange, says "Save"). Inside:
- "Product Name" input field with value "Intercom Alternative"
- "Website URL" input with value "https://threaddits.com"
- "Target Persona" textarea with text about "CTOs of bootstrapped SaaS companies..."
- "Primary Job" textarea about "Capture and resolve customer support queries..."
- "Pains or Frustrations" textarea about "Intercom is too expensive..."
- "Value Proposition" textarea about "The only AI-powered chat widget..."

SECTION 3 - SUBREDDITS:
A card with "Subreddits" header. Contains:
- A "Find Adjacent" button (with sparkles icon)
- An input field with "r/..." placeholder and an "Add" button
- A grid of subreddit cards, each showing: subreddit name (e.g., r/SaaS), a colored dot (green/amber/gray based on signal score), and leads count
- An X button to remove each subreddit (visible on hover)
- Expected subreddits: r/SaaS, r/startups, r/marketing, r/entrepreneur, r/sideproject, r/smallbusiness

SECTION 4 - KEYWORDS:
A card with "Keywords" header. Contains:
- An "Add keyword..." input field
- A tier selector dropdown with options: Core, Pain Point, Competitor
- An "Add" button
- A table with columns: Keyword, Tier, Performance, Action
- Each keyword row shows: the keyword text, a tier badge (colored), performance indicator (leads count or "Learning" status), and a trash icon
- Expected keywords: "Intercom pricing", "customer chat tool", "too expensive", "support automation", "Drift alternative"

SECTION 5 - RIGHT COLUMN:
a. Performance card (dark background, nearly black):
   - "Performance" label with a green pulsing dot
   - A large number for "Total Leads Found"
   - "Avg Quality" score (e.g., 8.4/10)

b. System Evolution timeline:
   - "System Evolution" header with brain icon
   - Timeline of optimization/discovery/warning events with colored dots

TEST INTERACTIONS:
1. Click the status toggle (Live Hunting / Paused button) - it should toggle between "Live Hunting" and "Paused" and show a toast notification
2. Type "r/webdev" in the subreddit input and click "Add" - a new subreddit card should appear and a toast "Monitoring r/webdev" should show
3. Type "cheap alternative" in the keyword input, select "Pain Point" from the tier dropdown, click "Add" - a new keyword row should appear with a "Pain Point" tier badge
4. Click the "Save" button in the Product DNA section - should show a toast "Configuration Saved"

Report:
- Whether all 5 sections are present
- The actual values in each input field
- Whether each interaction (toggle, add subreddit, add keyword, save) worked as expected
- Take screenshots before and after interactions
```

**Expected Result**: All sections render with mock data. Toggle, add subreddit, add keyword, and save all trigger appropriate toasts.
**Failure Indicators**: Missing sections, inputs empty, interactions do not produce feedback, JavaScript errors.

---

## LEADS TESTS

---

### TEST 9: Leads Feed - View Leads with Real Data
**What it tests**: The /feed page loads leads from Supabase for the selected product
**Preconditions**: User IS logged in. User should have at least one product and some leads in the database.

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/feed

Wait for the page to fully load (up to 15 seconds, as it fetches from Supabase).

SECTION 1 - PRODUCT SWITCHER (Header):
- Look at the top left. There should be a product name displayed as a large heading (e.g., the first product name)
- Next to it, a dropdown chevron icon
- If the product has status "active", there should be a green "Live" badge with a pulsing dot
- Click the product name/chevron to open a dropdown menu labeled "Switch Product"
- Record how many products appear in the dropdown
- Close the dropdown by clicking outside it

SECTION 2 - PIPELINE BAR:
A horizontal bar with 4 clickable segments:
- "Total Leads" with a count
- "New" with a count (and a lightning icon)
- "Potential" with a count
- "Top Matches" with a count

Click on "Top Matches" - the segment should become highlighted (with an orange bottom border). The leads below should filter to only show leads with intent_score >= 8.

Click on "Total Leads" to reset the filter.

SECTION 3 - CONTROL STRIP:
- A search input with placeholder "Search within filtered leads..."
- A status filter button showing "Show All" with a filter icon
- A time filter button showing "All Time" with a clock icon

SECTION 4 - LEADS LIST:
If leads exist, each LeadCard should show:
- Intent score badge (green for 8+, amber for 5-7, gray for below 5) with text like "9.2 STRONG SIGNAL"
- Buying stage tag (purple/pink)
- Urgency/sentiment tag (orange)
- "Good Lead" and "Bad Lead" feedback buttons (thumbs up / thumbs down)
- Post title in bold
- Author as "u/username" in orange text
- Subreddit badge
- Time ago
- "Open Thread" link
- An intelligence box with orange left border showing: match intelligence summary, core pain, urgency, competitors
- A quoted section of the post content
- Status dropdown at bottom left (showing "New", "Contacted", "Won", or "Rejected")
- "Draft Reply" button at bottom right (orange)

If NO leads exist, you should see a centered message: either "Please select a product to view leads." or "No signals found matching criteria." in a dashed-border container.

Report:
- Whether the product switcher is functional
- The pipeline bar values (total, new, potential, top matches)
- How many lead cards are displayed
- For the first lead card, record: intent score, post title, subreddit, status
- Whether data appears to be real (from Supabase) or if the page shows empty state
- Take a screenshot
```

**Expected Result**: Product switcher works. Pipeline bar shows counts. Lead cards render with all fields populated from Supabase data (or empty state if no leads).
**Failure Indicators**: Page stuck on loading skeleton, product switcher empty, pipeline bar all zeros with no empty state message.

---

### TEST 10: Leads - Filter and Sort Functionality
**What it tests**: Status filter and time filter dropdowns work to narrow down leads
**Preconditions**: User IS logged in, has leads in the database.

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/feed

Wait for leads to load. Record the initial count from the "Total Leads" segment in the pipeline bar.

TEST 1: STATUS FILTER
1. Click the status filter button (shows "Show All" with a filter icon, right side of control strip)
2. A dropdown should appear with options: "Show All", "New", "Contacted", "Won", "Rejected"
3. Click "New"
4. The button text should change to "New"
5. Observe: the lead cards should now only show leads with status "New"
6. Check: does the "New" count in the pipeline bar match the number of visible lead cards?
7. Click the filter again and select "Rejected"
8. Observe: leads should now show only "Rejected" status leads (or empty state if none exist)
9. Reset by clicking filter and selecting "Show All"

TEST 2: TIME FILTER
1. Click the time filter button (shows "All Time" with a clock icon)
2. A dropdown should appear with options: "Last 24h", "Last Week", "Last Month", "All Time"
3. Click "Last 24h"
4. The button text should change to "Last 24h"
5. Observe: only leads created in the last 24 hours should show (or empty state if none)
6. Click "Last Week"
7. More leads may appear
8. Reset by clicking "All Time"

TEST 3: SEARCH
1. Click into the search input ("Search within filtered leads...")
2. Type a word that appears in one of the lead titles (look at a visible lead title and pick a distinctive word)
3. Observe: leads should filter in real-time to only show matching leads
4. Clear the search input
5. All leads should reappear

TEST 4: PIPELINE BAR FILTER
1. Click the "Top Matches" segment in the pipeline bar
2. Observe: only leads with score >= 8 (shown in green badges) should remain visible
3. Click "Total Leads" to reset

Report for each test:
- Whether the filter/sort UI appeared correctly
- How many leads showed before and after each filter
- Whether the empty state message appeared when no leads matched
- Take a screenshot after applying each filter
```

**Expected Result**: All filters reduce the visible leads appropriately. Pipeline bar segments filter by score. Status/time filters use dropdown menus. Search works client-side.
**Failure Indicators**: Filters don't change visible leads, dropdown menus don't appear, search has no effect.

---

### TEST 11: Leads - Lead Card Interaction (Draft Reply)
**What it tests**: Clicking "Draft Reply" on a lead card generates and displays an AI-drafted reply
**Preconditions**: User IS logged in, at least one lead is visible on /feed.

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/feed

Wait for leads to load. Find the first lead card visible.

STEP 1: EXAMINE THE LEAD CARD
Record the following from the first lead card:
- Intent score and signal level (e.g., "9.2 STRONG SIGNAL")
- Post title
- Author username
- Subreddit
- The intelligence box content (relevance summary, core pain, urgency, competitors)
- Current status shown in the bottom-left dropdown

STEP 2: DRAFT REPLY
Look at the bottom-right of the lead card. There should be an orange button labeled "Draft Reply" with a lightning/zap icon.

Click "Draft Reply".

Observe:
1. The button should immediately change to show "Drafting..." with a spinning loader icon, and the button becomes disabled/grayed out
2. After about 0.8 seconds, the button area should change to show two new buttons: "Cancel" and a dark "Copy" button
3. Below the footer, a new section should appear with:
   - A label "AI Suggestion" with a sparkles icon
   - A "Reply on Reddit" link on the right
   - The AI-generated draft text in monospace font
   - The draft should reference the author's username, subreddit, post title, and the product name

STEP 3: COPY THE DRAFT
Click the "Copy" button (dark button with copy icon).
The button text should change to "Copied" with a checkmark icon for about 2 seconds.

STEP 4: CANCEL
Click "Cancel" to close the draft area.
The "Draft Reply" button should reappear.

Report:
- Whether the drafting animation played
- The full text of the generated AI draft
- Whether the Copy button worked (showed "Copied" feedback)
- Whether Cancel restored the original button
- Take screenshots at each step
```

**Expected Result**: Draft Reply button triggers animation, shows AI-generated reply referencing the lead details, Copy works with feedback, Cancel closes the draft.
**Failure Indicators**: Button does nothing, no draft appears, draft text is empty or malformed, Copy fails.

---

### TEST 12: Leads - Accept/Reject a Lead (Feedback & Status)
**What it tests**: Good Lead / Bad Lead buttons and status dropdown work and persist via Supabase
**Preconditions**: User IS logged in, leads visible on /feed.

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/feed

Wait for leads to load. Find the first lead card.

TEST 1: GOOD LEAD FEEDBACK
1. On the first lead card, look at the top-right area for two small buttons: "Good Lead" (thumbs up) and "Bad Lead" (thumbs down)
2. Click "Good Lead"
3. Observe: A success toast should appear saying "Marked as Good Lead" with description "The engine will prioritize similar patterns."
4. The lead card should remain visible (not dismissed)

TEST 2: STATUS CHANGE
1. On the same lead card, look at the bottom-left for a status dropdown button. It should show the current status (e.g., "New" with a blue dot)
2. Click the status button
3. A dropdown menu should appear ABOVE the button with 4 options:
   - "New" (blue dot)
   - "Contacted" (amber dot)
   - "Won" (green dot)
   - "Rejected" (gray dot)
4. Click "Contacted"
5. The button should update to show "Contacted" with an amber dot
6. A Supabase mutation should fire (no visible feedback unless error)

TEST 3: BAD LEAD (DISMISS)
1. Find a DIFFERENT lead card (second lead in the list)
2. Click "Bad Lead" (thumbs down icon)
3. Observe:
   - A toast should appear saying "Marked as Bad Lead" with description "Pattern pruned from future searches."
   - The lead card should DISAPPEAR from the feed (it gets dismissed from view)
   - The lead's status is also set to "Rejected" in the database

4. Refresh the page and check if the rejected lead's status persisted (it should show as "Rejected" if you filter for it, or not appear in the default "Show All" view depending on implementation)

Report:
- Whether "Good Lead" toast appeared
- Whether status dropdown opened and changed correctly
- Whether "Bad Lead" dismissed the card from view
- Whether the change persisted after refresh
- Take screenshots before and after each action
```

**Expected Result**: Good Lead shows success toast. Status dropdown changes the status visually and in DB. Bad Lead dismisses card and shows info toast.
**Failure Indicators**: No toasts, status doesn't change, bad lead doesn't dismiss, changes don't persist.

---

## PROFILE TESTS

---

### TEST 13: Profile Page - View and Edit
**What it tests**: Profile page loads user data from Supabase and allows saving changes
**Preconditions**: User IS logged in.

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/profile

Wait for the page to fully load. Verify:

SECTION 1 - HEADER:
- Heading "Profile" at the top

SECTION 2 - PROFILE CARD:
The main card should have an orange top border (border-t-[#C2410C]) and contain:

a. AVATAR AREA (top of card):
   - A circular avatar (either a user icon placeholder or an actual profile photo)
   - Hovering over the avatar should show a dark overlay with a camera icon and "CHANGE" text
   - The user's full name displayed large and bold
   - Subscription tier (e.g., "Free Plan" or "Pro Member")
   - "Active since" date

b. FORM FIELDS:
   - "Full Name" input field with a user icon on the left
   - "Email" input field with a mail icon on the left and a lock icon on the right (this field should be READ-ONLY with a gray background, since email comes from Google OAuth)

c. "Save Changes" button (orange, rounded, at the bottom-right)

SECTION 3 - DELETE ACCOUNT:
- A red-tinted section at the bottom
- Heading "Delete Account"
- Warning text: "Permanently remove your account and all lead data. This action cannot be undone."
- A "Delete Account" button with trash icon (red styling)

TEST INTERACTIONS:
1. Note the current Full Name value
2. Click the Full Name input and change it to "E2E Test User"
3. Click "Save Changes"
4. Observe: The button should briefly show "Saving..." with a spinner, then a success toast "Profile saved successfully!" should appear
5. Refresh the page
6. Check: Does the Full Name field still show "E2E Test User"? (it should, as it saves to Supabase)
7. IMPORTANT: Change the name back to the original value and save again to avoid leaving test data

8. Click the "Delete Account" button
9. Observe: A toast should appear saying "Action restricted in preview environment." (deletion is blocked)

10. Try clicking the email field - it should NOT be editable (readonly, cursor-not-allowed)

Report:
- Whether all profile sections rendered
- The user's current name and email
- Whether save worked and persisted after refresh
- Whether delete account showed the restricted toast
- Whether email field was correctly read-only
- Take screenshots
```

**Expected Result**: Profile loads with real user data. Name save persists. Delete account is restricted. Email is read-only.
**Failure Indicators**: Profile data empty, save fails, delete account actually deletes, email is editable.

---

## SETTINGS TESTS

---

### TEST 14: Settings (Plans & Billing) Page
**What it tests**: Settings page shows plan info, upgrade CTA, and billing history
**Preconditions**: User IS logged in.

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/settings

Wait for the page to fully load. Verify:

SECTION 1 - HEADER:
- Heading "Plans & Billing"
- Subheading "Manage your subscription and billing history."

SECTION 2 - CURRENT SUBSCRIPTION CARD:
- Has an orange top border
- Header shows "Current Subscription" with a credit card icon
- A badge showing "STARTER" (the current plan)
- "Product Capacity" section showing:
  - One "Active" slot with a Package icon and dark border
  - Two "Locked" slots with Lock icons and gray styling
  - Hovering over locked slots should show tooltip "Upgrade to unlock"
- An upgrade card on the right (dark background) with:
  - "Unlock Multi-Product" heading with a lightning icon
  - Description about managing up to 3 products
  - "Upgrade - $49/mo" button (orange)

SECTION 3 - BILLING HISTORY:
- Header "Billing History" with a clock/history icon
- Since the plan is STARTER (free), the billing table should be EMPTY
- Instead of a table, there should be a centered message: "No invoices yet." with a FileText icon

Note: If the plan were PRO, you would see a table with columns: Date, Invoice, Amount, Action (download button).

TEST INTERACTION:
1. Click the "Upgrade - $49/mo" button
2. Observe what happens - it may navigate to a Stripe checkout page or show a toast

Report:
- Whether all sections rendered correctly
- The plan shown (should be STARTER)
- Product capacity display (1 active, 2 locked)
- Billing history state (empty with "No invoices yet" message)
- What happened when clicking the upgrade button
- Take a screenshot
```

**Expected Result**: Plan shows as STARTER. 1 active + 2 locked slots. Empty billing history. Upgrade button is visible.
**Failure Indicators**: Plan badge missing, slots not displaying correctly, billing history shows fake data on STARTER.

---

## NAVIGATION TESTS

---

### TEST 15: Sidebar Navigation - All Links Work
**What it tests**: Every sidebar navigation link routes to the correct page
**Preconditions**: User IS logged in.

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/dashboard

Wait for page to load. Look at the left sidebar (dark background, fixed position).

The sidebar should contain:

TOP:
- Threaddits logo (clickable, links to /dashboard)

NAVIGATION LINKS (4 items):
1. "Dashboard" with LayoutDashboard icon -> should go to /dashboard
2. "Leads" with MessageSquare icon -> should go to /feed
   - May have an orange badge with a number (new leads count)
3. "Products" with Layers icon -> should go to /products
4. "Billing" with CreditCard icon -> should go to /settings

BOTTOM:
- User profile area (clickable, links to /profile)
- Logout button (log out icon)

TEST EACH LINK:

1. Click "Dashboard" in the sidebar
   - URL should be /dashboard
   - Page should show "Dashboard" heading
   - The "Dashboard" link in sidebar should be highlighted (white text, white/10 background, orange bar on left)

2. Click "Leads" in the sidebar
   - URL should be /feed
   - Page should show the product name as heading with leads feed below
   - The "Leads" link should now be highlighted

3. Click "Products" in the sidebar
   - URL should be /products
   - Page should show "My Products" heading
   - The "Products" link should be highlighted

4. Click "Billing" in the sidebar
   - URL should be /settings
   - Page should show "Plans & Billing" heading
   - The "Billing" link should be highlighted

5. Click the user profile area at the bottom of the sidebar
   - URL should be /profile
   - Page should show "Profile" heading

6. Click the Threaddits logo at the top of the sidebar
   - URL should be /dashboard
   - Should navigate back to dashboard

For each link, verify:
- The correct page loaded
- The active link is visually highlighted in the sidebar
- No 404 or error pages

Report a table showing: Link Name -> Expected URL -> Actual URL -> Page Loaded -> Active State Correct
Take screenshots showing the active state for at least 2 different links.
```

**Expected Result**: All 4 nav links + profile link + logo work. Active states correctly highlight current page.
**Failure Indicators**: Links go to wrong pages, active state doesn't update, 404 pages, navigation errors.

---

## EMPTY STATE TESTS

---

### TEST 16: Empty States - What Happens With No Data
**What it tests**: How the app handles missing or empty data gracefully
**Preconditions**: User IS logged in. Ideally, test with an account that has no products/leads, or observe how the UI handles zero-state.

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/feed

This test checks empty states across the app.

TEST 1: LEADS PAGE WITH NO PRODUCT SELECTED
If no products exist for this user, the leads page should show:
- Product switcher showing "Loading..." or "Select Product"
- Pipeline bar with all zeros (0, 0, 0, 0)
- An empty state message: "Please select a product to view leads." in a dashed-border container

If products exist but have no leads:
- Product name shows in switcher
- Pipeline bar shows all zeros
- Empty state: "No signals found matching criteria."

Record what you see.

TEST 2: DASHBOARD MOCK DATA
Navigate to https://threaddits.lovable.app/dashboard
Note: The dashboard uses hardcoded mock data, so it should always show content (leads, products, stats). This is a known issue - dashboard does NOT pull from Supabase.
Record whether the dashboard shows data even when the real database is empty.

TEST 3: PRODUCTS PAGE EMPTY
Navigate to https://threaddits.lovable.app/products
Note: Products page also uses local mock data (MOCK_PRODUCTS array). It should always show at least the "Intercom Alternative" mock product.
Record what you see.

TEST 4: BILLING EMPTY STATE
Navigate to https://threaddits.lovable.app/settings
The billing history section should show "No invoices yet." with a document icon when on STARTER plan.
Record what you see.

TEST 5: 404 PAGE
Navigate to https://threaddits.lovable.app/nonexistent-page
Should show:
- "404" in large text
- "Oops! Page not found"
- A "Return to Home" button

Click "Return to Home" - should go to https://threaddits.lovable.app/

Report:
- Empty state message for each scenario
- Whether the app degrades gracefully (no crashes, clear messaging)
- Whether the 404 page works correctly
- Take screenshots of each empty state
```

**Expected Result**: Each page handles empty/missing data with clear messaging. 404 page works. No crashes.
**Failure Indicators**: Blank pages, crashes, uncaught errors, infinite loading, missing empty state messages.

---

## RESPONSIVE TEST

---

### TEST 17: Mobile Viewport Test
**What it tests**: App renders correctly on mobile viewport (375px width)
**Preconditions**: User IS logged in.

**Prompt for Chrome Extension:**
```
Set the browser viewport to mobile size: width 375px, height 812px (iPhone X dimensions).

Navigate to https://threaddits.lovable.app/dashboard

TEST 1: MOBILE SIDEBAR
- The sidebar should be HIDDEN (not visible on mobile)
- Instead, there should be a hamburger menu icon (three horizontal lines) in the top-left of the header bar
- Click the hamburger menu
- The sidebar should slide in from the left as an overlay with a dark semi-transparent backdrop
- All navigation links should be visible
- There should be an X close button in the top-right of the sidebar
- Click the X or click the dark backdrop to close the sidebar

TEST 2: DASHBOARD MOBILE LAYOUT
- Stats grid: should stack into 1 column on mobile (each card full-width)
- Top leads section: should display with each lead taking full width
- Active Products and System Evolution sections: should stack vertically (not side-by-side)
- All text should be readable without horizontal scrolling

TEST 3: LEADS PAGE MOBILE
Navigate to /feed (using the sidebar or direct URL)
- Product switcher heading should be smaller on mobile
- Pipeline bar: segments should all fit within the screen width
- Control strip: search input and filter buttons may stack or wrap
- Lead cards: should be full-width, content should not overflow
- The "Good Lead" / "Bad Lead" buttons and status dropdown should be accessible

TEST 4: PRODUCTS PAGE MOBILE
Navigate to /products
- Product cards should stack in a single column
- Empty slots should be full-width
- All text and buttons should be tappable

TEST 5: PROFILE PAGE MOBILE
Navigate to /profile
- Avatar and name section should stack vertically on mobile (flex-col)
- Form fields should be full-width (single column)
- Save button should be accessible

For each page, check:
- No horizontal overflow (no horizontal scrollbar)
- All text is readable (not cut off)
- All buttons and links are tappable (not too small)
- The mobile sidebar works correctly

Report:
- Whether the mobile sidebar opens and closes properly
- Layout issues on each page (overflow, overlap, cut-off text)
- Any elements that are too small to tap
- Take screenshots of each page in mobile viewport
```

**Expected Result**: Mobile sidebar works. All pages stack content vertically. No horizontal overflow. All interactive elements are accessible.
**Failure Indicators**: Sidebar doesn't open/close on mobile, horizontal scrolling, overlapping elements, unreadable text, buttons too small.

---

## CROSS-CUTTING TESTS

---

### TEST 18: Homepage Landing Page (Public, No Auth)
**What it tests**: The public homepage renders all sections correctly
**Preconditions**: None (works for both logged-in and logged-out users).

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/

Wait for the page to fully load. Verify the following sections from top to bottom:

1. NAVBAR:
   - Threaddits logo on the left
   - If logged in: "Go to Dashboard" button (orange) on the right
   - If not logged in: "Log in" button on the right

2. HERO SECTION:
   - Large heading: "Stop Searching." on one line
   - Second line: "Start" followed by a rotating word that cycles through "Selling.", "Scaling.", "Sustaining." with a typing animation and blinking orange cursor
   - Subtitle about "autonomous lead engine for Reddit"
   - A URL input field (MagicInput component) with a button to analyze/start hunting
   - Small text: "Takes ~5 seconds . No credit card required"

3. PRODUCT SHOWCASE:
   - A visual demonstration section showing the product interface

4. SIGNAL VS NOISE:
   - Section explaining how Threaddits filters signal from noise

5. ADAPTIVE ENGINE:
   - Section explaining the adaptive/learning engine

6. PRICING:
   - Pricing section with plan cards

7. FAQ:
   - "Frequently Asked Questions" heading
   - 5 FAQ items in an accordion:
     a. "Will using Threaddits get me banned?"
     b. "Does the system auto-post for me?"
     c. "How do you know they are ready to buy?"
     d. "How many leads will I get daily?"
     e. "Does this work for B2B SaaS?"
   - Click each FAQ question to expand it and verify the answer appears
   - Click again to collapse

8. CTA SECTION:
   - A call-to-action section near the bottom

9. FOOTER:
   - Footer section with links

Test the FAQ accordion: click each of the 5 questions. Each should expand to show an answer and collapse when clicked again. Only one should be open at a time (or multiple can be open -- record behavior).

Test the hero input: type "https://test.com" into the MagicInput and press Enter or click the analyze button. The page should switch to the OnboardingFlow analysis view.

Report:
- Which sections are present and which are missing
- Whether the typing animation works in the hero
- Whether FAQ accordion works
- Whether the hero input triggers the onboarding flow
- Take a full-page screenshot (or multiple screenshots scrolling down)
```

**Expected Result**: All 9 sections render. Typing animation cycles words. FAQ accordion expands/collapses. Hero input triggers onboarding.
**Failure Indicators**: Missing sections, static text (no animation), FAQ doesn't toggle, input does nothing.

---

### TEST 19: Toast Notifications System
**What it tests**: Toast/notification system works across the app
**Preconditions**: User IS logged in.

**Prompt for Chrome Extension:**
```
This test verifies that toast notifications appear and disappear correctly across the app.

Navigate to https://threaddits.lovable.app/products/1

TEST 1: SUCCESS TOAST
1. Click the "Save" button in the Product DNA section
2. A toast should appear at the top-right (or bottom-right depending on Sonner config) of the screen
3. It should say "Configuration Saved" with description "Agents are re-calibrating..."
4. The toast should auto-dismiss after a few seconds
5. Record: toast position, content, and auto-dismiss timing

TEST 2: STATUS TOGGLE TOAST
1. Click the status toggle button (Live Hunting / Paused)
2. A toast should appear saying either "Hunting Resumed" or "Hunting Paused"
3. Click it again to toggle back

TEST 3: ADD SUBREDDIT TOAST
1. Type "r/test" in the subreddit input field
2. Click the "Add" button
3. Toast should say "Monitoring r/test"

TEST 4: ADD KEYWORD TOAST
1. Type "test keyword" in the keyword input
2. Click "Add"
3. Toast should say 'Tracking "test keyword"'

Navigate to https://threaddits.lovable.app/products

TEST 5: ERROR TOAST (PLAN LIMIT)
1. Click the first "Add New Product" empty slot
2. An error toast should appear: "Plan limit reached" with description about upgrading to Pro

Navigate to https://threaddits.lovable.app/profile

TEST 6: PROFILE SAVE TOAST
1. Change the full name slightly
2. Click "Save Changes"
3. Success toast: "Profile saved successfully!"
4. Change the name back and save again

TEST 7: DELETE ACCOUNT TOAST
1. Click "Delete Account" button
2. Error toast: "Action restricted in preview environment."

Report:
- For each toast: did it appear? What was the text? What type (success/error/info)? Did it auto-dismiss?
- Were toasts visually distinguishable by type (success = green, error = red, info = blue)?
- Take a screenshot of at least 2 different toast types
```

**Expected Result**: All 7 toast scenarios trigger correctly with appropriate messaging and styling.
**Failure Indicators**: Toasts don't appear, wrong message text, toasts don't auto-dismiss, toasts overlap.

---

### TEST 20: Navigation Between Dashboard and Leads (Cross-Page Flow)
**What it tests**: End-to-end flow from dashboard to leads and back
**Preconditions**: User IS logged in.

**Prompt for Chrome Extension:**
```
Navigate to https://threaddits.lovable.app/dashboard

This test verifies cross-page navigation and data consistency.

STEP 1: DASHBOARD -> LEADS (via Top Leads)
1. On the dashboard, find the "Top 5 High-Intent Leads" section
2. Click the "View All" button (orange text, says "View All" with an arrow icon)
3. You should be navigated to /feed (the leads page)
4. Verify the URL is now /feed
5. Verify the leads page loaded correctly

STEP 2: DASHBOARD -> LEADS (via Lead Click)
1. Navigate back to /dashboard
2. Click on any lead item in the "Top 5 High-Intent Leads" list
3. You should be navigated to /feed
4. Verify the leads page loaded

STEP 3: DASHBOARD -> PRODUCTS (via Active Products)
1. Navigate back to /dashboard
2. Find the "Active Products" section
3. Click the "Manage" button
4. You should be navigated to /products
5. Verify the products page loaded with "My Products" heading

STEP 4: DASHBOARD -> ADD PRODUCT
1. Navigate back to /dashboard
2. In the Active Products section, click the "+ Add Product" button (dashed border at the bottom)
3. You should be navigated to /products
4. Verify the products page loaded

STEP 5: SIDEBAR ACTIVE STATE CONSISTENCY
1. While on /products, check the sidebar - "Products" should be highlighted
2. Click "Leads" in the sidebar - navigate to /feed, "Leads" should be highlighted
3. Click "Dashboard" - navigate to /dashboard, "Dashboard" should be highlighted
4. Click "Billing" - navigate to /settings, "Billing" should be highlighted

Report:
- Whether each navigation worked correctly (URL changed, correct page loaded)
- Whether the sidebar active state updated correctly for each page
- Any broken links or unexpected redirects
- Take screenshots showing the sidebar active state on at least 2 different pages
```

**Expected Result**: All cross-page navigations work. "View All", "Manage", "Add Product" buttons navigate correctly. Sidebar active state always matches current page.
**Failure Indicators**: Broken links, wrong page loads, sidebar active state doesn't update.

---

## SUMMARY

| # | Test Name | Category | Key Elements Tested |
|---|-----------|----------|---------------------|
| 1 | Login Flow | Auth | Google OAuth button, redirect |
| 2 | Session Persistence | Auth | Refresh preserves session |
| 3 | Logout | Auth | Sign out + redirect |
| 4 | Protected Routes | Auth | 5 protected + 2 public routes |
| 5 | Dashboard Load | Dashboard | Stats, leads, products, evolution |
| 6 | Products List | Products | Cards, slots, plan limits |
| 7 | Add Product | Products | Modal + onboarding flow |
| 8 | Edit Product | Products | DNA, subreddits, keywords |
| 9 | Leads Feed | Leads | Real Supabase data, product switcher |
| 10 | Filter/Sort | Leads | Status, time, search, pipeline filters |
| 11 | Draft Reply | Leads | AI draft generation, copy |
| 12 | Accept/Reject | Leads | Good/bad feedback, status change |
| 13 | Profile | Profile | View, edit, save, avatar, delete |
| 14 | Settings | Settings | Plan, slots, billing, upgrade |
| 15 | Sidebar Nav | Navigation | All 4 links + profile + logo |
| 16 | Empty States | Edge Cases | No data, 404, graceful degradation |
| 17 | Mobile | Responsive | 375px viewport, sidebar, layouts |
| 18 | Homepage | Public | Hero, FAQ, pricing, onboarding |
| 19 | Toasts | Cross-cutting | 7 toast scenarios |
| 20 | Cross-Page Flow | Integration | Dashboard links, sidebar consistency |

### KNOWN ISSUES TO WATCH FOR
1. **Dashboard uses MOCK data** (hardcoded), not real Supabase data - stats, leads, products, and evolution events are all hardcoded in the Dashboard component.
2. **Products page uses MOCK data** (MOCK_PRODUCTS array), not from Supabase `useProducts` hook.
3. **Edit Product page uses MOCK data** (MOCK_PRODUCT object), not from Supabase.
4. **Leads page is REAL** - fetches from Supabase via `useLeads`, `useProducts`, and `useLeadMetrics` hooks.
5. **Profile page is REAL** - reads/writes to Supabase `users` table.
6. **Auth is REAL** - uses Supabase Google OAuth.
7. **STARTER plan** hard-limits to 1 product slot on the Products page.
