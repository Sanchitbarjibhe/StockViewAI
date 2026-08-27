'use client';
import { useEffect, useState } from 'react';
import { AlertCircle, Check, Eye, EyeOff, KeyRound, X } from 'lucide-react';

export default function ApiSaveModal({ onClose }: { onClose: () => void }) {
    const providers = ['gemini', 'claude', 'openai'] as const;
    const [apiKey, setApiKey] = useState('');
    const [provider, setProvider] = useState<'gemini' | 'claude' | 'openai'>('gemini');
    const [loading, setLoading] = useState(false);
    const [showKey, setShowKey] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const handleSave = async () => {
        if (!apiKey.trim()) {
            setError('Enter an API key to continue.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/user/ai-api-key', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey: apiKey.trim(), provider }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                setError(data.error || data.message || 'Could not save the API key.');
                return;
            }
            onClose();
        } catch {
            setError('Could not connect to the server. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
            <div role="dialog" aria-modal="true" aria-labelledby="api-key-title" className="max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-4 text-white shadow-2xl shadow-black/50 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400"><KeyRound size={18} /></div>
                        <div>
                            <h3 id="api-key-title" className="text-lg font-bold">Configure AI key</h3>
                            <p className="mt-1 text-xs text-slate-400">Your key is encrypted before it is stored.</p>
                        </div>
                    </div>
                    <button type="button" onClick={onClose} aria-label="Close dialog" className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"><X size={18} /></button>
                </div>

                <div className="my-5 flex gap-2" role="group" aria-label="AI provider">
                    {providers.map((p) => (
                        <button
                            type="button"
                            key={p}
                            onClick={() => setProvider(p)}
                            className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold capitalize transition ${provider === p
                                ? 'bg-emerald-600 border-emerald-500 text-white'
                                : 'bg-slate-950 border-slate-800 text-slate-400'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                <label htmlFor="ai-api-key" className="mb-2 block text-xs font-semibold text-slate-300">{provider.toUpperCase()} API key</label>
                <div className="relative">
                    <input id="ai-api-key" type={showKey ? 'text' : 'password'} placeholder="Paste your API key" value={apiKey} onChange={(e) => { setApiKey(e.target.value); setError(''); }} className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 pr-11 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-emerald-500" autoFocus />
                    <button type="button" onClick={() => setShowKey(!showKey)} aria-label={showKey ? 'Hide API key' : 'Show API key'} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-slate-500 hover:text-slate-200">{showKey ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                </div>
                {error && <p className="mt-2 flex items-center gap-1.5 text-xs text-rose-400"><AlertCircle size={14} />{error}</p>}

                <div className="mt-6 flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800">Cancel</button>
                    <button type="button" onClick={handleSave} disabled={loading} aria-busy={loading} className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60">
                        {loading ? 'Saving...' : <><Check size={14} /> Save key</>}
                    </button>
                </div>
            </div>
        </div>
    );
}