# 🌸 LILNEST - Maternal Wellness Platform

A comprehensive maternal wellness platform built with modern web technologies, designed to support expectant mothers throughout their pregnancy journey with AI-powered assistance, community support, and interactive 3D fetal development visualization.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-4.5.14-646CFF)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC)
![Firebase](https://img.shields.io/badge/Firebase-10.8.0-FFCA28)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🤖 AI Assistant with Groq Integration
- Real-time AI chatbot powered by Groq's LLaMA 3.1 70B model
- 9 quick action chips for instant guidance (Fitness, Diet, Milestones, etc.)
- Context-aware responses tailored to pregnancy week
- Deep integration with all platform features
- Rotating placeholder text for better UX
- Typing indicator animations

### 🍼 3D Fetal Development Visualizer
- Interactive baby silhouette with 6 anatomical hotspots
- Week-by-week development tracking (Weeks 8-40)
- Size comparison system with fruit analogies
- 3 viewing modes: Explore, Guided Tour, Timeline
- Educational "Did you know?" facts for each feature
- Integration with Time Capsule and Community

### 💝 Time Capsule
- Digital memory vault for pregnancy moments
- Soft maternal color palette (blues, pinks, ambers)
- Multiple media support (text, photos, videos, voice notes)
- Template library with 8 pre-made capsules
- 4-step creation wizard
- Future reveal scheduling

### 👥 Community Features
- Connect with other expectant mothers
- Share experiences and advice
- Support groups and discussions
- Expert Q&A sessions

### 🛒 Marketplace
- Find trusted healthcare providers
- Book appointments with specialists
- Access prenatal services
- Service provider profiles

### 🔐 Authentication & Security
- Firebase Authentication integration
- Email/Password and Google Sign-In
- Secure user data management
- Role-based access control
- Protected routes

## 🚀 Quick Start

### Prerequisites
- Node.js (v14.x or higher)
- npm or yarn
- Firebase account
- Groq API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bharath-2006-git/NeuroSync.git
   cd NeuroSync
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   # Groq API Configuration
   GROQ_API_KEY=your_groq_api_key_here
   VITE_API_BASE_URL=http://localhost:5000

   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Firebase Setup**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select existing
   - Enable Authentication > Sign-in methods > Email/Password
   - Enable Firestore Database
   - Copy your config values to `.env`

5. **Groq API Setup**
   - Visit [Groq Console](https://console.groq.com/keys)
   - Generate a new API key
   - Add to `.env` as `GROQ_API_KEY`

6. **Start Development Servers**
   
   **Backend (Groq AI Server):**
   ```bash
   node server/index.js
   ```
   Runs on `http://localhost:5000`

   **Frontend (Vite Dev Server):**
   ```bash
   npm run dev
   ```
   Runs on `http://localhost:4028`

   **Or run both concurrently:**
   ```bash
   npm run dev:all
   ```

## 📁 Project Structure

```
LILNEST/
├── public/
│   ├── assets/
│   │   └── images/          # Static images
│   ├── models/              # 3D model assets
│   ├── manifest.json
│   └── robots.txt
├── server/
│   └── index.js             # Express + Groq API backend
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── AIAssistant.jsx      # AI chatbot widget
│   │   │   ├── Header.jsx           # Main navigation
│   │   │   ├── Button.jsx           # Reusable button
│   │   │   ├── Input.jsx            # Form inputs
│   │   │   └── ...
│   │   ├── ErrorBoundary.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── RoleGuard.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx          # Firebase auth state
│   │   └── ThemeContext.jsx         # Dark/light mode
│   ├── firebase/
│   │   └── config.js                # Firebase initialization
│   ├── pages/
│   │   ├── dashboard-home/
│   │   ├── time-capsule/
│   │   │   └── index.jsx            # Time Capsule feature
│   │   ├── visualizer/
│   │   │   └── index.jsx            # 3D Visualizer
│   │   ├── community/
│   │   ├── marketplace/
│   │   ├── login/
│   │   ├── register/
│   │   └── ...
│   ├── styles/
│   │   ├── index.css
│   │   └── tailwind.css
│   ├── utils/
│   │   ├── cn.js                    # Class name utility
│   │   └── ...
│   ├── App.jsx                      # Root component
│   ├── Routes.jsx                   # Route configuration
│   └── index.jsx                    # Entry point
├── .env                             # Environment variables
├── .gitignore
├── index.html
├── package.json
├── postcss.config.cjs
├── render.yaml                      # Render deployment config
├── tailwind.config.js
└── vite.config.mjs
```

## 🎨 Tech Stack

### Frontend
- **React 18.2.0** - UI library with concurrent features
- **Vite 4.5.14** - Lightning-fast build tool
- **TailwindCSS 3.4.17** - Utility-first CSS framework
- **React Router 6.0.2** - Client-side routing
- **Framer Motion 11.18.0** - Animation library
- **React Hook Form 7.54.2** - Form management

### Backend & Services
- **Express 4.19.2** - Node.js web framework
- **Groq SDK 0.5.0** - AI model integration
- **Firebase 10.8.0** - Authentication & database
- **Axios 1.8.4** - HTTP client

### Data Visualization
- **D3.js 7.9.0** - Advanced data visualization
- **Recharts 2.15.0** - React chart components

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **React Icons** - Icon library

## 🔧 Available Scripts

```bash
npm run dev           # Start Vite dev server (port 4028)
npm run server        # Start Express backend (port 5000)
npm run dev:all       # Run both frontend & backend concurrently
npm run build         # Build for production (outputs to dist/)
npm run preview       # Preview production build
npm run lint          # Run ESLint
```

## 🌐 Deployment

### Render Deployment

1. **Configure Environment Variables** in Render Dashboard:
   - Add all Firebase config variables
   - Add Groq API key for backend service
   - Set `VITE_API_BASE_URL` to your backend URL

2. **Deploy**:
   ```bash
   git push origin main
   ```
   Render will automatically build and deploy both services.

### Build Configuration
- **Output Directory**: `dist/`
- **Build Command**: `npm run build`
- **Node Version**: 14.x or higher

## 📱 Key Features Breakdown

### AI Assistant
- **Location**: Floating orb in bottom-right corner
- **Model**: LLaMA 3.1 70B (Groq)
- **Temperature**: 0.7 for natural responses
- **Quick Actions**: 9 contextual chips
- **Integrations**: Direct navigation to Time Capsule, Visualizer, Community, Marketplace

### 3D Visualizer
- **Weeks Covered**: 8, 12, 16, 20, 22, 24, 28, 32, 36, 40
- **Hotspots**: Heart, Brain, Hands, Ears, Eyes, Lungs
- **Interactive Elements**: Pulsing markers, hover tooltips, click-to-learn
- **Size Comparisons**: Raspberry → Watermelon journey

### Time Capsule
- **Color Theme**: Soft maternal palette (sky, pink, teal, amber)
- **Media Types**: Text, photos, videos, voice recordings
- **Templates**: First kick, ultrasound, gender reveal, etc.
- **Privacy**: Secure storage with Firebase

## 🔐 Firebase Setup Instructions

1. Create project at [firebase.google.com](https://firebase.google.com)
2. Enable Email/Password authentication
3. Create Firestore database
4. Add web app and copy config
5. Update `.env` with credentials

## 🤖 Groq API Setup

1. Sign up at [groq.com](https://groq.com)
2. Generate API key from dashboard
3. Add to `.env` as `GROQ_API_KEY`
4. Backend uses `llama-3.1-8b-instant` model

## 🎨 Design Philosophy

- **Maternal-First**: Soft colors (blues, pinks, ambers) for calming UX
- **Mobile-Responsive**: Full support for all screen sizes
- **Accessible**: WCAG 2.1 AA compliant
- **Performance**: Optimized with lazy loading and code splitting
- **Privacy**: Secure authentication and encrypted data

## 🐛 Troubleshooting

### Authentication Issues
- Ensure Email/Password is enabled in Firebase Console
- Check Firebase credentials in `.env`
- Verify `VITE_` prefix on all frontend env variables

### AI Assistant Not Working
- Confirm backend is running on port 5000
- Check Groq API key is valid
- Verify `VITE_API_BASE_URL` points to backend

### Build Failures
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Ensure Node.js version is 14.x or higher
- Check all environment variables are set

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Groq** - AI model infrastructure
- **Firebase** - Authentication and database
- **Render** - Hosting and deployment
- **Tailwind Labs** - CSS framework
- **Vercel** - Vite build tool

## 👥 Contributors

- **Bharath** - Lead Developer
- **Akash** - Project Maintainer

## 📞 Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/Bharath-2006-git/NeuroSync/issues)
- Email: support@lilnest.com

---

Built with ❤️ for expectant mothers worldwide

