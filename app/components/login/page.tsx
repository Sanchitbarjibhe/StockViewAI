'use client';

import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import AuthForm from '@/components/AuthForm';

export default function Login() {
    const [selectedBroker, setSelectedBroker] = useState<'zerodha' | 'angelone' | 'fyers'>('zerodha');
    const [authTab, setAuthTab] = useState<'standard' | 'broker'>('standard');

    const handleBrokerLogin = () => {
        console.log(`Redirecting to ${selectedBroker} OAuth...`);
        // Broker Connect URL Redirect
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
            <div
                style={{
                    backgroundColor: '#0D1117',
                    border: '1px solid #10B981',
                    borderRadius: '16px',
                    width: '100%',
                    maxWidth: '420px',
                    padding: '24px',
                    boxShadow: '0 20px 50px rgba(16, 185, 129, 0.15)',
                    position: 'relative'
                }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                        <span style={{ fontSize: '18px', fontWeight: '800', color: '#10B981', letterSpacing: '0.5px' }}>
                            NEO<span style={{ color: '#FFF' }}>TERMINAL</span>
                        </span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                        Sign in or create your account to access the trading dashboard
                    </p>
                </div>

                {/* Login Method Tabs */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '4px',
                        backgroundColor: '#161B22',
                        padding: '4px',
                        borderRadius: '8px',
                        marginBottom: '20px'
                    }}
                >
                    <button
                        onClick={() => setAuthTab('standard')}
                        className={`transition-colors duration-200 ${authTab === 'standard' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                        style={{
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '700',
                            cursor: 'pointer'
                        }}
                    >
                        Standard / Google
                    </button>
                    <button
                        onClick={() => setAuthTab('broker')}
                        className={`transition-colors duration-200 ${authTab === 'broker' ? 'bg-slate-700 text-emerald-400' : 'text-slate-400 hover:bg-slate-800'}`}
                        style={{
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '700',
                            cursor: 'pointer'
                        }}
                    >
                        ⚡ Broker OAuth
                    </button>
                </div>

                {/* Tab 1: Standard & Google Login (delegated to AuthForm) */}
                {authTab === 'standard' && (
                    <AuthForm redirectUrl="/" />
                )}

                {/* Tab 2: Broker OAuth Login */}
                {authTab === 'broker' && (
                    <div className="flex flex-col gap-3">
                        <p className="text-xs text-slate-400 m-0">
                            Connect your trading broker account for real-time live portfolio tracking & executions:
                        </p>

                        <div className="flex flex-col gap-2">
                            {[{ id: 'zerodha', name: 'Zerodha Kite' }, { id: 'angelone', name: 'Angel One' }, { id: 'fyers', name: 'Fyers' }].map((b) => (
                                <button key={b.id} onClick={() => setSelectedBroker(b.id as any)} className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${selectedBroker === b.id ? 'bg-slate-800 border-emerald-500' : 'border-slate-700 hover:bg-slate-800'}`}>
                                    <span className="text-sm font-bold text-white">{b.name}</span>
                                    {selectedBroker === b.id && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                                </button>
                            ))}
                        </div>

                        <button onClick={handleBrokerLogin} className="w-full bg-emerald-500 text-slate-950 font-bold text-sm py-2.5 px-4 rounded-lg hover:bg-emerald-400 transition-colors duration-200 mt-2">
                            CONNECT WITH {selectedBroker.toUpperCase()}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
