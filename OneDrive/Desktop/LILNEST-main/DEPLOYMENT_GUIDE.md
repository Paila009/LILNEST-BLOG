# NeuroSync (LILNEST) - Deployment & Testing Guide

## 🚀 Project Status: READY FOR DEPLOYMENT

### ✅ Fixed Issues

1. **Environment Variables**
   - Fixed missing `VITE_API_BASE_URL` configuration
   - Added proper fallback for Vercel serverless functions
   - Updated `.env` with clear comments

2. **API Endpoint Configuration**
   - Fixed `AIAssistant.jsx` to work with both localhost and Vercel
   - Fixed `ChatWidget.jsx` API endpoint
   - Fixed `AIDietPlanner.jsx` API endpoint
   - All API calls now use: `const endpoint = apiUrl ? '${apiUrl}/api/chat' : '/api/chat';`

3. **Vercel Configuration**
   - Updated `vercel.json` with proper routes
   - Added `.vercelignore` file
   - Serverless function in `/api/chat.js` is properly configured

4. **Build Configuration**
   - Build completes successfully
   - All dependencies installed
   - No compilation errors

---

## 📋 Prerequisites

- Node.js v14+ installed
- Firebase account with project configured
- Groq API key (get from https://console.groq.com/keys)
- Vercel account (for deployment)

---

## 🏠 Local Development

### 1. Install Dependencies
```bash
cd "c:\Users\Paila\OneDrive\Desktop\NeuroSync-main\NeuroSync-main"
npm install
```

### 2. Configure Environment Variables

Your `.env` file should look like this:

```env
# Get your API key from https://console.groq.com/keys
GROQ_API_KEY=your_actual_groq_api_key

# API Base URL - For local development with backend server
# Uncomment the line below if running the Express server locally
# VITE_API_BASE_URL=http://localhost:5000

# For Vercel deployment or using serverless functions, leave empty
VITE_API_BASE_URL=

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Run Development Server

**Option A: Frontend Only (Recommended for Vercel deployment testing)**
```bash
npm run dev
```
The app will run on `http://localhost:4028`

**Option B: Frontend + Backend Server (For full local testing)**
```bash
# Terminal 1 - Run backend server
npm run server

# Terminal 2 - Run frontend
npm run dev
```
Backend runs on `http://localhost:5000`, Frontend on `http://localhost:4028`

**Option C: Both Together**
```bash
npm run dev:all
```

### 4. Test the Build
```bash
npm run build
npm run preview
```

---

## 🌐 Vercel Deployment

### Step 1: Prepare for Deployment

1. Make sure your `.env` file has `VITE_API_BASE_URL=` (empty for Vercel)
2. Commit your changes to Git:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel

**Method 1: Vercel CLI (Recommended)**
```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

**Method 2: Vercel Dashboard**
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### Step 3: Add Environment Variables in Vercel

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

```
GROQ_API_KEY = your_groq_api_key
VITE_FIREBASE_API_KEY = your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN = your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = your-project-id
VITE_FIREBASE_STORAGE_BUCKET = your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID = your_sender_id
VITE_FIREBASE_APP_ID = your_app_id
```

⚠️ **Important:** DO NOT add `VITE_API_BASE_URL` in Vercel environment variables. Leave it unset so the app uses serverless functions.

### Step 4: Deploy
- Click "Deploy" and wait for the build to complete
- Your app will be live at `https://your-project.vercel.app`

---

## 🧪 Testing Checklist

### Frontend Tests
- [ ] Home page loads correctly
- [ ] Navigation between pages works
- [ ] Login/Register functionality works
- [ ] Protected routes redirect to login when not authenticated
- [ ] Theme toggle works (dark/light mode)
- [ ] Responsive design works on mobile/tablet/desktop

### AI Assistant Tests
- [ ] AI Assistant chat widget opens
- [ ] Quick action chips work (Fitness, Diet, Milestones, etc.)
- [ ] AI responses are received
- [ ] Error handling works (test with network disabled)
- [ ] Contextual actions buttons work

### Feature Tests
- [ ] Dashboard loads with all widgets
- [ ] Fitness tracker works
- [ ] Diet planner generates meal plans
- [ ] Growth tracker displays charts
- [ ] Medicine reminders can be set
- [ ] Kick counter works
- [ ] Emergency SOS button is visible
- [ ] Community page loads
- [ ] Marketplace displays providers
- [ ] Time Capsule creates and displays capsules
- [ ] Visualizer shows 3D baby development
- [ ] Profile page shows user info

### API Tests
- [ ] `/api/chat` endpoint responds
- [ ] AI chat messages are sent and received
- [ ] Error messages display when API fails
- [ ] Fallback responses work when API is down

### Performance Tests
- [ ] Initial page load < 3 seconds
- [ ] Navigation between pages is smooth
- [ ] Images load properly
- [ ] No console errors
- [ ] Build size is reasonable (< 4MB)

---

## 🐛 Common Issues & Solutions

### Issue 1: "Failed to fetch" error in AI Assistant
**Solution:** 
- Check that `GROQ_API_KEY` is set in environment variables
- Ensure `VITE_API_BASE_URL` is empty (not set) for Vercel deployment
- Check Vercel logs for API errors

### Issue 2: Firebase authentication not working
**Solution:**
- Verify all Firebase environment variables are correct
- Check Firebase Console → Authentication → Sign-in methods
- Ensure authorized domains include your Vercel domain

### Issue 3: Routes not working on Vercel (404 errors)
**Solution:**
- Verify `vercel.json` has the correct rewrite rules
- Check that the build output directory is set to `dist`

### Issue 4: Build warnings about chunk size
**Solution:**
- This is a warning, not an error
- The app will still work
- Consider code splitting for better performance (future optimization)

### Issue 5: Environment variables not loaded
**Solution:**
- In Vercel, environment variables must be prefixed with `VITE_` to be accessible in the frontend
- Rebuild and redeploy after adding environment variables
- Check Vercel logs for deployment issues

---

## 📊 Project Structure

```
NeuroSync-main/
├── api/
│   └── chat.js                 # Vercel serverless function for AI chat
├── public/
│   ├── manifest.json
│   ├── robots.txt
│   └── assets/
├── server/
│   └── index.js                # Express server (for local dev)
├── src/
│   ├── components/             # Reusable UI components
│   ├── contexts/               # React contexts (Auth, Theme)
│   ├── firebase/               # Firebase configuration
│   ├── pages/                  # Page components
│   ├── styles/                 # CSS files
│   ├── utils/                  # Utility functions
│   ├── App.jsx
│   ├── Routes.jsx
│   └── index.jsx
├── .env                        # Environment variables (DO NOT COMMIT)
├── .env.example                # Example environment variables
├── .gitignore
├── .vercelignore
├── index.html
├── package.json
├── vercel.json                 # Vercel deployment config
└── vite.config.mjs             # Vite build config
```

---

## 🔒 Security Notes

1. **Never commit `.env` file** - It contains sensitive API keys
2. **Use environment variables** for all secrets
3. **Enable Firebase security rules** in production
4. **Review Vercel logs** regularly for security issues
5. **Keep dependencies updated** - Run `npm audit fix` regularly

---

## 📈 Performance Optimization (Future)

1. Implement code splitting with React.lazy()
2. Add service worker for offline support
3. Optimize images with WebP format
4. Implement caching strategies
5. Add bundle analyzer to identify large dependencies

---

## 🎯 Next Steps After Deployment

1. Test all features on production URL
2. Set up custom domain (optional)
3. Configure Firebase security rules
4. Set up monitoring/analytics
5. Test on multiple devices and browsers
6. Share with users and collect feedback

---

## 📞 Support

- GitHub Issues: https://github.com/Bharath-2006-git/NeuroSync/issues
- Firebase Console: https://console.firebase.google.com/
- Vercel Dashboard: https://vercel.com/dashboard
- Groq API: https://console.groq.com/

---

**Last Updated:** November 15, 2025
**Status:** ✅ Ready for Production Deployment
