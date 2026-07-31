"use client";

import { useSession } from 'next-auth/react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import LandingPage from '@/components/landing/LandingPage';
import MvpPage from './components/mvp/Mvppage';
import Login from './components/login/page';


export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="home-shell">
        <div className="home-content">
          <div className="home-glow" />
          <div className="home-scroll-area no-scrollbar">
            <DashboardLayout />
          </div>
        </div>
      </div>
    );
  }

  // status === 'unauthenticated'
  return <LandingPage />;
}
