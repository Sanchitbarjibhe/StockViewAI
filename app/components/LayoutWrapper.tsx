'use client';

import { ReactNode } from 'react';

interface LayoutWrapperProps {
    children: ReactNode;
    className?: string;
}

export default function LayoutWrapper({ children, className = '' }: LayoutWrapperProps) {
    return (
        <div className="min-h-screen w-full bg-[#020617] text-slate-100 font-sans relative overflow-x-hidden selection:bg-emerald-500 selection:text-black">
            {/* Background Subtle Gradient & Glow */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.1),rgba(255,255,255,0))] pointer-events-none z-0" />

            {/* Background Grid Accent */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

            {/* Main Container */}
            <main className={`relative z-10 w-full min-h-screen flex flex-col justify-between ${className}`}>
                {children}
            </main>
        </div>
    );
}