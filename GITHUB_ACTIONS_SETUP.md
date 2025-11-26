# GitHub Actions Auto-Deploy Setup

This repository uses GitHub Actions to automatically deploy to Vercel (frontend) and Render (backend) when you push to the `main` branch.

## Setup Instructions

### 1. Get Vercel Tokens

1. Go to https://vercel.com/account/tokens
2. Click **Create** → **New Token**
3. Name it: `GITHUB_DEPLOY`
4. Copy the token

Then get your Project IDs:
1. Go to https://vercel.com/dashboard
2. Select your project
3. Copy:
   - **Project ID** from project settings
   - **Org ID** from team settings

### 2. Get Render Deploy Hook

1. Go to https://render.com/dashboard
2. Select your backend Web Service
3. Go to **Settings** → **Deploy Hook**
4. Copy the URL

### 3. Add Secrets to GitHub

1. Go to your GitHub repo: https://github.com/DEVENDRAN-P/sample
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

| Secret Name | Value |
|-------------|-------|
| `VERCEL_TOKEN` | Your Vercel token from step 1 |
| `VERCEL_PROJECT_ID` | Your Vercel Project ID |
| `VERCEL_ORG_ID` | Your Vercel Org ID |
| `RENDER_DEPLOY_HOOK` | Your Render deploy hook URL |

### 4. Test Auto-Deploy

Make a small change and push:
```bash
echo "# Test" >> README.md
git add .
git commit -m "Test auto-deploy"
git push origin main
```

Go to **Actions** tab in GitHub to watch the deployment happen automatically!

---

## What Gets Deployed

✅ **Frontend** (Vercel):
- React app
- Automatically rebuilds and deploys
- URL: `https://lowpricetracker.vercel.app`

✅ **Backend** (Render):
- Express API server
- Database (SQLite)
- URL: Set in Vercel env var

---

## Manual Deployment (if needed)

```bash
# Frontend
vercel --prod

# Backend
# Trigger deploy hook manually or use Render dashboard
```

---

## Troubleshooting

**Deployment failed?**
- Check Actions tab → View logs
- Verify all secrets are set correctly
- Ensure both services are connected

**Still getting "Failed to fetch"?**
1. Verify `VITE_API_URL` environment variable in Vercel
2. Check backend is deployed on Render
3. Test API directly: `https://your-backend.onrender.com/api/health`
