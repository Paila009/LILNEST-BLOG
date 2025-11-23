# LILNEST Project Prompts

## 1. Original Project README (Before Prompt)

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

---

## 2. Comprehensive Architectural Breakdown (Current Prompt)

# 🌸 **LILNEST - COMPREHENSIVE ARCHITECTURAL BREAKDOWN**

## **📋 EXECUTIVE SUMMARY**

LILNEST is a comprehensive maternal wellness platform built with React, Firebase, and AI integration. It supports expectant mothers throughout pregnancy and early parenting with 20+ interconnected features spanning health tracking, community support, expert marketplace, and AI assistance.

---

## **🏗️ SYSTEM ARCHITECTURE**

### **Technology Stack**
- **Frontend**: React 18.2.0 + Vite 4.5.14
- **Styling**: TailwindCSS 3.4.17 + Framer Motion
- **Backend**: Express.js + Firebase + Groq AI
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Email/Password + Google OAuth)
- **Deployment**: Vercel-ready with serverless functions

### **Project Structure**
```
LILNEST/
├── src/
│   ├── components/ui/          # Reusable UI components
│   ├── contexts/               # React Context providers
│   ├── firebase/               # Firebase configuration
│   ├── pages/                  # Feature pages (20+ modules)
│   ├── utils/                  # Helper functions
│   └── styles/                 # Global styles
├── server/                     # Express backend
├── api/                        # Vercel serverless functions
└── public/                     # Static assets
```

---

## **🎯 COMPLETE FEATURE BREAKDOWN**

### **1. AUTHENTICATION & AUTHORIZATION**

#### **Login System** (`/login`)
- **Email/Password Authentication**
- **Google Sign-In Integration**
- **Remember Me Functionality**
- **Error Handling with Toast Notifications**
- **Responsive Design with Gradient Backgrounds**

#### **Registration** (`/register`)
- **User Account Creation**
- **Display Name Setup**
- **Firebase User Profile Creation**
- **Automatic Role Assignment (Mother by default)**
- **Email Verification**

#### **Password Reset** (`/reset-password`)
- **Email-based Password Recovery**
- **Firebase Reset Link Generation**
- **Success/Error Feedback**

#### **Protected Routes**
- **Route-level Authentication Guards**
- **Automatic Redirect to Login**
- **Role-based Access Control**
- **Session Persistence**

---

### **2. DASHBOARD HOME** (`/dashboard-home`)

#### **Welcome Section**
- **Personalized Greeting**
- **Current Date Display**
- **Week of Pregnancy Indicator**

#### **Wellness Overview Panel**
- **Today's Focus Score**
- **Stress Level Indicator**
- **Energy Level Tracking**
- **Sleep Quality Metrics**
- **Visual Progress Rings**

#### **Quick Actions Grid**
- **Fast Navigation to Key Features**:
  - Fitness Tracker
  - Diet Planner
  - Growth Charts
  - Kick Counter
  - Medicine Tracker
  - Community Forum
  - Marketplace
  - Time Capsule
  - 3D Visualizer

#### **Mindfulness Feed**
- **Daily Wellness Tips**
- **Pregnancy Affirmations**
- **Breathing Exercise Reminders**

#### **Status Indicator Panel**
- **Current Trimester Status**
- **Weeks Remaining**
- **Next Appointment Reminder**

#### **Hydration Widget**
- **Daily Water Intake Tracker**
- **8-glass Goal System**
- **Visual Progress Indicator**
- **Reminder Notifications**

#### **Statistics Dashboard**
- **Focus Quality (85%)**
- **Weekly Goal Progress (12/15)**
- **Deep Work Hours (4.2h)**
- **Garden Level (Level 3)**

---

### **3. FITNESS MODULE** (`/fitness`)

#### **Core Features**
- **Trimester-Specific Exercise Plans**
- **9 Workout Categories**:
  1. Prenatal Yoga (15-30 min, Low intensity)
  2. Low-Impact Strength (20 min, Moderate)
  3. Prenatal Pilates (25 min, Low)
  4. Breathing & Relaxation (10 min, Low)
  5. Walking Workouts (30 min, Low)
  6. Stretching for Back & Hips (15 min, Low)
  7. Labor Preparation (20 min, Moderate - Week 37+)
  8. Postpartum Core Healing (15 min, Low)
  9. Mother & Baby Mobility (20 min, Low)

#### **Workout Session Features**
- **Real-time Timer (MM:SS format)**
- **Heart Rate Monitor (112 bpm)**
- **Calorie Tracker**
- **Hydration Reminder Integration**
- **Safety Indicator System**:
  - Safe Zone (Green)
  - Moderate Effort (Yellow)
  - Take it Easy (Red)

#### **Active Workout View**
- **Live Metrics Dashboard**
- **Breathing Animation Circle**
- **Pause/Resume Controls**
- **Baby Kick Counter Integration**
- **Water Intake Logging**
- **End Workout Summary**

#### **Safety Features**
- **Trimester-Based Recommendations**
- **Intensity Level Indicators**
- **Heart Rate Zones**
- **Pregnancy-Safe Modifications**

#### **Rule Engine** (`utils/fitnessRules.js`)
- **Dynamic Plan Generation Based On**:
  - Current Trimester
  - Medical History (Anemia, Thyroid, Diabetes, BP, Epilepsy, Asthma)
  - Lifestyle (Sedentary/Active)
  - Movement Hours per Day
  - Current Symptoms

---

### **4. DIET & NUTRITION** (`/diet`)

#### **Smart Diet Planner**
- **AI-Powered Meal Planning**
- **Trimester-wise Menu Generation**
- **Regional Indian Diets**:
  - Telugu
  - Tamil
  - Bengali
  - Gujarati
  - Punjabi

#### **Condition-Specific Plans**
- **Gestational Diabetes**
- **Anemia Management**
- **Iron & Folate-Rich Meals**
- **DHA-Rich Options**

#### **Food Safety Scanner** (`/diet/FoodSafetyScanner`)
- **Barcode/Name-based Lookup**
- **Pregnancy Safety Ratings**:
  - ✅ Safe to Eat
  - ⚠️ Eat in Moderation
  - ❌ Avoid During Pregnancy
