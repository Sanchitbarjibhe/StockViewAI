'use client';

import React, { useEffect, useState } from 'react';
import { X, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccessLogin?: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccessLogin }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedBroker, setSelectedBroker] = useState<'zerodha' | 'angelone' | 'fyers'>('zerodha');
    const [authTab, setAuthTab] = useState<'standard' | 'broker'>('standard');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (!isOpen) {
            setEmail('');
            setPassword('');
            setMessage('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedEmail = email.trim().toLowerCase();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            setMessageType('error');
            setMessage('Please enter both email and password.');
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('neoUsers') || '[]');

        if (isSignup) {
            const userExists = storedUsers.some((user: { email: string }) => user.email === trimmedEmail);
            if (userExists) {
                setMessageType('error');
                setMessage('This email is already registered. Please log in instead.');
                return;
            }

            storedUsers.push({ email: trimmedEmail, password: trimmedPassword });
            localStorage.setItem('neoUsers', JSON.stringify(storedUsers));
            setMessageType('success');
            setMessage('Account created successfully.');
            if (onSuccessLogin) onSuccessLogin(trimmedEmail);
            onClose();
            return;
        }

        const matchedUser = storedUsers.find(
            (user: { email: string; password: string }) => user.email === trimmedEmail && user.password === trimmedPassword
        );

        if (!matchedUser) {
            setMessageType('error');
            setMessage('Invalid email or password.');
            return;
        }

        setMessageType('success');
        setMessage('Login successful.');
        if (onSuccessLogin) onSuccessLogin(trimmedEmail);
        onClose();
    };

    const handleGoogleLogin = () => {
        console.log('Initiating Google Login...');
        // NextAuth / Clerk Google AuthTrigger
    };

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
                        <span style={{ fontSize: '18px', fontWeight: '800', color: '#10B981', letterSpacing: '0.5px' }}>
                            NEO<span style={{ color: '#FFF' }}>TERMINAL</span>
                        </span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                        {isSignup ? 'Create your terminal account' : 'Access your trading dashboard'}
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

                {/* Tab 1: Standard & Google Login */}
                {authTab === 'standard' && (
                    <>
                        {/* Google Social Button */}
                        <button
                            onClick={handleGoogleLogin}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                backgroundColor: '#161B22',
                                border: '1px solid #30363D',
                                color: '#F8FAFC',
                                padding: '10px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                marginBottom: '16px'
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                            </svg>
                            Continue with Google
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <div style={{ flex: 1, height: '1px', backgroundColor: '#1E293B' }} />
                            <span style={{ fontSize: '10px', color: '#64748B' }}>OR EMAIL</span>
                            <div style={{ flex: 1, height: '1px', backgroundColor: '#1E293B' }} />
                        </div>

                        {/* Email Form */}
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {message ? (
                                <div style={{ padding: '8px 10px', borderRadius: '8px', fontSize: '11px', backgroundColor: messageType === 'error' ? 'rgba(248, 113, 113, 0.12)' : 'rgba(16, 185, 129, 0.12)', color: messageType === 'error' ? '#F87171' : '#34D399' }}>
                                    {message}
                                </div>
                            ) : null}
                            <div style={{ position: 'relative' }}>
                                <Mail style={{ position: 'absolute', left: '12px', top: '10px', width: '14px', height: '14px', color: '#64748B' }} />
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#161B22',
                                        border: '1px solid #30363D',
                                        color: '#FFF',
                                        padding: '8px 12px 8px 36px',
                                        borderRadius: '8px',
                                        fontSize: '12px',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div style={{ position: 'relative' }}>
                                <Lock style={{ position: 'absolute', left: '12px', top: '10px', width: '14px', height: '14px', color: '#64748B' }} />
                                <input
                                    type="password"
                                    required
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#161B22',
                                        border: '1px solid #30363D',
                                        color: '#FFF',
                                        padding: '8px 12px 8px 36px',
                                        borderRadius: '8px',
                                        fontSize: '12px',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#10B981',
                                    color: '#070A0F',
                                    fontWeight: '800',
                                    fontSize: '12px',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    marginTop: '4px'
                                }}
                            >
                                {isSignup ? 'SIGN UP' : 'LOG IN'} <ArrowRight style={{ width: '14px', height: '14px' }} />
                            </button>
                        </form>

                        <div style={{ textAlign: 'center', marginTop: '16px' }}>
                            <button
                                onClick={() => setIsSignup(!isSignup)}
                                style={{ backgroundColor: 'transparent', border: 'none', color: '#64748B', fontSize: '11px', cursor: 'pointer' }}
                            >
                                {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
                            </button>
                        </div>
                    </>
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