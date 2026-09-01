import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Pricing from './Pricing';
import Footer from './Footer';
import ProductPreview from './ProductPreview';
import MarketTicker from './MarketTicker';
import AuthModal from '@/components/AuthModal';

export default function LandingPage() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white" style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh' }}>
            {/* 1. Header Navigation */}
            <Header onOpenAuth={() => setIsAuthOpen(true)} />
            <MarketTicker />
            <ProductPreview />
            <Hero />
            {/* 2. Hero Section with Lead Capture Form */}
            {/* 3. Features Section */}
            <Features />
            {/* 4. Pricing Plans */}
            {/* <Pricing /> */}
            {/* Footer */}
            <Footer />

            {/* Auth Modal */}
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </div>
    );
}