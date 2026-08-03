import "./globals.css";
import type { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider";
import LayoutWrapper from "./components/LayoutWrapper";
// import { Space_Grotesk, IBM_Plex_Mono, Inter } from "next/font/google";
// import { Analytics } from "@vercel/analytics/next"


// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// const spaceGrotesk = Space_Grotesk({
//   subsets: ["latin"],
//   variable: "--font-display",
// });

// const ibmPlexMono = IBM_Plex_Mono({
//   weight: ["400", "500", "600", "700"],
//   subsets: ["latin"],
//   variable: "--font-mono",
// });

// export const metadata: Metadata = {
//   title: "NEO AI Trading Terminal",
//   description: "Instant AI Insights for Traders",
// };



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