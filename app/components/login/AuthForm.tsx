'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
    initialVariant?: 'login' | 'signup';
    onSuccess?: (email: string) => void;
    onClose?: () => void;
    redirectUrl?: string | null;
}

interface StoredUser {
    email: string;
    password: string;
}

export default function AuthForm({ initialVariant = 'login', onSuccess, onClose, redirectUrl = '/' }: AuthFormProps) {
    const [variant, setVariant] = useState<'login' | 'signup'>(initialVariant);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');
    const router = useRouter();

    const clearForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setMessage('');
    };

    const handleAuth = (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();

        if (!email || !password) {
            setMessageType('error');
            setMessage('Please enter both email and password.');
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('neoUsers') || '[]') as StoredUser[];

        if (variant === 'signup') {
            if (password !== confirmPassword) {
                setMessageType('error');
                setMessage('Passwords do not match.');
                return;
            }

            if (storedUsers.some((user) => user.email === email.toLowerCase())) {
                setMessageType('error');
                setMessage('This email is already registered. Please log in.');
                return;
            }

            storedUsers.push({ email: email.toLowerCase(), password });
            localStorage.setItem('neoUsers', JSON.stringify(storedUsers));

            setMessageType('success');
            setMessage('Account created successfully. Redirecting...');
            if (onSuccess) onSuccess(email.toLowerCase());
            if (onClose) onClose();
            if (redirectUrl) setTimeout(() => router.push(redirectUrl), 700);
            return;
        }

        const matchedUser = storedUsers.find((user) => user.email === email.toLowerCase() && user.password === password);
        if (!matchedUser) {
            setMessageType('error');
            setMessage('Invalid email or password.');
            return;
        }

        setMessageType('success');
        setMessage('Login successful. Redirecting...');
        if (onSuccess) onSuccess(email.toLowerCase());
        if (onClose) onClose();
        if (redirectUrl) setTimeout(() => router.push(redirectUrl), 700);
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-white">{variant === 'login' ? 'Welcome back' : 'Create your account'}</h2>
                    <p className="mt-2 text-sm text-slate-400">{variant === 'login' ? 'Log in to access your dashboard.' : 'Set up your secure account.'}</p>
                </div>
                <div className="flex rounded-full bg-slate-900 p-1 text-sm text-slate-400">
                    <button
                        type="button"
                        className={`rounded-full px-4 py-2 transition ${variant === 'login' ? 'bg-emerald-500 text-white shadow-lg' : 'hover:bg-slate-800'}`}
                        onClick={() => { setVariant('login'); clearForm(); }}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className={`rounded-full px-4 py-2 transition ${variant === 'signup' ? 'bg-emerald-500 text-white shadow-lg' : 'hover:bg-slate-800'}`}
                        onClick={() => { setVariant('signup'); clearForm(); }}
                    >
                        Sign Up
                    </button>
                </div>
            </div>

            {message ? (
                <div className={`rounded-2xl border px-4 py-3 text-sm mt-3 ${messageType === 'success' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-rose-500/30 bg-rose-500/10 text-rose-200'}`}>
                    {message}
                </div>
            ) : null}

            <button
                type="button"
                onClick={() => signIn('google', { callbackUrl: redirectUrl || '/' })}
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-950 px-5 py-3 text-sm font-semibold text-black mt-4 transition hover:border-slate-700 hover:bg-slate-900"
            >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black font-semibold">G</span>
                Continue with Google
            </button>

            <div className="relative py-3 text-center text-xs uppercase tracking-[0.2em] text-slate-500">
                <span className="bg-slate-950 px-3">or use email</span>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
                <label className="block text-sm text-slate-300">
                    Email
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="you@example.com"
                        className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
                    />
                </label>

                <label className="block text-sm text-slate-300">
                    Password
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter password"
                        className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
                    />
                </label>

                {variant === 'signup' && (
                    <label className="block text-sm text-slate-300">
                        Confirm Password
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder="Repeat password"
                            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
                        />
                    </label>
                )}

                <button
                    type="submit"
                    className="w-full rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                    {variant === 'login' ? 'Sign in' : 'Create account'}
                </button>
            </form>
        </div>
    );
}
