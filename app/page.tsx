// "use client";

// import { useSession } from 'next-auth/react';
// import DashboardLayout from '@/components/dashboard/DashboardLayout';
// import LandingPage from '@/components/landing/LandingPage';

// export default function Home() {
//   const { data: session, status } = useSession();

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   const isLoggedIn = !!session;

//   return (
//     // Main shell for the dashboard page layout.
//     isLoggedIn ?
//       <div className="home-shell">
//         <div className="home-content">
//           {/* Decorative background glow visible behind the dashboard. */}
//           <div className="home-glow" />

//           {/* Scrollable content container for the dashboard sections. */}
//           <div className="home-scroll-area no-scrollbar">
//             <DashboardLayout />
//           </div>
//         </div>
//       </div>
//       :
//       <LandingPage />
//   );
// }


"use client";

import LandingPage from '@/components/landing/LandingPage';
import MvpPage from './components/mvp/Mvppage';
import Login from './components/login/page';


export default function Home() {
  // const { data: session, status } = useSession();

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
            {/* <DashboardLayout /> */}
          </div>
        </div>
      </div>
    );
  }

  // status === 'unauthenticated'
  return <LandingPage />;
}
