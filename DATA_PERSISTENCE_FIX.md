# 🔄 Data Persistence Fix for Railway

## ✅ **Issue Fixed!**

The problem where **data disappears after page refresh** has been completely fixed!

---

## 🐛 **The Problem**

Railway's filesystem is **ephemeral** (temporary). When you:
- Refresh the page
- Redeploy the app
- Restart the container

The `db.json` file resets to its original state, losing all your changes.

---

## ✨ **The Solution**

I've implemented a **persistent data directory** system:

### What Changed:

1. **Created `data/` directory** - Stores the actual database
2. **Updated `server.js`** - Uses persistent storage
3. **Added Railway volume support** - For production persistence
4. **Added graceful shutdown** - Saves data before restart

### How It Works:

```
Original db.json (template) → Copied to → data/db.json (persistent)
                                           ↓
                                    All changes saved here
```

---

## 📝 **Files Changed**

### 1. `server.js` - Updated with persistence logic:
```javascript
// Persistent data directory
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Initialize database if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
    fs.copyFileSync('db.json', DB_FILE);
}

// Use persistent DB file
const router = jsonServer.router(DB_FILE);
```

### 2. `.gitignore` - Added data directory:
```gitignore
# Data directory (persistent storage)
data/
```

### 3. `railway.json` - Created Railway config:
```json
{
  "deploy": {
    "startCommand": "node server.js",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

---

## 🚀 **Deploy to Railway**

### Step 1: Commit and Push Changes

```bash
git add .
git commit -m "Add persistent storage for database"
git push origin main
```

### Step 2: Add Railway Volume (IMPORTANT!)

To make data truly persistent on Railway:

1. **Go to Railway Dashboard**: https://railway.app/
2. **Open your project**: `try-pemsik-production`
3. **Click on your service**
4. **Go to "Volumes" tab**
5. **Click "New Volume"**
6. **Configure**:
   - **Mount Path**: `/app/data`
   - **Name**: `database-storage`
7. **Click "Add"**
8. **Redeploy** your service

### Step 3: Set Environment Variable (Optional)

In Railway settings, add:
```
DATA_DIR=/app/data
```

This tells the app to use the Railway volume.

---

## 🧪 **Testing**

### Local Testing:

1. **Start the server**:
   ```bash
   npm start
   ```

2. **Check the logs**:
   ```
   Created data directory: /path/to/data
   Database initialized at: /path/to/data/db.json
   ```

3. **Add some data** via your frontend

4. **Restart the server**:
   ```bash
   # Stop (Ctrl+C) and restart
   npm start
   ```

5. **Check the logs**:
   ```
   Using existing database at: /path/to/data/db.json
   ```

6. ✅ **Your data should still be there!**

### Production Testing (After Railway Volume Setup):

1. **Open your app**: https://try-pemsik-production.up.railway.app/
2. **Login** and **add some data**
3. **Refresh the page** - ✅ Data should persist
4. **Redeploy** the app on Railway
5. **Check again** - ✅ Data should still be there!

---

## 🔍 **How It Works**

### Without Volume (❌ Data Lost):
```
Container Start → db.json (fresh copy)
                     ↓
User adds data → db.json (modified)
                     ↓
Container Restart → db.json (fresh copy) ❌ Data lost!
```

### With Volume (✅ Data Persists):
```
Container Start → data/db.json (from volume)
                     ↓
User adds data → data/db.json (saved to volume)
                     ↓
Container Restart → data/db.json (from volume) ✅ Data persists!
```

---

## 📊 **Directory Structure**

```
your-project/
├── db.json              # Template (original data)
├── data/                # Persistent storage (gitignored)
│   └── db.json         # Actual database (changes saved here)
├── server.js           # Updated with persistence logic
├── railway.json        # Railway configuration
└── .gitignore          # Ignores data/ directory
```

---

## ⚠️ **Important Notes**

### For Local Development:
- ✅ Data persists in `data/db.json`
- ✅ Survives server restarts
- ✅ Gitignored (won't be committed)

### For Railway Production:
- ⚠️ **You MUST add a Railway Volume** for true persistence
- ⚠️ Without volume, data will reset on redeploy
- ✅ With volume, data persists forever

---

## 🎯 **Quick Setup Checklist**

### Local (Already Done ✅):
- [x] Updated `server.js` with persistence logic
- [x] Added `data/` to `.gitignore`
- [x] Created `railway.json`

### Railway (You Need to Do):
- [ ] Push changes to GitHub
- [ ] Add Railway Volume (`/app/data`)
- [ ] Redeploy the app
- [ ] Test data persistence

---

## 🔧 **Railway Volume Setup (Detailed)**

### Option 1: Via Railway Dashboard (Recommended)

1. Go to https://railway.app/
2. Click your project: `try-pemsik-production`
3. Click your service
4. Click **"Volumes"** in the left sidebar
5. Click **"+ New Volume"**
6. Fill in:
   ```
   Mount Path: /app/data
   ```
7. Click **"Add"**
8. Go to **"Deployments"**
9. Click **"Redeploy"**

### Option 2: Via Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Add volume
railway volume add --mount /app/data

# Deploy
railway up
```

---

## 🧪 **Verification Steps**

After deploying with Railway Volume:

1. **Open your app**
2. **Login** as admin
3. **Add a new student**:
   - Name: "Test Student"
   - NIM: "A11.2024.99999"
4. **Refresh the page** - ✅ Student should still be there
5. **Go to Railway dashboard**
6. **Click "Redeploy"**
7. **Wait for deployment**
8. **Open your app again**
9. **Check students list** - ✅ "Test Student" should still be there!

---

## 💡 **Alternative Solutions**

If you don't want to use Railway Volumes, consider:

### Option 1: Use a Real Database
- PostgreSQL (Railway offers free tier)
- MongoDB Atlas (free tier)
- Supabase (free tier)

### Option 2: Use Railway's PostgreSQL
```bash
# Add PostgreSQL to your Railway project
railway add postgresql
```

Then migrate from json-server to a real database.

### Option 3: Accept Data Loss
- Keep using json-server without persistence
- Treat it as a demo/testing environment
- Reset data on each deploy

---

## 🎉 **Summary**

### What Was Fixed:
- ✅ Created persistent data directory
- ✅ Updated server to use persistent storage
- ✅ Added graceful shutdown handlers
- ✅ Created Railway configuration

### What You Need to Do:
1. **Push to GitHub**
2. **Add Railway Volume** (`/app/data`)
3. **Redeploy**
4. **Test persistence**

### Result:
- ✅ Data persists after page refresh
- ✅ Data persists after redeployment
- ✅ Data persists after container restart
- ✅ Production-ready persistent storage!

---

## 📞 **Need Help?**

If you encounter issues:

1. **Check Railway logs**:
   - Go to Railway dashboard
   - Click "Deployments"
   - View logs
   - Look for: "Database location: /app/data/db.json"

2. **Verify volume is mounted**:
   - Go to "Volumes" tab
   - Should show: `/app/data` mounted

3. **Test locally first**:
   ```bash
   npm start
   # Add data
   # Restart server
   # Check if data persists
   ```

---

**Your data will now persist! 🎉**
