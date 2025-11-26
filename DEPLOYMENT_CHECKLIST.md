# 🚀 Complete Deployment Checklist

## Frontend - Vercel ✅

- [x] Code pushed to GitHub
- [x] Vercel project created and connected
- [x] Auto-deploys on push to main
- [ ] Environment variable `VITE_API_URL` set (DO THIS AFTER BACKEND)

**Frontend URL**: https://lowpricetracker.vercel.app

---

## Backend - Render ⏳ (TODO)

### Step 1: Deploy to Render

- [ ] Go to https://render.com
- [ ] Sign in with GitHub
- [ ] Click **New +** → **Web Service**
- [ ] Select repo: `DEVENDRAN-P/sample`
- [ ] Branch: `main`

### Step 2: Configure Build

- [ ] Name: `low-price-tracker-api`
- [ ] Environment: `Node`
- [ ] Region: Pick closest to you
- [ ] Build Command: `cd server && npm install`
- [ ] Start Command: `cd server && node index.js`

### Step 3: Environment Variables

- [ ] Add: `FRONTEND_URL` = `https://lowpricetracker.vercel.app`
- [ ] Add: `NODE_ENV` = `production`

### Step 4: Deploy

- [ ] Click **Create Web Service**
- [ ] Wait for deployment (5-10 minutes)
- [ ] Copy backend URL when ready

---

## Connect Frontend to Backend

- [ ] Copy backend URL from Render
- [ ] Go to Vercel Dashboard
- [ ] Select your project
- [ ] Go to **Settings** → **Environment Variables**
- [ ] Add/Update: `VITE_API_URL` = (your backend URL)
- [ ] Save - Vercel will auto-redeploy

---

## Test Everything ✅

### On Frontend (https://lowpricetracker.vercel.app):

- [ ] Load page - no errors
- [ ] Go to Register
- [ ] Create new account
- [ ] Should successfully register
- [ ] Go to Login
- [ ] Login with credentials
- [ ] Should successfully login
- [ ] Navigate to Profile - shows user data
- [ ] Navigate to Search History
- [ ] Navigate to Rewards
- [ ] Navigate to Settings
- [ ] Make a search
- [ ] Upload a bill
- [ ] Check Bills page

### Check Backend Logs (Render Dashboard):

- [ ] No errors in logs
- [ ] API health check works
- [ ] Database initialized

---

## Troubleshooting

### "Failed to fetch" error on frontend

- [ ] Check `VITE_API_URL` is set in Vercel
- [ ] Verify backend is deployed on Render
- [ ] Test API: `https://your-backend.onrender.com/api/health`
- [ ] Check browser console for exact error

### Login/Register not working

- [ ] Check network tab (F12) for failed requests
- [ ] Verify backend URL is correct
- [ ] Check Render logs for server errors
- [ ] Ensure database is initialized

### Database errors

- [ ] Render creates SQLite automatically on first run
- [ ] Check `/server/users.db` exists
- [ ] Check Render logs for initialization messages

---

## Production URLs

| Service  | URL                                              |
| -------- | ------------------------------------------------ |
| Frontend | https://lowpricetracker.vercel.app               |
| Backend  | https://low-price-tracker-api-xxxxx.onrender.com |
| GitHub   | https://github.com/DEVENDRAN-P/sample            |

---

## After All is Working

- [x] Frontend deployed and auto-updates
- [x] Backend deployed and running
- [x] Users can register, login, use all features
- [x] Data persists in backend database
- [x] Ready for production use!

🎉 **Congratulations! Your app is live!**