- **Nutritional Information**
- **Alternative Suggestions**

#### **AI Diet Planner** (`/diet/AIDietPlanner`)
- **Groq AI Integration**
- **Context-aware Recommendations**
- **Dietary Preference Support**
- **Allergy Considerations**

#### **Hydration Counter**
- **Smart Water Reminders**
- **Warm Water Prompts**
- **Daily Goal Tracking**

#### **Kids Nutrition**
- **Stage-wise Plans**:
  - 6-9 months
  - 1-3 years
  - 3-8 years

---

### **5. GROWTH & DEVELOPMENT** (`/growth`)

#### **WHO Growth Charts** (`MultiWHOChart.jsx`)
- **Weight-for-Age Charts**
- **Height/Length-for-Age Charts**
- **BMI-for-Age Charts**
- **Separate Charts for Boys/Girls**
- **Percentile Curves (3rd, 15th, 50th, 85th, 97th)**
- **Real-time Plotting of Child's Data**

#### **Input System**
- **Age in Months**
- **Weight (kg)**
- **Height/Length (cm)**
- **BMI Calculation**
- **Automatic BMI Calculator**

#### **Visual Indicators**
- **D3.js-powered Charts**
- **Interactive Data Points**
- **Color-coded Zones**
- **Responsive SVG Graphics**

#### **Milestone Tracking**
- **Feeding Stages (Breastfeed/Formula/Solids)**
- **Physical Milestones**:
  - First Smile
  - Rolling
  - Crawling
  - Babbling
  - Walking

#### **Head Circumference Tracking**
- **WHO Standard Comparisons**
- **Growth Velocity Monitoring**

---

### **6. MEDICINE TRACKER** (`/medicine`)

#### **Pediatric Medicine Database**
- **Montelukast** - 4mg chew tab (HS) - Allergy management
- **Domperidone** - 0.25-0.5 mg/kg (TID) - Avoid unnecessary use
- **Zinc Syrup** - 10mg/day (Daily) - For diarrhea with ORS
- **Vitamin D Drops** - 400 IU/day (Daily) - Infant supplement
- **Saline Nasal Drops** - 1-2 drops/nostril (4-6× daily) - Cold relief

#### **Pregnancy Medicine Database**
- **Metformin** - 500-1500mg (Daily) - For GDM under doctor
- **Labetalol** - 100-200mg (BID) - BP control
- **Levothyroxine** - Weight-based (Morning) - Thyroid management
- **Progesterone** - Doctor-guided - High-risk pregnancy
- **ORS + Electrolytes** - 200-250mL - For vomiting weeks

#### **Search Functionality**
- **Medicine Name Search**
- **Filter by Category**
- **Real-time Results**

#### **Information Display**
- **Dosage Information**
- **Frequency Schedule**
- **Safety Notes**
- **Doctor Consultation Flags**

---

### **7. KICK COUNTER** (`/kick-counter`)

#### **Baby Kick Tracking**
- **2-Hour Session Timer**
- **Live Elapsed Time (HH:MM:SS)**
- **Kick Count Display**
- **Tap-to-Record Interface**
- **Visual Feedback (💗 icon)**

#### **Safety Alerts**
- **10 Kicks in 2 Hours Rule**
- **Automatic Alert**: "Less than 10 kicks in 2 hours — Call your doctor"
- **Red Warning Display**

#### **Contraction Timer**
- **Start/Stop Recording**
- **Interval Calculation (seconds)**
- **Average Duration Display**
- **5-Minute Rule Warning**:
  - "If contractions are under 5 min apart for 1 hour, contact your hospital"

#### **Session Management**
- **Start New Session**
- **Reset Functionality**
- **Historical Tracking**

---

### **8. EMERGENCY SOS** (`/emergency`)

#### **Emergency Contact Management**
- **Hospital Contact**
- **Doctor Contact**
- **Partner Contact**
- **Family Contact**
- **Custom Emergency Numbers**

#### **Contact Cards**
- **Quick Call Buttons**
- **Online Status Indicators**
- **Add/Edit Functionality**
- **One-Touch Dialing**

#### **SOS Activation System**
- **5-Second Countdown**
- **Cancel Option**
- **Automatic Location Sharing**
- **GPS Integration**
- **Google Maps Link Generation**

#### **Emergency Message**
```
🚨 EMERGENCY SOS from NeuroSync 🚨
I need immediate help!
My location: [Google Maps Link]
Please contact me or come to my location immediately.
```

#### **Multi-Channel Alert**
- **SMS to All Contacts**
- **Automatic Phone Call**
- **Location Broadcasting**

#### **Red Flags Reference**
- **Severe Bleeding or Fluid Leakage** (Critical)
- **Severe Abdominal Pain** (Critical)
- **No Fetal Movement** (Critical)
- **Vision Changes** (High)
- **Severe Headache** (High)
- **Chest Pain/Breathing Difficulty** (Critical)
- **Persistent Vomiting** (Moderate)
- **High Fever** (High)

#### **Quick Actions**
- **Share Current Location**
- **Call Emergency Services**
- **Navigate to Hospital**

---

### **9. 3D FETAL VISUALIZER** (`/visualizer`)

#### **Week Selection** (8-40 weeks)
- **Week 8**: Raspberry (1.6cm, 1g)
- **Week 12**: Lime (5.4cm, 14g)
- **Week 16**: Avocado (11.6cm, 100g)
- **Week 20**: Banana (16.4cm, 300g)
- **Week 22**: Papaya (27.8cm, 430g)
- **Week 24**: Cantaloupe (30cm, 600g)
- **Week 28**: Eggplant (37.6cm, 1kg)
- **Week 32**: Pineapple (42.4cm, 1.7kg)
- **Week 36**: Watermelon (47.4cm, 2.6kg)
- **Week 40**: Pumpkin (51.2cm, 3.4kg)

#### **Interactive Hotspots** (6 anatomical points)
1. **Heart Development**
   - 140-150 BPM
   - 4-chamber formation
   - Fact: "Heart began beating at 5-6 weeks!"

2. **Brain Growth**
   - Billions of neurons forming daily
   - Foundation for learning/emotions
   - Fact: "By birth, 100 billion neurons!"

3. **Hands & Fingers**
   - Separated digits with nails
   - Grasping ability
   - Thumb-sucking
   - Fact: "Fingerprints are unique and permanent!"

4. **Hearing Development**
   - External sound recognition
   - Voice recognition
   - Music response
   - Fact: "Babies prefer their mother's voice at birth!"

5. **Vision Development**
   - Eyelid movement
   - Light sensing
   - Turn toward brightness
   - Fact: "Babies can see light through the womb!"

6. **Lung Development**
   - Practice breathing with amniotic fluid
   - Air sac (alveoli) formation
   - Fact: "Babies practice breathing before birth!"

#### **View Modes**
1. **Explore Mode**
   - Free navigation
   - Click hotspots for info
   - Interactive markers

2. **Guided Tour**
   - Automatic hotspot sequence
   - Educational narration
   - Timed progression

3. **Timeline Mode**
   - Week-by-week progression
   - Historical comparison
   - Growth animation

#### **3D Controls**
- **Rotate Left/Right**
- **Zoom In/Out**
- **Reset View**
- **Size Compare Mode**

#### **Visual Elements**
- **Gradient Baby Silhouette**
- **Pulsing Hotspot Markers**
- **Hover Tooltips**
- **Ambient Glow Effects**
- **Radial Gradients**

#### **Weekly Highlights**
- 5 key developments per week
- Progress percentage
- Heartbeat display
- Size comparison fruit emoji

#### **Integration Features**
- **Save to Time Capsule**
- **Find Expert (Marketplace)**
- **Join Community Discussion**

---

### **10. TIME CAPSULE** (`/time-capsule`)

#### **Color Palette**
- **Sky Blues**: Calming maternal theme
- **Soft Pinks**: Nurturing warmth
- **Teal Accents**: Growth and healing
- **Amber Highlights**: Memory preservation

#### **Capsule Status System**
1. **Locked** 🔒 (Blue)
   - Future unlock date set
   - Content sealed
   - Cannot be edited

2. **Editable** ✏️ (Amber/Orange)
   - Can add/modify content
   - Draft state
   - Not yet sealed

3. **Unlocked** 🔓 (Green)
   - Past reveal date reached
   - Content accessible
   - Can be viewed/shared

#### **Memory Types**
- **Letters** - Heartfelt written messages
- **Photos** - Image uploads
- **Videos** - Video recordings
- **Voice Notes** - Audio messages
- **Mixed Media** - Combination of all

#### **8 Pre-made Templates**
1. **First Ultrasound Memory**
   - Week 12, First glimpse
   - Unlock: At Birth

2. **Gender Reveal Moment**
   - The big announcement
   - Unlock: 1st Birthday

3. **First Kick Letter**
   - Week 20, Movement felt
   - Unlock: 5 Years Old

4. **Mom's Pregnancy Journey**
   - Full story documentation
   - Unlock: 18th Birthday

5. **Dad's Letter to Baby**
   - Father's perspective
   - Unlock: 10 Years Old

6. **Nursery Preparation**
   - Room setup memories
   - Unlock: Teenage Years

7. **Birth Day Story**
   - Delivery experience
   - Unlock: Wedding Day

8. **Family Tree & Heritage**
   - Ancestry information
   - Unlock: Custom Date

#### **4-Step Creation Wizard**

**Step 1: Choose Memory Type**
- Letter (Text-based)
- Photos (Image upload)
- Video (Recording)
- Voice Note (Audio)

**Step 2: Add Content**
- Title input
- Message textarea (rich text)
- Photo uploader (drag & drop)
- Video recorder
- Audio recorder
- Media preview grid

**Step 3: Set Unlock Date**
- **At Birth** (Age 0)
- **1st Birthday** (Age 1)
- **5 Years Old**
- **10 Years Old**
- **Teenage Years** (Age 13)
- **18th Birthday**
- **Wedding Day** (Age 25+)
- **Custom Date** (Calendar picker)

**Step 4: Review & Seal**
- Content preview
- Edit before final seal
- Confirmation modal
- "Lock Forever" action

#### **Capsule Card Display**
- **Gradient Background** (per status)
- **Icon Badge** (Heart, Gift, Star, Calendar, etc.)
- **Status Badge** (Top-right)
- **Creation Date**
- **Unlock Info** (Date/Age)
- **Media Count** (Photos/Videos/Audio)
- **Hover Animations** (Scale + Shadow)

#### **Gallery View**
- **Grid Layout** (3 columns on desktop)
- **Filter by Status** (All/Locked/Unlocked)
- **Sort Options** (Date Created/Unlock Date)
- **Search Functionality**

#### **Security Features**
- **Firebase Storage** for media
- **Encrypted Content**
- **User-specific Access**
- **No premature unlocking**

---

### **11. COMMUNITY FORUM** (`/community`)

#### **Main Features**
- **10,000+ Parent Network**
- **Safe, Moderated Space**
- **Expert Verification System**
- **Real-time Discussions**

#### **8 Discussion Categories**
1. **Pregnancy** (234 active discussions)
   - Trimester-specific topics
   - Symptoms discussions
   - Due date groups

2. **Postpartum** (156 discussions)
   - Recovery experiences
   - Body changes
   - Emotional support

3. **Breastfeeding** (189 discussions)
   - Latching help
   - Supply issues
   - Pumping advice

4. **Baby Sleep** (145 discussions)
   - Sleep training methods
   - Night wakings
   - Nap schedules

5. **Nutrition** (98 discussions)
   - Meal planning
   - Picky eaters
   - Feeding transitions

6. **Mental Health** (167 discussions)
   - Postpartum depression
   - Anxiety management
   - Self-care strategies

7. **Working Parents** (123 discussions)
   - Work-life balance
   - Daycare options
   - Career transitions

8. **Local Groups** (89 discussions)
   - City-based meetups
   - Playdate coordination
   - Local resources

#### **Thread Components**

