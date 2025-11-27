# Vercel Deployment Guide

## Prerequisites

- ✅ Project already connected to Vercel
- ✅ Supabase project created and configured
- ✅ Database schema executed in Supabase

## Step-by-Step Deployment

### Step 1: Add Environment Variables in Vercel

1. Go to your Vercel dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your **novi-put-app** project
3. Go to **Settings** → **Environment Variables**
4. Add the following environment variables:

   **Variable 1:**
   - **Name:** `VITE_SUPABASE_URL`
   - **Value:** Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)
   - **Environment:** Select all (Production, Preview, Development)

   **Variable 2:**
   - **Name:** `VITE_SUPABASE_ANON_KEY`
   - **Value:** Your Supabase anon/public key
   - **Environment:** Select all (Production, Preview, Development)

5. Click **Save** for each variable

### Step 2: Redeploy Your Application

After adding environment variables, you need to trigger a new deployment:

**Option A: Via Vercel Dashboard**
1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on your latest deployment
3. Click **Redeploy**
4. Confirm the redeploy

**Option B: Via Git Push**
1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add Supabase authentication and database integration"
   git push
   ```
2. Vercel will automatically detect the push and deploy

**Option C: Via Vercel CLI**
```bash
vercel --prod
```

### Step 3: Verify Deployment

1. Wait for deployment to complete (usually 1-2 minutes)
2. Visit your Vercel deployment URL
3. Test the authentication:
   - Try creating a new account
   - Try logging in
   - Verify data is being saved

### Step 4: Update Supabase Allowed URLs (Important!)

Supabase requires you to whitelist your Vercel domain:

1. Go to Supabase Dashboard → **Authentication** → **URL Configuration**
2. Under **Site URL**, add your Vercel production URL:
   ```
   https://your-app.vercel.app
   ```
3. Under **Redirect URLs**, add:
   ```
   https://your-app.vercel.app/**
   ```
4. Click **Save**

**Note:** If you have custom domains, add those too!

## Troubleshooting

### Issue: "Invalid API key" error in production

**Solution:**
- Double-check environment variables in Vercel dashboard
- Make sure variable names are exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Redeploy after adding variables

### Issue: Authentication redirects not working

**Solution:**
- Add your Vercel URL to Supabase Redirect URLs (Step 4 above)
- Check that Site URL in Supabase matches your Vercel domain

### Issue: Build fails on Vercel

**Solution:**
- Check build logs in Vercel dashboard
- Ensure `package.json` has correct build script: `"build": "tsc && vite build"`
- Verify all dependencies are in `package.json` (not just devDependencies)

### Issue: Environment variables not working

**Solution:**
- Variables must start with `VITE_` to be exposed to client-side code
- After adding variables, you MUST redeploy (they're not hot-reloaded)
- Check Vercel build logs to verify variables are being read

## Environment Variables Checklist

Before deploying, ensure you have:

- [ ] `VITE_SUPABASE_URL` - Your Supabase project URL
- [ ] `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key
- [ ] Both variables added to Production, Preview, and Development environments
- [ ] Supabase Redirect URLs configured with your Vercel domain

## Quick Commands

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# View deployment logs
vercel logs

# List all deployments
vercel ls
```

## Post-Deployment Checklist

- [ ] Test user registration
- [ ] Test user login
- [ ] Test data persistence (create quiz, check if it saves)
- [ ] Test logout functionality
- [ ] Verify data appears in Supabase dashboard
- [ ] Check browser console for any errors
- [ ] Test on mobile device (if applicable)

## Custom Domain Setup

If you have a custom domain:

1. Add domain in Vercel: **Settings** → **Domains**
2. Update Supabase Redirect URLs to include your custom domain
3. Wait for DNS propagation (can take up to 24 hours)

---

**Need Help?** Check Vercel logs or Supabase logs for detailed error messages.

