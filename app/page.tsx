"use client";

import { useSession } from 'next-auth/react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import LandingPage from '@/components/landing/LandingPage';
import AdminDashboard from '@/components/admin/AdminDashboard';


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
    const userRole = (session?.user as any)?.role;
    return (
      <div className="home-shell">
        <div className="home-content">
          <div className="home-glow" />
          <div className="home-scroll-area no-scrollbar">
            {userRole === 'ADMIN' ? <AdminDashboard /> : <DashboardLayout />}
          </div>
        </div>
      </div>
    );
  }
  return <LandingPage />;
}
