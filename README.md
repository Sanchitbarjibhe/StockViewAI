# 📈 Neo Trading Terminal

A high-performance, real-time Institutional Market Terminal built for the Indian Stock Market (NSE/BSE). Built with Next.js 16, TypeScript, Tailwind CSS, and integrated with **Google Gemini 2.5 Flash** for instant market bias analysis and breakout predictions.

---

## 🔥 Features

* **⚡ Real-Time Major Indices:** Live tracking for NIFTY 50, NIFTY BANK, and NIFTY FINANCIAL SERVICES.
* **📊 Dynamic Sectoral Heatmap:** Real-time performance tracking of top 10 NSE sectors (NIFTY IT, AUTO, METAL, PHARMA, FMCG, REALTY, etc.).
* **🤖 Gemini AI Market Bias:** Powered by `gemini-2.5-flash` to deliver concise, institutional-grade market summaries and conclusions.
* **🔥 Live Volume Gainers & Spikes:** Real-time detection of institutional volume surges and turnover spikes.
* **🚀 Top Gainers & Losers:** Instant view of overall market momentum drivers.
* **📰 Live Impact & Breakout News:** RSS-driven breaking news feed with automated sentiment and impact classification (Bullish, Bearish, Volatile).
* **🪙 Commodity Tracking:** Live NSE Commodities index & Gold price quotes.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + Custom Dark Glassmorphism Theme
* **AI Integration:** Google Gemini REST API (`gemini-2.5-flash`)
* **Data Sources:** Direct NSE Live Endpoints & Google News RSS Parser
* **Icons:** Lucide React

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js (v18+) installed on your machine.

### 2. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/neo-trading-terminal.git](https://github.com/YOUR_USERNAME/neo-trading-terminal.git)

cd neo-trading-terminal
3. Install Dependencies
Bash
npm install
4. Environment Setup
Create a .env.local file in the root directory and add your Google Gemini API Key:

Code snippet
GEMINI_API_KEY=your_gemini_api_key_here
5. Run Development Server
Bash
npm run dev
Open http://localhost:3000 in your browser to view the terminal.

📂 Project Structure
Plaintext
src/
 ├── app/
 │    ├── api/
 │    │    ├── ai-conclusion/   # Gemini 2.5 Flash REST API Route
 │    │    ├── market-data/     # NSE Parallel Live Data Route
 │    │    └── news/            # Live RSS News & Dynamic Sentiment Classifier Route
 │    ├── page.tsx              # Main Terminal UI Component
 │    └── layout.tsx            # Global App Layout
 └── ...
🤝 Contributing
Feel free to open issues or submit pull requests on the dev branch for any new features or enhancements!

Developed with 💻 & ☕ by Sanchit Barjibhe