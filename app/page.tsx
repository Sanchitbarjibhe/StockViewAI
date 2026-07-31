"use client";

import { useSession } from 'next-auth/react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import LandingPage from '@/components/landing/LandingPage';
import MvpPage from './components/mvp/Mvppage';


export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const isLoggedIn = !!session;

  return (
    // Main shell for the dashboard page layout.
    isLoggedIn ?
      <div className="home-shell">
        <div className="home-content">
          {/* Decorative background glow visible behind the dashboard. */}
          <div className="home-glow" />

          {/* Scrollable content container for the dashboard sections. */}
          <div className="home-scroll-area no-scrollbar">
            <DashboardLayout />
          </div>
        </div>
      </div>
      :
      <><LandingPage /> <MvpPage /></>
  );
}
