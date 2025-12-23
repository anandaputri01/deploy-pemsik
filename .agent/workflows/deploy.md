---
description: Deploy to Vercel
---

# Deploy to Vercel

## Step 1: Build and test locally
// turbo
```bash
npm run build
```

## Step 2: Test the production build
// turbo
```bash
npm run preview
```

If everything works, proceed to deployment.

## Step 3: Commit and push to GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

## Step 4: Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Import your repository
5. Vercel will auto-detect Vite settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

## Step 5: Wait for deployment

Deployment takes 1-2 minutes. You'll get a URL like:
`https://your-project.vercel.app`

## Important: Deploy JSON Server Separately

Your JSON Server won't work on Vercel's frontend deployment.

### Option A: Deploy to Render.com (Free)

1. Go to https://render.com
2. Create "Web Service"
3. Connect your GitHub repo
4. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Deploy and get API URL

### Option B: Use a Real Database

Migrate to:
- Supabase (PostgreSQL + Auth)
- MongoDB Atlas
- Firebase

## Step 6: Update API URL

After deploying JSON Server, update your React app:

```javascript
// In your API config
const API_URL = 'https://your-api.onrender.com';
```

Then redeploy to Vercel (automatic on git push).

---

See VERCEL_DEPLOY.md for detailed instructions.
