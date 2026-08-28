'use client';

import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import AuthForm from './AuthForm';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccessLogin?: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccessLogin }) => {
    const [selectedBroker, setSelectedBroker] = useState<'zerodha' | 'angelone' | 'fyers'>('zerodha');
    const [authTab, setAuthTab] = useState<'standard' | 'broker'>('standard');

    if (!isOpen) return null;

    // form handling delegated to AuthForm

    const handleBrokerLogin = () => {
        console.log(`Redirecting to ${selectedBroker} OAuth...`);
        // Broker Connect URL Redirect
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center w-screen h-screen bg-slate-950/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md p-6 bg-[#0D1117] border border-emerald-500 rounded-2xl shadow-2xl shadow-emerald-500/10">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 transition-colors cursor-pointer hover:text-white"
                >
                    <X className="w-[18px] h-[18px]" />
                </button>

                {/* Header */}
                <div className="mb-5 text-center">
                    <div className="inline-flex items-center gap-1.5 mb-1.5">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-lg font-extrabold tracking-wider text-white">
                            StockView<span className="text-emerald-500">AI</span>
                        </span>
                    </div>
                    <p className="m-0 text-xs text-slate-500">
                        Sign in or create your account to access the trading dashboard
                    </p>
                </div>

                {/* Login Method Tabs */}
                <div className="grid grid-cols-2 gap-1 p-1 mb-5 rounded-lg bg-slate-800/50">
                    <button
                        onClick={() => setAuthTab('standard')}
                        className={`py-1.5 px-3 rounded-md text-xs font-bold cursor-pointer transition-colors ${authTab === 'standard' ? 'bg-slate-700 text-white' : 'bg-transparent text-slate-500 hover:text-slate-300'
                            }`}
                    >
                        Standard / Google
                    </button>
                    <button
                        onClick={() => setAuthTab('broker')}
                        className={`py-1.5 px-3 rounded-md text-xs font-bold cursor-pointer transition-colors ${authTab === 'broker' ? 'bg-slate-700 text-emerald-400' : 'bg-transparent text-slate-500 hover:text-emerald-500'
                            }`}
                    >
                        ⚡ Broker OAuth
                    </button>
                </div>

                {/* Tab 1: Standard & Google Login (delegated to AuthForm) */}
                {authTab === 'standard' && (
                    <AuthForm onSuccess={onSuccessLogin} onClose={onClose} redirectUrl="/" />
                )}

                {/* Tab 2: Broker OAuth Login */}
                {authTab === 'broker' && (
                    <div className="flex flex-col gap-3">
                        <p className="m-0 text-xs text-slate-300">
                            Connect your trading broker account for real-time live portfolio tracking & executions:
                        </p>

                        <div className="flex flex-col gap-2">
                            {[
                                { id: 'zerodha', name: 'Zerodha Kite', color: '#FF5722' },
                                { id: 'angelone', name: 'Angel One', color: '#0052FF' },
                                { id: 'fyers', name: 'Fyers', color: '#2B6CB0' }
                            ].map((b) => (
                                <button
                                    key={b.id}
                                    onClick={() => setSelectedBroker(b.id as any)}
                                    className={`flex items-center justify-between p-2.5 px-3.5 rounded-lg text-white cursor-pointer transition-all ${selectedBroker === b.id ? 'bg-slate-800 border-emerald-500' : 'bg-transparent border-slate-700 hover:border-slate-500'
                                        }`}
                                >
                                    <span className="text-sm font-bold">{b.name}</span>
                                    {selectedBroker === b.id && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleBrokerLogin}
                            className="py-2.5 mt-2 text-sm font-extrabold text-slate-950 bg-emerald-500 rounded-lg cursor-pointer hover:bg-emerald-400 transition-colors"
                        >
                            CONNECT WITH {selectedBroker.toUpperCase()}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthModal;