# StockViewAI (NEO Trading Terminal)

## 🎯 Product Moto & Vision
> **"Sub-Second Institutional Market Intelligence without the Legacy Clutter."**

StockViewAI (NEO) is a high-performance, real-time trading analytics terminal designed to strip away the noise of legacy financial tools. It brings smart money flow, institutional volume profile algorithms, and sectoral dynamics directly to active traders through a sub-second, ultra-responsive dark interface.

---

## ✨ Features

* **Real-Time Sectoral Heatmaps:** Dynamic performance tracking across major market indices (NIFTY 50, NIFTY BANK) and individual sector rotation.
* **Institutional Market Breadth:** Custom algorithms that highlight institutional accumulation/distribution and volume profile signals.
* **Role-Based Access Control (RBAC):** Native `ADMIN` vs `USER` authorization layer powered by NextAuth.js JWT callbacks to manage dashboard permissions.
* **Bring Your Own Key (BYOK) AI Engine:** Client-side Gemini API Key integration encrypted end-to-end (AES-256-CBC) allowing users to run custom technical market queries.
* **Admin Terminal:** Secured admin interface featuring waitlist monitoring, lead filtering, and dynamic CSV export workflows.
* **Zero-Noise UI/UX:** High-contrast, multi-screen-optimized dark theme engineered for speed during high-volatility trading hours.

---

## 🏗️ Technical Architecture & Methodology

StockViewAI follows modern Server-First Next.js paradigms to maximize speed, security, and scalability.

1. **Authentication & Session Persistence:** 
   * Custom NextAuth.js configuration mapped to MongoDBAtlas via Mongoose.
   * `jwt` and `session` callbacks dynamically fetch and append user roles (`ADMIN`/`USER`) on authentication token creation.
2. **Security & Data Privacy:**
   * AES-256-CBC encryption for storing user-provided Gemini API Keys in MongoDB (`lib/encryption.ts`).
   * API endpoints verified using server-side session checks (`auth()`) to block unauthorized operations.
3. **Optimized API Strategy:**
   * Next.js Server Actions and API Routes decouple internal MongoDB reads/writes from external client calls.
   * Minimal client-side JS overhead ensuring sub-second UI renders.

---

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling & UI:** Tailwind CSS, Lucide React / Custom Icons
* **Authentication:** NextAuth.js (v5 / App Router Handlers)
* **Database & ORM:** MongoDB Atlas, Mongoose
* **AI Integration:** `@google/genai` (Gemini API 2.5 Flash)
* **Security:** Node.js `crypto` (AES-256-CBC)
* **Deployment & CI/CD:** Vercel (Multi-environment setups: Beta & Live)

---

## 📁 Project Structure

```text
neo-trading-terminal/
├── app/
│   ├── api/                 # NextAuth & API route handlers
│   ├── globals.css          # Base CSS & Tailwind styling 
│   ├── layout.tsx           # Root layout with AuthProvider & LayoutWrapper
│   └── page.tsx             # Main router logic (Admin/Dashboard/Landing)
├── components/
│   ├── admin/               # Admin panel & monitoring components
│   ├── dashboard/           # Main trading terminal UI components
│   ├── landing/             # Marketing & Landing page components
│   ├── login/               # Authentication views & login modals
│   ├── mvp/                 # MVP specific tools & user settings
│   ├── AuthForm.tsx         # Auth form handling
│   ├── AuthModel.tsx        # Auth modal container
│   ├── AuthProvider.tsx     # Session provider wrapper
│   ├── LayoutWrapper.tsx    # App UI wrapper
│   └── providers.tsx        # Global client providers
├── lib/
│   ├── auth.ts              # NextAuth configuration & callbacks
│   ├── dbConnect.ts         # MongoDB Atlas connection helper
│   ├── encryption.ts        # AES-256-CBC encryption/decryption
│   ├── firebase.ts          # Firebase integration setup
│   └── mock-data.ts         # Mock trading & market breadth data
├── models/
│   ├── saveapi.ts           # Saved user API keys schema
│   ├── user.ts              # User schema with RBAC roles
│   └── waitlist.ts          # Early access waitlist schema
├── public/                  # Static assets & icons
├── .env.local               # Environment variables
├── GEMINI.md                # Project context guide
└── package.json