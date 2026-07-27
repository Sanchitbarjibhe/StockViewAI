"use client";

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import LandingPage from '@/components/landing/LandingPage';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // LocalStorage किंवा API मधून लॉगइन स्टेटस चेक करा
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;


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
      <LandingPage />
  );
}
