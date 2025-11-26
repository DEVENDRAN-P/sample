# Vercel Deployment Guide

## Frontend Setup (Vercel)

### Step 1: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Click **Add New** → **Project**
3. Import your GitHub repository: `https://github.com/DEVENDRAN-P/sample`
4. Click **Import**

### Step 2: Set Environment Variables in Vercel

In Vercel Dashboard:

1. Go to your project → **Settings** → **Environment Variables**
2. Add these variables:

| Key            | Value                          | Notes                                |
| -------------- | ------------------------------ | ------------------------------------ |
| `VITE_API_URL` | `https://your-backend-url.com` | Will be set after backend deployment |

### Step 3: Deploy

1. Vercel will auto-deploy on push to main branch
2. Your frontend URL will be: `https://sample-vercel.app` (example)

---

## Backend Setup (Choose One Option)

### Option A: Deploy to Render (Recommended - Free)

1. Go to https://render.com
2. Click **+ New** → **Web Service**
3. Connect your GitHub repo
4. Select `main` branch
5. Configure:

   - **Name**: `low-price-tracker-server`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && node index.js`
   - **Region**: Choose closest to you

6. Add Environment Variables:

   - Key: `FRONTEND_URL`
   - Value: Your Vercel frontend URL (e.g., `https://your-app.vercel.app`)

7. Deploy and copy your backend URL

### Option B: Deploy to Railway

1. Go to https://railway.app
2. Click **New Project** → **GitHub Repo**
3. Select your repository
4. Add `server/` as root directory
5. Set environment variable:
   - `FRONTEND_URL` = your Vercel URL
6. Deploy

---

## Update Frontend After Backend Deployment

1. Once backend is deployed, go to **Vercel Dashboard**
2. Go to project → **Settings** → **Environment Variables**
3. Update `VITE_API_URL` with your backend URL (from Render/Railway)
4. Vercel will auto-redeploy

### Example URLs:

- Frontend: `https://sample-vercel.app`
- Backend: `https://low-price-tracker-server-abc123.onrender.com`

---

## Testing Production

1. Visit your Vercel frontend URL
2. Try login/signup - should work if backend URL is set correctly
3. Check browser console (F12) for any errors
4. Verify network tab shows successful API calls

---

## Troubleshooting

### "Failed to fetch" Error

- Check `VITE_API_URL` environment variable in Vercel
- Ensure backend server is running and deployed
- Check CORS settings in backend (should allow your Vercel URL)

### Backend Not Responding

- Verify backend deployment succeeded
- Check backend URL in environment variable
- Test API directly: `https://your-backend.app/api/health`

### Database Errors

- Render/Railway create new SQLite database on first run (auto-initialized)
- Check backend logs in deployment dashboard

---

## Commands for Local Development

```bash
# Terminal 1 - Backend
cd server
node index.js

# Terminal 2 - Frontend
npm run dev
```

Visit: `http://localhost:3000`

---

## After Successful Deployment

✅ Frontend: Live on Vercel
✅ Backend: Live on Render/Railway
✅ Database: Auto-initialized on first run
✅ Users can register, login, search, upload bills
✅ All data persists in backend database
