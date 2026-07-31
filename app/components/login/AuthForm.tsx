'use client';

import React, { useState } from 'react';

interface AuthFormProps {
    redirectUrl?: string;
}

export default function AuthForm({ redirectUrl = '/' }: AuthFormProps) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(isSignUp ? 'Signing Up:' : 'Logging In:', { email, password, redirectUrl });
    };

    return (
        <div className="flex flex-col gap-4">
            <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium py-2.5 px-4 rounded-xl transition text-xs sm:text-sm"
            >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                        fill="#EA4335"
                        d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
                    />
                    <path
                        fill="#4285F4"
                        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.3-.8-.5-1.6-.5-2.5z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 22.3 12 23z"
                    />
                </svg>
                Continue with Google
            </button>

            <div className="flex items-center my-1">
                <div className="flex-1 border-t border-slate-800" />
                <span className="px-3 text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
                    OR EMAIL
                </span>
                <div className="flex-1 border-t border-slate-800" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="trader@neoai.com"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 text-slate-100 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm outline-none transition"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 text-slate-100 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm outline-none transition"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition shadow-lg shadow-emerald-500/20 mt-1"
                >
                    {isSignUp ? 'Create Trading Account' : 'Sign In to Terminal'}
                </button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-2">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-emerald-400 font-bold hover:underline ml-1"
                >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
            </p>
        </div>
    );
}