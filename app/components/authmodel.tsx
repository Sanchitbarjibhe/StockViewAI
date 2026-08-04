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
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(7, 10, 15, 0.85)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
            }}
        >
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
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#64748B',
                        cursor: 'pointer'
                    }}
                >
                    <X style={{ width: '18px', height: '18px' }} />
                </button>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                        <span style={{ fontSize: '18px', fontWeight: '800', color: '#FFF', letterSpacing: '0.5px' }}>
                            StockView<span style={{ color: '#10B981' }}>AI</span>
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
                        style={{
                            backgroundColor: authTab === 'standard' ? '#1E293B' : 'transparent',
                            color: authTab === 'standard' ? '#FFF' : '#64748B',
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
                        style={{
                            backgroundColor: authTab === 'broker' ? '#1E293B' : 'transparent',
                            color: authTab === 'broker' ? '#10B981' : '#64748B',
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
                    <AuthForm onSuccess={onSuccessLogin} onClose={onClose} redirectUrl="/" />
                )}

                {/* Tab 2: Broker OAuth Login */}
                {authTab === 'broker' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <p style={{ fontSize: '11px', color: '#94A3B8', margin: 0 }}>
                            Connect your trading broker account for real-time live portfolio tracking & executions:
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                { id: 'zerodha', name: 'Zerodha Kite', color: '#FF5722' },
                                { id: 'angelone', name: 'Angel One', color: '#0052FF' },
                                { id: 'fyers', name: 'Fyers', color: '#2B6CB0' }
                            ].map((b) => (
                                <button
                                    key={b.id}
                                    onClick={() => setSelectedBroker(b.id as any)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        backgroundColor: selectedBroker === b.id ? '#161B22' : 'transparent',
                                        border: `1px solid ${selectedBroker === b.id ? '#10B981' : '#30363D'}`,
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        color: '#FFF',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <span style={{ fontSize: '12px', fontWeight: '700' }}>{b.name}</span>
                                    {selectedBroker === b.id && <ShieldCheck style={{ width: '16px', height: '16px', color: '#10B981' }} />}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleBrokerLogin}
                            style={{
                                backgroundColor: '#10B981',
                                color: '#070A0F',
                                fontWeight: '800',
                                fontSize: '12px',
                                padding: '10px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                marginTop: '8px'
                            }}
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