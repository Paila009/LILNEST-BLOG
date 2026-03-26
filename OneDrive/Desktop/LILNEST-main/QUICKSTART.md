# NeuroSync Quick Start

## 🚀 Run Locally (Development)

```bash
# Navigate to project
cd "c:\Users\Paila\OneDrive\Desktop\NeuroSync-main\NeuroSync-main"

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

**Open:** http://localhost:4028

---

## 🌐 Deploy to Vercel

### Method 1: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI (one time)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to staging
vercel

# Deploy to production
vercel --prod
```

### Method 2: Using Vercel Dashboard

1. Go to https://vercel.com
2. Click "New Project"
3. Import from GitHub: `Bharath-2006-git/NeuroSync`
4. Configure:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variables (see below)
6. Click "Deploy"

---

## 🔑 Environment Variables for Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```
GROQ_API_KEY = your_groq_api_key_here
VITE_FIREBASE_API_KEY = your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN = your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = your-project-id
VITE_FIREBASE_STORAGE_BUCKET = your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID = your_sender_id
VITE_FIREBASE_APP_ID = your_app_id
```

⚠️ **Note:** Use the actual values from your `.env` file. Do not commit API keys to Git!

⚠️ **Important:** Do NOT add `VITE_API_BASE_URL` in Vercel - leave it unset!

---

## 🧪 Test Build Locally

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

**Open:** http://localhost:4173

---

## 📋 Common Commands

```bash
# Development (frontend only)
npm run dev

# Development (frontend + backend server)
npm run dev:all

# Build for production
npm run build

# Preview production build
npm run preview

# Run backend server only
npm run server

# Check for errors
npm run lint

# Check for security issues
npm audit

# Update dependencies
npm update
```

---

## 🐛 Troubleshooting

### "Module not found" error
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Port already in use"
```bash
# Kill process on port 4028 (Windows)
netstat -ano | findstr :4028
taskkill /PID <PID> /F
```

### Vercel deployment fails
1. Check environment variables are set correctly
2. Verify `vercel.json` is in root directory
3. Check Vercel build logs for specific errors
4. Ensure all dependencies are in `package.json`

### AI Assistant not working
1. Verify `GROQ_API_KEY` is set
2. Check browser console for errors
3. Verify `/api/chat` endpoint is accessible
4. Test with fallback responses

---

## 📚 Documentation

- **Full Guide:** See `DEPLOYMENT_GUIDE.md`
- **Testing:** See `TESTING_CHECKLIST.md`
- **Audit Report:** See `PROJECT_AUDIT.md`
- **README:** See `README.md`

---

## ✅ Project Status

**Current Status:** ✅ **PRODUCTION READY**

- Build: ✅ Working
- Localhost: ✅ Working  
- Vercel Config: ✅ Ready
- Environment: ✅ Configured
- Documentation: ✅ Complete

---

## 🎯 Next Steps

1. [ ] Test on localhost
2. [ ] Deploy to Vercel
3. [ ] Test on production URL
4. [ ] Enable Firebase Auth methods
5. [ ] Configure Firebase security rules
6. [ ] Share with users

---

**Need Help?**
- Check `DEPLOYMENT_GUIDE.md` for detailed instructions
- Check `TESTING_CHECKLIST.md` for comprehensive testing
- Check browser console for errors
- Check Vercel logs for deployment issues
