import type { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Analytics } from "@vercel/analytics/next";
import '@/app/globals.css'

const appSource = process.env.NEXT_PUBLIC_APP_SOURCE;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const isLive = appSource === 'LIVE';

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : new URL('https://stockviewapp.vercel.app'),
  title: 'StockViewAI – AI Trading Terminal & Real-Time Market Analytics',
  description:
    'StockViewAI provides sub-second real-time market analytics, AI-powered stock screeners, institutional volume profiles, and NSE sectoral heatmaps for active traders.',
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
  authors: [{ name: 'StockViewAI Team' }],
  creator: 'StockViewAI',
  publisher: 'StockViewAI',
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    title: 'StockViewAI – AI-Powered Institutional Market Analytics',
    description:
      'Track smart money flow, real-time sectoral heatmaps, and machine learning stock predictions with sub-second performance.',
    url: 'https://stockviewapp.vercel.app',
    siteName: 'StockViewAI',
    images: [
      {
        url: 'https://stockviewapp.vercel.app/og-image.png',
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
      'Institutional-grade AI trading terminal designed for active retail traders in India.',
    creator: '@stockview_7',
    images: ['https://stockviewapp.vercel.app/og-image.png'],
  },
  robots: isLive
    ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } }
    : { index: false, follow: false },
  ...(isLive && siteUrl
    ? { alternates: { canonical: siteUrl } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LayoutWrapper>
            <Analytics />
            {children}
          </LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}