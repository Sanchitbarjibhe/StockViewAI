import type { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider";
import { Analytics } from "@vercel/analytics/next";
import '@/app/globals.css'

const appSource = process.env.NEXT_PUBLIC_APP_SOURCE;
// const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stockviewai-beta.vercel.app';
const isBeta = appSource === 'BETA';

export const metadata: Metadata = {
  // metadataBase: siteUrl ? new URL(siteUrl) : new URL('https://stockviewai-beta.vercel.app'),
  metadataBase: new URL(siteUrl),
  title: 'StockViewAI – AI Trading Terminal & Real-Time Market Analytics',
  description:
    'Sub-second real-time market analytics, AI-powered stock screeners, institutional volume profile algorithms, and NSE sectoral heatmaps for active traders in India.',
  keywords: [
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
  authors: [{ name: 'StockViewAI' }],
  creator: 'StockViewAI',
  publisher: 'StockViewAI',
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    title: 'StockViewAI – AI-Powered Institutional Market Analytics',
    description:
      'Track live smart money movements, option chain PCR, and AI stock predictions with a high-performance dark-themed terminal.',
    url: siteUrl,
    siteName: 'StockViewAI',
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'StockViewAI Terminal Dashboard Preview',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StockViewAI – Next-Gen AI Market Analytics',
    description:
      'Sub-second AI market analysis and institutional-grade trading tools for retail investors.',
    creator: '@stockview_7',
    images: [`${siteUrl}/opengraph-image`],
  },
  robots: isBeta
    ? { index: false, follow: false }
    : {
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
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <AuthProvider>
          <Analytics />
          <main className="flex-1 w-full relative z-10 min-h-screen flex-col justify-between scroll-area no-scrollbar">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}