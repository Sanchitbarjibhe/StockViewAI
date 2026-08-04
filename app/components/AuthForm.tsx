'use client';

import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc"; // FcGoogle ha colorful logo ahe
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
        <>
            {message ? (
                <div className={`rounded-2xl border px-4 py-3 text-sm mt-3 ${messageType === 'success' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-rose-500/30 bg-rose-500/10 text-rose-200'}`}>
                    {message}
                </div>
            ) : null}

            <button
                type="button"
                onClick={() => signIn('google', { callbackUrl: redirectUrl || '/' })}
                style={{
                    display: 'inline-flex',
                    width: '100%',
                    marginBottom: '10px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',              /* gap-3 */
                    borderRadius: '16px',     /* rounded-2xl */
                    border: '1px solid #1e293b', /* border-slate-800 */
                    backgroundColor: '#020617', /* bg-slate-950 */
                    padding: '8px 10px',     /* px-5 (20px) ani py-3 (12px) */
                    fontSize: '14px',         /* text-sm */
                    fontWeight: '600',        /* font-semibold */
                    color: '#ffffff',         /* Dark theme sathi text white kela ahe */
                    marginTop: '16px',        /* mt-4 */
                    transition: 'all 150ms'   /* transition */
                }}
            >
                <FcGoogle className="size-20" />Continue with Google</button>

            <div className="relative py-3 text-center text-xs uppercase tracking-[0.2em] text-slate-500">
                {/* <span className="bg-slate-950 px-3">or use email</span> */}
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
                <label className="block text-sm text-slate-300">
                    Email
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="you@example.com"
                        style={{
                            marginTop: '8px',          /* mt-2 */
                            width: '91%',             /* w-full */
                            borderRadius: '16px',      /* rounded-2xl */
                            border: '1px solid #1e293b', /* border-slate-800 */
                            backgroundColor: '#020617', /* bg-slate-950 */
                            padding: '12px 16px',      /* px-4 (16px) ani py-3 (12px) */
                            fontSize: '14px',          /* text-sm */
                            color: '#ffffff',          /* text-white */
                            outline: 'none',           /* outline-none */
                            transition: 'all 150ms'    /* transition */
                        }}
                    />
                </label>

                <label className="block text-sm text-slate-300">
                    Password
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter password"
                        style={{
                            marginTop: '8px',          /* mt-2 */
                            width: '91%',             /* w-full */
                            borderRadius: '16px',      /* rounded-2xl */
                            border: '1px solid #1e293b', /* border-slate-800 */
                            backgroundColor: '#020617', /* bg-slate-950 */
                            padding: '12px 16px',      /* px-4 (16px) ani py-3 (12px) */
                            fontSize: '14px',          /* text-sm */
                            color: '#ffffff',          /* text-white */
                            outline: 'none',           /* outline-none */
                            transition: 'all 150ms'    /* transition */
                        }}
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
                    style={{
                        width: '98%',
                        marginTop: '26px',          /* w-full */
                        borderRadius: '16px',      /* rounded-2xl */
                        backgroundColor: '#10b981', /* bg-emerald-500 */
                        padding: '12px 20px',      /* px-5 (20px) ani py-3 (12px) */
                        fontSize: '14px',          /* text-sm */
                        fontWeight: '600',        /* font-semibold */
                        color: '#020617',          /* text-slate-950 */
                        transition: 'all 150ms',   /* transition */
                        cursor: 'pointer',         /* Normal HTML button sathi hand icon */
                        border: 'none'             /* Default button border kadhnya sathi */
                    }}
                >
                    {variant === 'login' ? 'Sign in' : 'Create account'}
                </button>
            </form>
        </>
    );
}