**Thread Card Display**:
- User avatar (gradient circle)
- Author name or "Anonymous"
- Post timestamp (relative time)
- Category badge
- Expert verification badge (✓ Expert)
- New post badge (within 24h)
- Title (clickable)
- Body preview (2 lines max)
- Tag chips (#pregnancy, #advice, etc.)
- Interaction metrics:
  - ❤️ Likes count
  - 💬 Replies count
  - 👁️ Views count

**Thread Actions**:
- Like/Unlike (heart icon)
- Comment
- View count
- Save to Time Capsule 🎁
- Share (social media)

#### **Search & Filter**
- **Global Search Bar**
- **Category Filter**
- **Sort Options**:
  - Most Recent
  - Most Popular
  - Most Commented
  - Trending

#### **Active Tabs**
1. **For You** - Personalized feed
2. **Following** - Subscribed threads
3. **Trending** - Hot topics
4. **Expert Q&A** - Verified answers

#### **Create Post Modal**
- **Title Input** (required)
- **Body Textarea** (rich text, required)
- **Category Selector** (dropdown)
- **Tags Input** (comma-separated)
- **Anonymous Toggle** (hide identity)
- **Attach Media** (optional)

#### **Expert Provider Integration**
- **3 Featured Experts** per page
- **Quick Consultation Booking**
- **Expert Cards**:
  - Name
  - Specialty
  - Rating (⭐ 4.8-5.0)
  - Review count
  - Verified badge
  - "Book Consultation" CTA

**Example Experts**:
1. **Dr. Sarah Johnson** - Lactation Consultant (4.9, 234 reviews)
2. **Dr. Michael Chen** - Pediatrician (4.8, 189 reviews)
3. **Emily Rodriguez** - Doula & Birth Coach (5.0, 156 reviews)

#### **Community Guidelines**
- Respectful communication
- No medical advice (guidance only)
- Privacy protection
- Report system for violations

#### **Firebase Integration**
- **Real-time Updates** (onSnapshot)
- **Serverless Timestamps**
- **User Authentication Required**
- **Post Ordering** (by createdAt desc)

---

### **12. MARKETPLACE** (`/marketplace`)

#### **Service Categories** (9 categories)

1. **Lactation Consultants**
   - Expert breastfeeding support
   - Latch assistance
   - Supply management
   - Pumping guidance

2. **Doulas**
   - Birth support
   - Labor coaching
   - Postpartum care
   - Emotional guidance

3. **Sleep Training Specialists**
   - Baby sleep methods
   - Schedule optimization
   - Night weaning
   - Nap training

4. **Prenatal/Postnatal Massage**
   - Therapeutic massage
   - Pain relief
   - Relaxation techniques
   - Body alignment

5. **Childcare (Nannies & Babysitters)**
   - Full-time care
   - Part-time support
   - Overnight help
   - Emergency backup

6. **Pediatric Nutritionists**
   - Meal planning
   - Allergy management
   - Feeding transitions
   - Growth optimization

7. **Mental Health Counselors**
   - PPD/PPA treatment
   - Talk therapy
   - Couples counseling
   - Group support

8. **Pediatric Physiotherapists**
   - Motor development
   - Torticollis treatment
   - Milestone achievement
   - Movement support

9. **All Services**
   - View all providers
   - Cross-category search

#### **Provider Card Design**

**Visual Elements**:
- **Avatar** - Gradient bordered circle
- **Online Status** - Green pulse indicator
- **Featured Badge** - ⭐ Animated gold badge
- **Verified Badge** - ✓ Green checkmark
- **Category Icon** - Specialized per type

**Information Display**:
- Provider name
- Category/Specialty
- Star rating (⭐ 4.8-5.0)
- Review count (in parentheses)
- Distance from user (e.g., "2.3 km")
- Response time (e.g., "Responds in <2h")
- Price range (e.g., "₹500 - ₹2,000")

**Tags** (2 visible):
- Skill badges
- Certifications
- Specializations

**Actions**:
- ❤️ Favorite toggle
- 📅 Book Consultation (primary CTA)
- View full profile

#### **Filtering System**

**Filter Chips**:
- 🟢 Online Now
- ✅ Verified Only
- 📅 Available Today
- ⭐ Highly Rated (4.5+)
- 💰 Budget-Friendly

**Sort Options**:
- Recommended
- Highest Rated
- Most Reviewed
- Nearest
- Lowest Price
- Response Time

**Search Bar**:
- Provider name search
- Category search
- Service search
- Location-based

#### **View Modes**
- **Grid View** (3 columns) - Default
- **List View** (1 column) - Detailed
- **Map View** (location pins)

#### **Favorites System**
- Heart icon toggle
- LocalStorage persistence
- Quick access filter
- "My Favorites" tab

#### **Provider Profile Page** (`/marketplace/provider/:id`)

**Header Section**:
- Large avatar/photo
- Name & credentials
- Specialty
- Star rating breakdown
- Total reviews
- Years of experience
- Languages spoken

**About Section**:
- Bio/description
- Approach/philosophy
- Education background
- Certifications

**Services Offered**:
- Service name
- Duration
- Price
- Description
- "Add to Cart" option

**Availability Calendar**:
- Weekly schedule
- Time slot selection
- Booking confirmation

**Reviews Section**:
- Recent reviews (5 latest)
- Star distribution graph
- Filter by rating
- Verified buyer badge
- Review helpfulness votes

**Location & Contact**:
- Office address
- Map integration
- Phone number
- Email
- Website link
- Social media

#### **Booking Flow**
1. Select service
2. Choose date & time
3. Fill contact details
4. Confirm appointment
5. Payment processing
6. Confirmation email/SMS

#### **Trust & Safety**
- **Background Verification**
- **License Validation**
- **Insurance Confirmation**
- **Review Moderation**
- **Dispute Resolution**

---

### **13. REWARDS & GAMIFICATION** (`/rewards`)

#### **Leveling System**
- **Starting Level**: 1
- **Level Up Requirement**: 1,000 points per level
- **Max Level**: Unlimited
- **Visual Progress Bar**

#### **Point Earning Methods**
1. **Daily Check-in**: +50 points
2. **Complete Workout**: +100 points
3. **Log Hydration**: +10 points
4. **Create Time Capsule**: +200 points
5. **Community Post**: +75 points
6. **Kick Counter Session**: +50 points
7. **Diet Log**: +30 points
8. **Sleep Tracking**: +40 points
9. **Invite Friend**: +150 points
10. **Profile Completion**: +250 points

#### **Streak System**
- **Daily Login Streak**
- **Workout Streak**
- **Hydration Streak**
- **Community Engagement Streak**
- **Bonus**: 7-day streak = +500 points
- **Milestone**: 30-day streak = +2,000 points

#### **Badge Collection** (🏅 Achievements)
1. **Getting Started** - Earn 500 points
2. **Wellness Warrior** - 7-day streak
3. **Community Champion** - 10 forum posts
4. **Fitness Fanatic** - 20 workouts completed
5. **Hydration Hero** - 30-day water goal
6. **Memory Keeper** - 5 time capsules created
7. **Knowledge Seeker** - Complete all tutorials
8. **Social Butterfly** - 50 community interactions
9. **Milestone Master** - Track growth for 3 months
10. **Ultimate Mom** - Reach Level 10

#### **Active Challenges**

**Challenge Card Structure**:
- Challenge name
- Goal (numeric target)
- Current progress (bar + number)
- XP reward
- Time remaining (if timed)

**Example Challenges**:
1. **7-Day Wellness Challenge**
   - Goal: 7 consecutive days
   - Progress: 0/7
   - XP: +500

2. **Hydration Month**
   - Goal: 30 days of 8 glasses
   - Progress: 0/30
   - XP: +1,000

3. **Fitness February**
   - Goal: 20 workouts
   - XP: +1,500

4. **Community Contributor**
   - Goal: 15 helpful posts
   - XP: +800

#### **Stats Dashboard**
- **Level** with next level preview
- **Streak** (days in a row)
- **Badges** (total count)
- **Total Points** (all-time)

#### **Firebase Storage** (`utils/rewardsStore.js`)
- User-specific reward summaries
- Challenge progress tracking
- Badge unlock timestamps
- Point transaction history

---

### **14. PROFILE MANAGEMENT** (`/profile`)

#### **Dual Profile System**

**Mother Profile Tab**:

**1. Pregnancy Profile**
- Trimester (1st/2nd/3rd)
- EDD (Expected Delivery Date)
- Past Pregnancy History

**2. Medical History** (Checkboxes)
- Anemia
- Thyroid disorder
- Diabetes/Gestational Diabetes
- High Blood Pressure
- Epilepsy
- Asthma

**3. Daily Inputs**
- Current Symptoms (free text)
- Lifestyle/Work Type (Sedentary/Active)
- Movement Hours per day
- Allergies

**Child Profile Tab**:

**1. Basic Information**
- Age (days/months/years)
- Weight (kg)
- Length/Height (cm)
- Head Circumference (cm)

**2. Feeding**
- Type (Breastfeeding/Formula/Solids)
- Frequency
- Quantity

**3. Medical Records**
- Allergy Record
- Vaccination History (dates + types)

**4. Milestones** (auto-tracked)
- First smile
- Rolling over
- Sitting
- Crawling
- First words
- Walking

#### **Data Persistence**
- **Firebase Firestore** storage
- **User-specific subcollections**:
  - `/users/{uid}/profiles/mother`
  - `/users/{uid}/profiles/child`
- **ServerTimestamp** for updates
- **Real-time sync** across devices

#### **Profile Actions**
- Save Mother Profile button
- Save Child Profile button
- Loading states during save
- Success/error toast notifications

---

### **15. DOCTOR DASHBOARD** (`/doctor`)

#### **Patient Management**

**Add Patient Form**:
- Patient name input
- Auto-generate patient ID
- Risk level assignment (Low/Medium/High)
- Firebase creation timestamp

**Patient Card Grid**:
- Name display
- Risk level indicator
- Click to view details
- Grid layout (3 columns desktop)

**Patient Detail View** (`/doctor/:patientId`):

**1. Patient Information**
- Full name
- Age
- Pregnancy week
- Due date
- Medical history summary

**2. Vitals Dashboard**
- Blood pressure
- Weight gain
- Heart rate
- Temperature
- Blood sugar (if GDM)

**3. Prescription System**
- **New Prescription Form**:
  - Medicine name
  - Dosage (mg/ml)
  - Frequency (TID/BID/QD/PRN)
  - Notes/Instructions
- **Prescription History Table**:
  - Date prescribed
  - Medicine
  - Dosage
  - Status (Active/Completed)

**4. Appointments**
- Next appointment date
- Past visit history
- Visit notes

**5. Lab Reports**
- Upload system
- Report viewer
- Abnormal flag indicators

**6. Risk Assessment**
- Auto-calculated risk score
- Contributing factors
- Recommendations

#### **Firebase Integration**
- **Patients Collection**: `/patients/{patientId}`
- **Prescriptions Subcollection**: `/patients/{patientId}/prescriptions`
- **Real-time Updates** with onSnapshot
- **Secure Access** (doctor role required)

---

### **16. POMODORO TIMER** (`/pomodoro-timer`)

#### **Timer Phases**
1. **Focus Session** - 25 minutes (customizable)
2. **Short Break** - 5 minutes
3. **Long Break** - 30 minutes (after 4 sessions)

#### **Core Features**
- **Live Countdown Timer** (MM:SS)
- **Progress Ring** (SVG circular progress)
- **Start/Pause/Reset Controls**
- **Session Counter** (1, 2, 3, 4...)
- **Auto-transition** between phases
- **Notification Sounds**

#### **Settings Configuration**
- Focus duration (15-60 min)
- Short break (3-10 min)
- Long break (15-45 min)
- Sessions until long break (2-8)
- Auto-start next session (toggle)

#### **Website Blocker**
- **Block List**:
  - facebook.com (Social Media)
  - twitter.com (Social Media)
  - youtube.com (Entertainment)
  - Custom URLs
- **Toggle per site**
- **Active during focus only**
- **Category tags**

#### **Productivity Insights**
- **Today's Stats**:
  - Completed sessions (6)
  - Total focus time (125 min)
  - Breaks completed (5)
  - Current streak (7 days)

- **Weekly Chart** (Bar graph):
  - Mon: 180 min
  - Tue: 240 min
  - Wed: 160 min
  - Thu: 195 min
  - Fri: 210 min
  - Sat: 145 min
  - Sun: 125 min

#### **Tabs**
1. **Timer** - Main countdown view
2. **Stats** - Analytics dashboard
3. **Settings** - Configuration
4. **Blocker** - Website management

---

### **17. VIRTUAL GARDEN** (`/virtual-garden`)

#### **Garden Growth System**
- **Garden Level**: 1-10+ (unlimited)
- **XP-based Leveling**
- **Visual Garden Expansion**
- **Plant Variety Unlocks**

#### **Wellness Metrics Integration**
- **Focus Streak**: 12 days
- **Break Streak**: 18 days
- **Meditation Minutes**: 145
- **Total Sessions**: 67
- **Achievements**: 8 unlocked
- **Total Points**: 1,250

#### **Garden Elements**
1. **Trees** - Represent focus sessions
2. **Flowers** - Break completion
3. **Butterflies** - Meditation minutes
4. **Stones** - Achievements
5. **Pond** - Hydration tracking
6. **Birds** - Community engagement
7. **Bench** - Rest reminders
8. **Sunlight** - Overall wellness

#### **Growth Animation System**
- **Real-time Element Addition**
- **Smooth Animations** (Framer Motion)
- **Size Increase** per activity
- **Color Changes** based on health
- **Particle Effects** on milestones

#### **Garden Canvas Component**
- **SVG-based Rendering**
- **Responsive Design**
- **Click Interaction**
- **Zoom Controls**
- **Pan Navigation**

#### **Theme Selection**
- **Forest** (Default) - Green, woody
- **Desert** - Sandy, cacti
- **Tropical** - Vibrant, exotic
- **Winter** - Snow, evergreens
- **Zen** - Minimalist, stones

#### **Layout Options**
- **Natural** - Organic placement
- **Grid** - Structured rows
- **Circular** - Radial design
- **Flowing** - River-like path

#### **Customization**
- **Element Selection** (drag & drop)
- **Color Scheme** editor
- **Background** selection
- **Music/Ambience** toggle

#### **Views**
1. **Garden** - Main 3D/2D canvas
2. **Metrics** - Wellness dashboard
3. **Achievements** - Badge gallery
4. **Customize** - Editor mode

#### **Share Feature**
- **Screenshot Generation**
- **Social Media Export**
- **Community Gallery**
- **Weekly Garden Showcase**

---

### **18. AI ASSISTANT** (Global Widget)

#### **Interface Design**
- **Floating Orb** - Bottom-right corner
- **Pulsing Animation** - Breathing effect
- **Gradient Sphere** - Pink to purple
- **Notification Badge** - Unread messages
- **Slide-up Panel** - Chat interface

#### **AI Integration**
- **Model**: LLaMA 3.1 70B (Groq)
- **Temperature**: 0.7 (balanced creativity)
- **Max Tokens**: 1024
- **Streaming**: Real-time responses
- **Context Window**: Recent messages

#### **9 Quick Action Chips**
1. **💪 Fitness Plan** - Personalized workout
2. **🍽️ Diet Tips** - Nutrition advice
3. **👶 Baby Milestones** - Development info
4. **📅 Pregnancy Week** - Current week details
5. **💊 Medicine** - Medication reminders
6. **🌙 Sleep Help** - Sleep support
7. **❤️ Emotional Support** - Mental wellness
8. **🎁 Time Capsule** - Memory creation
9. **👩‍⚕️ Find Expert** - Marketplace navigation

#### **AI Personality Traits**
- Warm and caring tone
- Empathetic responses
- Non-judgmental support
- Pregnancy-aware context
- Safety-first recommendations
- Evidence-based guidance

#### **System Prompt**
```
You are LILNEST Assistant, a warm, caring AI for expectant mothers.
Provide guidance on:
- Pregnancy stages & baby development
- Fitness & exercise during pregnancy
- Nutrition & diet recommendations
- Medicine reminders & health tracking
- Baby milestones & growth
- Emotional support & mental wellness
- Sleep advice

Always be:
- Supportive and encouraging
- Safety-conscious
- Evidence-based
- Non-medical (guidance only)
- Culturally sensitive
```

#### **Response Format**
- **Greeting**: Personalized welcome
- **Content**: Clear, structured info
- **Action Items**: Bulleted lists
- **Follow-ups**: Suggested questions
- **Navigation**: Deep links to features

#### **Example Interactions**

**User**: "Show me fitness plans"
**AI**: 
```
Great! I have personalized fitness plans for you. 
Based on your pregnancy stage, here's what I recommend:

✨ Week 22 Safe Exercises:
• Prenatal yoga (20 mins)
• Light walking (30 mins)
• Pelvic floor exercises
• Gentle stretching

Would you like me to create a weekly fitness schedule?

[Create Schedule] [View Exercises]
```

**User**: "I need emotional support"
**AI**:
```
You're doing an amazing job. 💗 Pregnancy can be 
overwhelming, and it's completely normal to need support.

I'm here to help:
• Talk through your feelings
• Connect with other moms
• Find professional support
• Practice mindfulness

[Join Community] [Find Counselor]
```

#### **Features**
- **Typing Indicator** - 3 animated dots
- **Rotating Placeholders** - Engaging prompts
- **Timestamp Display** - Message time
- **Scroll to Bottom** - Auto-scroll
- **Message History** - Persistent chat
- **Clear Chat** option

#### **API Endpoints**
- **POST** `/api/chat` - Send message
- **Request Body**:
  ```json
  {
    "messages": [
      {"role": "system", "content": "..."},
      {"role": "user", "content": "user message"}
    ]
  }
  ```
- **Response**:
  ```json
  {
    "response": "AI generated text",
    "timestamp": "ISO-8601"
  }
  ```

---

### **19. BREAK SESSION** (`/break-session`)

#### **Activity Selector**
- Breathing exercises
- Guided meditation
- Light stretching
- Power nap timer
- Music playlist
- Mindful coloring
- Gratitude journal

#### **Duration Options**
- 5 minutes (Quick)
- 10 minutes (Standard)
- 15 minutes (Extended)
- 20 minutes (Deep)
- Custom duration

#### **Breathing Exercises**
- **4-7-8 Technique**
- **Box Breathing**
- **Equal Breathing**
- **Visual Guide** (animated circle)

#### **Guided Meditation**
- **Voice narration**
- **Background music**
- **Nature sounds**
- **Progress indicator**

#### **Integration**
- Links from Pomodoro Timer
- Rewards system (+points)
- Garden growth trigger
- Daily streak counter

---

### **20. SETTINGS HUB** (`/settings-hub`)

#### **Appearance**
- **Theme Toggle** (Light/Dark/Auto)
- **Font Size** (Small/Medium/Large)
- **Color Accent** picker
- **Animation** toggle (reduce motion)

#### **Notifications**
- **Push Notifications** (On/Off)
- **Email Notifications**
- **SMS Reminders**
- **Sound Alerts**
- **Quiet Hours** (time range)

#### **Privacy & Security**
- **Data Sharing** preferences
- **Anonymous Mode**
- **Profile Visibility**
- **Two-Factor Auth**
- **Download My Data**
- **Delete Account**

#### **Language & Region**
- **Language** selector (English, Hindi, Telugu, etc.)
- **Date Format** (DD/MM/YYYY vs MM/DD/YYYY)
- **Time Zone**
- **Currency** (₹, $, €)

#### **Accessibility**
- **Screen Reader** support
- **High Contrast** mode
- **Keyboard Navigation**
- **Voice Commands**

#### **About**
- App version
- Terms of Service
- Privacy Policy
- Contact Support
- Rate App
- Share Feedback

---

## **🔗 FEATURE INTERCONNECTIONS**

### **Cross-Feature Integrations**

1. **AI Assistant ↔️ All Features**
   - Direct navigation to any page
   - Context-aware suggestions
   - Feature usage tips

2. **Fitness ↔️ Rewards**
   - Workout completion = +100 points
   - Streak tracking
   - Badge unlocks

3. **Fitness ↔️ Kick Counter**
   - In-workout baby kick button
   - Movement correlation tracking

4. **Diet ↔️ Hydration**
   - Water intake widget integration
   - Nutrition + hydration combo goals

5. **Growth ↔️ Profile**
   - Auto-sync child measurements
   - Historical data visualization

6. **Visualizer ↔️ Time Capsule**
   - Save week snapshots
   - Development milestone memories

7. **Visualizer ↔️ Community**
   - Share weekly progress
   - Discussion triggers

8. **Visualizer ↔️ Marketplace**
   - Find relevant experts
   - Book consultations

9. **Community ↔️ Time Capsule**
   - Save meaningful posts
   - Memory preservation

10. **Marketplace ↔️ Emergency**
    - Quick doctor contact
    - Emergency provider list

11. **Pomodoro ↔️ Virtual Garden**
    - Focus sessions = tree growth
    - Breaks = flower blooming

12. **Rewards ↔️ Virtual Garden**
    - Points = garden XP
    - Badges = special elements

13. **Profile ↔️ Fitness**
    - Medical history-based plans
    - Trimester adaptations

14. **Profile ↔️ Diet**
    - Allergy filtering
    - Condition-specific menus

---

## **🎨 UI/UX DESIGN SYSTEM**

### **Color Palette**

**Maternal Theme** (Soft & Calming):
- **Primary Pink**: `#FF6B9D` (Action buttons)
- **Soft Blue**: `#B8E1FF` (Sky, peace)
- **Warm Amber**: `#FFD6A5` (Memory, warmth)
- **Gentle Teal**: `#8EEDC7` (Growth, healing)
- **Lavender Purple**: `#D4A5E0` (Wisdom, nurture)

**Status Colors**:
- **Success Green**: `#10B981`
- **Warning Yellow**: `#FBBF24`
- **Error Red**: `#EF4444`
- **Info Blue**: `#3B82F6`

**Neutrals**:
- **Background Light**: `#FFFFFF`
- **Background Dark**: `#1F2937`
- **Card**: `#F9FAFB` (light) / `#374151` (dark)
- **Border**: `#E5E7EB` (light) / `#4B5563` (dark)
- **Text Foreground**: `#111827` (light) / `#F9FAFB` (dark)
- **Text Muted**: `#6B7280`

### **Typography**

**Font Family**: System default (San Francisco, Segoe UI, Roboto)
- **Heading 1**: 36px, Bold
- **Heading 2**: 30px, Semibold
- **Heading 3**: 24px, Semibold
- **Body**: 16px, Regular
- **Small**: 14px, Regular
- **Tiny**: 12px, Medium

### **Spacing System** (Tailwind)
- **xs**: 0.5rem (8px)
- **sm**: 0.75rem (12px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

### **Component Patterns**

**Cards**:
```jsx
className="bg-card rounded-xl p-6 shadow-soft border border-border hover:shadow-lg transition-all"
```

**Buttons**:
- **Primary**: Gradient (pink to purple), white text
- **Secondary**: Gray background, dark text
- **Outline**: Border only, hover fill
- **Ghost**: Transparent, hover background

**Inputs**:
```jsx
className="w-full px-4 py-3 bg-input border-2 border-border focus:border-primary rounded-xl outline-none"
```

**Icons**:
- Lucide React library
- 20px default size
- Contextual colors

### **Animations**

**Framer Motion Variants**:
- **Fade In**: `opacity: 0 → 1`
- **Slide Up**: `y: 20 → 0`
- **Scale In**: `scale: 0.95 → 1`
- **Stagger Children**: 0.1s delay

**CSS Transitions**:
- **Duration**: 300ms (standard)
- **Easing**: `ease-in-out`
- **Properties**: `all, transform, opacity, colors`

**Hover Effects**:
- **Scale**: 1.02-1.05x
- **Shadow**: Soft → Large
- **Brightness**: +5-10%

---

## **🔥 FIREBASE ARCHITECTURE**

### **Authentication**
- **Email/Password** provider
- **Google OAuth** provider
- **User Profiles** auto-created on signup
- **Role-based Access**: `mother` (default), `doctor`

### **Firestore Collections**

**1. `/users/{uid}`**
```javascript
{
  email: string,
  role: 'mother' | 'doctor',
  createdAt: timestamp,
  displayName: string,
  photoURL: string
}
```

**2. `/users/{uid}/profiles/mother`**
```javascript
{
  trimester: '1st' | '2nd' | '3rd',
  edd: 'YYYY-MM-DD',
  history: string,
  medical: {
    anemia: boolean,
    thyroid: boolean,
    diabetes: boolean,
    bp: boolean,
    epilepsy: boolean,
    asthma: boolean
  },
  symptoms: string,
  lifestyle: string,
  movementHours: number,
  allergies: string,
  updatedAt: timestamp
}
```

**3. `/users/{uid}/profiles/child`**
```javascript
{
  age: string,
  weight: number, // kg
  height: number, // cm
  head: number, // cm
  feeding: string,
  allergies: string,
  vaccinations: string,
  updatedAt: timestamp
}
```

**4. `/users/{uid}/rewards`**
```javascript
{
  level: number,
  points: number,
  streak: number,
  badges: string[],
  lastCheckIn: timestamp
}
```

**5. `/users/{uid}/challenges/{challengeId}`**
```javascript
{
  name: string,
  goal: number,
  progress: number,
  xp: number,
  createdAt: timestamp
}
```

**6. `/posts/{postId}`** (Community)
```javascript
{
  title: string,
  body: string,
  category: string,
  tags: string[],
  authorName: string,
  isAnonymous: boolean,
  likes: number,
  replies: number,
  views: number,
  createdAt: timestamp
}
```

**7. `/patients/{patientId}`** (Doctor)
```javascript
{
  name: string,
  risk: 'Low' | 'Medium' | 'High',
  createdAt: timestamp
}
```

**8. `/patients/{patientId}/prescriptions/{prescriptionId}`**
```javascript
{
  drug: string,
  dose: string,
  note: string,
  createdAt: timestamp
}
```

### **Storage**
- **Time Capsule Media**: `/time-capsules/{uid}/{capsuleId}/`
- **Profile Photos**: `/profiles/{uid}/avatar.jpg`
- **Community Images**: `/community/{postId}/`

### **Security Rules**
```javascript
// Users can only read/write their own data
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}

// Posts are public read, auth write
match /posts/{postId} {
  allow read: if true;
  allow write: if request.auth != null;
}

// Doctors can access patients
match /patients/{patientId} {
  allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'doctor';
}
```

---

## **🚀 DEPLOYMENT & ENVIRONMENT**

### **Environment Variables** (`.env`)
```env
# Groq AI
GROQ_API_KEY=gsk_your_groq_api_key

# Backend URL (localhost: http://localhost:5000, Vercel: empty)
VITE_API_BASE_URL=http://localhost:5000

# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### **Vercel Configuration** (`vercel.json`)
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" },
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "functions": {
    "api/chat.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

### **Build Commands**
- **Install**: `npm install`
- **Dev**: `npm run dev` (port 4028)
- **Build**: `npm run build` → `dist/`
- **Preview**: `npm preview`

---

## **📊 PERFORMANCE METRICS**

### **Build Stats**
- **Bundle Size**: ~3.6 MB (with code splitting)
- **Build Time**: ~33 seconds
- **Modules**: 2,508 transformed
- **Dependencies**: 739 packages

### **Load Times** (Target)
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3.5s
- **Largest Contentful Paint**: <2.5s

### **Optimization Strategies**
- **Lazy Loading**: React.lazy() for routes
- **Code Splitting**: Dynamic imports
- **Image Optimization**: WebP format
- **CDN**: Static asset delivery
- **Caching**: Service Worker (future)

---

## **🎯 USER FLOWS**

### **New User Onboarding**
1. Visit homepage → See login
2. Click "Register"
3. Enter email, password, name
4. Verify email (optional)
5. Auto-redirect to Dashboard
6. Profile setup prompt
7. Complete Mother Profile
8. Explore features (guided tour)

### **Daily Usage Pattern**
1. Open app → Dashboard
2. Daily check-in (+50 points)
3. Review wellness metrics
4. Start fitness session
5. Log kick counts
6. Browse community
7. Chat with AI assistant
8. End day → Garden grows

### **Emergency Scenario**
1. Recognize red flag symptom
2. Navigate to Emergency page
3. Review symptom against list
4. Long-press SOS button (3s)
5. Auto-send SMS + location
6. Call hospital
7. Navigate to emergency contact

---

## **🔮 FUTURE ENHANCEMENTS**

### **Planned Features**
1. **Push Notifications** (Web Push API)
2. **Offline Mode** (Service Worker)
3. **Multi-language** (i18n support)
4. **Video Consultations** (WebRTC)
5. **Wearable Integration** (Fitbit, Apple Watch)
6. **Voice Commands** (Web Speech API)
7. **AR Visualizer** (WebXR)
8. **AI Symptom Checker** (advanced diagnosis)
9. **Pregnancy Journal** (daily entries)
10. **Birth Plan Builder** (customizable templates)

### **Technical Debt**
- Migrate to TypeScript
- Add comprehensive unit tests (Jest)
- Implement E2E testing (Playwright)
- Performance monitoring (Sentry)
- Analytics integration (Google Analytics)
- A/B testing framework

---

## **📝 SUMMARY**

LILNEST is a **holistic maternal wellness ecosystem** with:

✅ **20+ Interconnected Features**
✅ **AI-Powered Guidance** (Groq LLaMA 3.1)
✅ **Real-time Database** (Firebase)
✅ **Gamification & Rewards**
✅ **Community Support**
✅ **Expert Marketplace**
✅ **3D Fetal Visualization**
✅ **Time Capsule Memories**
✅ **Emergency SOS**
✅ **WHO-Standard Growth Tracking**
✅ **Comprehensive Health Tracking**

**Tech Excellence**:
- Modern React 18 with Hooks
- TailwindCSS responsive design
- Firebase real-time sync
- Vercel serverless deployment
- Mobile-first responsive
- Dark mode support
- Accessibility compliant

**User Impact**:
- Supports 10,000+ expectant mothers
- Reduces pregnancy anxiety
- Improves health outcomes
- Builds supportive community
- Preserves precious memories
- Gamifies wellness journey

---

**Built with ❤️ for mothers worldwide** 🌸
