import type { Metadata } from "next";
import { Head, Html, Main, NextScript } from "next/document";
import '../app/style.css'

const appSource = process.env.NEXT_PUBLIC_APP_SOURCE;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const isLive = appSource === 'LIVE';

// ✅ SEO Metadata Config
export const metadata: Metadata = {
  metadataBase: new URL('https://stockviewapp.vercel.app'),
  title: 'StockViewAI – AI Trading Terminal & Real-Time Market Analytics',
  description:
    'StockViewAI provides sub-second real-time market analytics, AI-powered stock screeners, institutional volume profiles, and NSE sectoral heatmaps for active traders.',
  keywords: [
    'StockViewAI',
    'AI trading terminal',
    'stock market screener India',
    'real time stock charts',
    'smart money flow tracker',
    'NSE sectoral heatmap',
    'option chain PCR',
    'AI trading terminal',
    'institutional grade trading tools',
    'stock market screener India',
    'algo trading software',
    'AI powered stock analysis',
    'real time stock charts',
    'portfolio analytics tool',
    'equity research platform',
    'machine learning stock predictions',
    'best stock screener India',
    'AI trading terminal for retail investors',
    'StockViewAI',
  ],
  authors: [{ name: 'StockViewAI Team' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://stockviewapp.vercel.app',
  },
  openGraph: {
    title: 'StockViewAI – Next-Gen Market Intelligence Terminal',
    description:
      'Sub-second institutional market signals powered by AI architecture.',
    url: 'https://stockviewapp.vercel.app',
    siteName: 'StockViewAI',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function Home() {
  const betaLink = 'https://stockviewai-beta.vercel.app';

  return (
    <main className="page-container">
      {/* Background Decorative Glow */}
      <div className="bg-glow" />

      {/* Header / Logo Section */}
      <header className="header-wrapper">
        <div className="brand-box">
          <div className="logo-icon">S</div>
          <span className="logo-text">
            StockView<span className="highlight-cyan">AI</span>
          </span>
        </div>

        <span className="badge-beta">Beta Live</span>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="tag-badge">
          <span className="dot-ping" />
          <span>Institutional Market Analytics & Signal Terminal</span>
        </div>

        <h1 className="hero-title">
          Next-Gen AI Terminal for <br />
          <span className="title-gradient">Active Market Traders</span>
        </h1>

        <p className="hero-desc">
          Access sub-second NSE sectoral heatmaps, Smart Money volume profile trackers, Option Chain PCR analysis, and automated market signals.
        </p>

        {/* CTA Button */}
        <div>
          <a
            href={betaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta"
          >
            <span>Try Beta Version</span>
            <svg
              style={{ width: '20px', height: '20px' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Feature Highlights Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-heading">Sub-Second Tape</div>
            <p className="feature-text">Real-time market analytics and smart money flow detection.</p>
          </div>
          <div className="feature-card">
            <div className="feature-heading">Sectoral Heatmaps</div>
            <p className="feature-text">Track NSE sector strength and relative momentum live.</p>
          </div>
          <div className="feature-card">
            <div className="feature-heading">AI Signals</div>
            <p className="feature-text">Institutional volume profile and option chain PCR insights.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-wrapper">
        <p>© {new Date().getFullYear()} StockViewAI. All rights reserved.</p>
        <p>Designed for NSE NIFTY & BankNifty Traders</p>
      </footer>
    </main>
  );
}