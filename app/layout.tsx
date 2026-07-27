import type { Metadata } from "next";
import "./globals.css"; // 👈 ही Import लाईन असणे अत्यंत आवश्यक आहे!
import AuthProvider from "./components/AuthProvider";

export const metadata: Metadata = {
  title: "NEO AI Trading Terminal",
  description: "Instant AI Insights for Traders",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}