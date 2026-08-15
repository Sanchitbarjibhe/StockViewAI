import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

interface HeaderProps {
    onOpenAuth: () => void;
}

export default function Header({ onOpenAuth }: HeaderProps) {
    return (
        <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto border-b border-slate-800" style={{ borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
            <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E', boxShadow: '0 0 10px #22C55E' }} />
                    <h1 style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '0.6px', margin: 0, color: '#F8FAFC' }}>
                        StockView<span style={{ color: '#22C55E' }}>AI</span>
                    </h1>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Features</a>
                <a href="#pricing" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Pricing</a>
                {/* <button
                    type="button"
                    onClick={onOpenAuth}
                    style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
                >
                    Login
                </button> */}
            </div>
        </nav>
    );
}