import type { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider";
import LayoutWrapper from "@/components/LayoutWrapper";
import 'app/globals.css'

const appSource = process.env.NEXT_PUBLIC_APP_SOURCE;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const isLive = appSource === 'LIVE';

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: 'StockViewAI - Real-Time AI Market Analytics',
  description: 'AI-assisted market analytics, sector momentum, and trading insights in one terminal.',
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  robots: isLive
    ? { index: true, follow: true }
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
          {/* <Analytics /> */}
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}