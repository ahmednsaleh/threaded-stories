# Threaddits — Vercel Deployment Guide

## Step 1: Import Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Under **"Import Git Repository"**, find `ahmednsaleh/threaded-stories`
4. Click **"Import"**

## Step 2: Configure Build Settings

| Setting | Value |
|---------|-------|
| Framework Preset | **Vite** |
| Root Directory | `.` (root) |
| Build Command | `yarn build` |
| Output Directory | `dist` |

## Step 3: Set Environment Variables

Add these two variables before clicking Deploy:

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | `https://fmwtgtmdtgnctrrckaab.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | *(get from Supabase dashboard → Settings → API → Project API keys → `anon` / `public`)* |

## Step 4: Deploy

Click **"Deploy"**. Build takes about 30 seconds.

## Step 5: Custom Domain (optional)

1. In your Vercel project, go to **Settings → Domains**
2. Add your domain (e.g. `threaddits.com` or `app.threaddits.com`)
3. Follow Vercel's DNS instructions (add CNAME or A record at your registrar)

## Step 6: Update Stripe URLs

After deployment, update these Supabase edge function secrets to point to your production URL:

```bash
# Replace YOUR_DOMAIN with your actual domain (e.g. https://threaddits.com)
supabase secrets set STRIPE_SUCCESS_URL=https://YOUR_DOMAIN/products
supabase secrets set STRIPE_CANCEL_URL=https://YOUR_DOMAIN/settings
```

Run from the project directory:
```bash
cd /Users/ahmedsaleh/bz-workspace/products/threaddits-lovable
supabase secrets set STRIPE_SUCCESS_URL=https://YOUR_DOMAIN/products STRIPE_CANCEL_URL=https://YOUR_DOMAIN/settings
```

## Step 7: Update Supabase Auth Redirect

1. Go to Supabase dashboard → **Authentication → URL Configuration**
2. Add your Vercel URL to **Redirect URLs**: `https://YOUR_DOMAIN/**`
3. Optionally update **Site URL** to your production domain

## Troubleshooting

- **Blank page after deploy**: Check that both `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are set correctly in Vercel environment variables. Redeploy after changing env vars.
- **Auth not working**: Ensure your production domain is in Supabase's Redirect URLs list.
- **Stripe checkout fails**: Verify `STRIPE_SUCCESS_URL` and `STRIPE_CANCEL_URL` secrets are updated to the production domain.
