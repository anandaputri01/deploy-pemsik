# Pemrograman Sisi Klien - Deployment Ready

A React + Vite application with JSON Server backend for managing academic data (students, lecturers, courses, and classes).

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start JSON Server (Terminal 1)
npm run serve

# Start Vite Dev Server (Terminal 2)
npm run dev
```

Visit `http://localhost:5173` for the frontend and `http://localhost:3001` for the API.

## 📦 Deployment

### 🚀 3 Easy Deployment Options (No Credit Card Needed!)

#### **Option 1: Vercel All-in-One** ⭐ Recommended
Deploy everything (frontend + API) to Vercel in one go!
- ✅ Easiest (5 minutes)
- ✅ Everything in one place
- ✅ Perfect for demos/learning
- 📖 Guide: **[VERCEL_ALL_IN_ONE.md](./VERCEL_ALL_IN_ONE.md)**

#### **Option 2: Vercel + Glitch**
Frontend on Vercel, JSON Server on Glitch
- ✅ Database persists
- ✅ No credit card needed
- ✅ Good for small projects
- 📖 Guide: **[JSON_SERVER_FREE_DEPLOY.md](./JSON_SERVER_FREE_DEPLOY.md)**

#### **Option 3: Vercel + Real Database**
Professional setup with Supabase/MongoDB
- ✅ Production-ready
- ✅ Scalable
- 📖 Guide: Contact for help!

**Not sure which to choose?** See **[DEPLOYMENT_OPTIONS.md](./DEPLOYMENT_OPTIONS.md)** for comparison!

### Quick Deploy (Option 1):
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
# Then go to vercel.com and deploy!
```

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS 4
- **State Management**: TanStack React Query
- **Routing**: React Router DOM v7
- **UI Components**: SweetAlert2, React Hot Toast
- **Charts**: Recharts
- **Backend**: JSON Server (development)

## 📁 Project Structure

```
├── db/                  # Database JSON files
│   ├── dosen.json
│   ├── mahasiswa.json
│   ├── matakuliah.json
│   ├── kelas.json
│   ├── krs.json
│   └── user.json
├── src/                 # React source code
├── dist/                # Production build
├── db.json              # Merged database file
├── server.js            # Production JSON Server
├── merge-json.cjs       # DB merge utility
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose setup
├── vercel.json          # Vercel deployment config
└── netlify.toml         # Netlify deployment config
```

## 🔧 Available Scripts

- `npm run dev` - Start Vite development server
- `npm run serve` - Start JSON Server (merges db/ files)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🗄️ Database

Currently using **JSON Server** for development. For production deployment:

⚠️ **Important**: JSON Server is NOT recommended for production!

Consider migrating to:
- MongoDB Atlas
- Supabase
- Firebase
- PostgreSQL (Railway/Render)

## 🌐 Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:3001
```

For production, update to your deployed API URL.

## 📝 Features

- ✅ Student Management (CRUD)
- ✅ Lecturer Management (CRUD)
- ✅ Course Management (CRUD)
- ✅ Class Management (CRUD)
- ✅ Course Registration System (KRS)
- ✅ User Authentication
- ✅ Role-based Permissions
- ✅ Dashboard with Analytics
- ✅ Responsive Design

## 🔐 Default Users

### Admin
- Email: `admin@mail.com`
- Password: `admin123`

### Student
- Email: `mahasiswa@mail.com`
- Password: `mahasiswa123`

## 📚 API Endpoints

Base URL: `http://localhost:3001`

- `GET /mahasiswa` - Get all students
- `POST /mahasiswa` - Create student
- `PUT /mahasiswa/:id` - Update student
- `DELETE /mahasiswa/:id` - Delete student
- Similar endpoints for: `/dosen`, `/matakuliah`, `/kelas`, `/krs`, `/user`

## 📞 Support

For deployment help, see [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) or contact the development team.

---

**Ready to deploy?** Check out [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) for step-by-step instructions! 🚀
