# Supabase Setup Guide

## Quick Start

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Name**: novi-put-app (or any name you prefer)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you
4. Wait for project to initialize (2-3 minutes)

### 2. Get Your Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### 3. Configure Environment Variables

1. In your project root, create `.env` file:
```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. Replace with your actual values from step 2

### 4. Setup Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Open `supabase/schema.sql` from this project
4. Copy the entire SQL code
5. Paste into SQL Editor
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. You should see "Success. No rows returned"

### 5. Configure Authentication (Optional)

By default, Supabase requires email confirmation. To disable it for development:

1. Go to **Authentication** → **Settings**
2. Under **Email Auth**, toggle off "Enable email confirmations"
3. Click **Save**

**Note:** For production, keep email confirmation enabled for security.

### 6. Test the App

1. Run `npm run dev`
2. Open the app in browser
3. Try creating an account with email/password
4. Login and test the app

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env` file has correct values
- Make sure there are no extra spaces or quotes
- Restart your dev server after changing `.env`

### "relation user_data does not exist"
- Make sure you ran the SQL schema in step 4
- Check SQL Editor → History to verify it ran successfully

### "Row Level Security policy violation"
- This means RLS is working correctly
- Make sure you're logged in
- Check that the SQL schema was run completely

### Email confirmation issues
- Check Supabase dashboard → Authentication → Users
- You can manually confirm users there for testing
- Or disable email confirmation in settings (step 5)

## Database Structure

The `user_data` table stores:
- `user_id` - Links to auth.users
- `streak_start` - When current streak started
- `urge_history` - Array of logged urges
- `quiz_answers` - User's quiz responses
- `plan_progress` - Completed plan items
- `is_onboarded` - Whether user completed onboarding

All data is automatically synced when user is logged in.

