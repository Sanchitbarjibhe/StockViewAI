'use client';
import { useState } from 'react';

export default function ApiSaveModel({ onClose }: { onClose: () => void }) {
    const [apiKey, setApiKey] = useState('');
    const [provider, setProvider] = useState<'gemini' | 'claude' | 'openai'>('gemini');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        const res = await fetch('/api/user/save-api-key', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiKey, provider }),
        });

        const data = await res.json();
        setLoading(false);
        if (data.success) {
            alert(`Successfully configured ${provider.toUpperCase()} API Key!`);
            onClose();
        } else {
            alert(data.error);
        }
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-white max-w-md">
            <h3 className="text-lg font-bold">Configure AI Model Key</h3>

            {/* Provider Selector */}
            <div className="flex gap-2 my-4">
                {['gemini', 'claude', 'openai'].map((p) => (
                    <button
                        key={p}
                        onClick={() => setProvider(p as any)}
                        className={`px-3 py-1.5 rounded text-xs font-semibold capitalize border ${provider === p
                                ? 'bg-emerald-600 border-emerald-500 text-white'
                                : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}
                    >
                        {p}
                    </button>
                ))}
            </div>

            <input
                type="password"
                placeholder={`Paste your ${provider.toUpperCase()} Key here...`}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-sm text-slate-200"
            />

            <div className="flex justify-end gap-2 mt-4">
                <button onClick={onClose} className="px-3 py-1.5 bg-slate-800 rounded text-xs">Cancel</button>
                <button onClick={handleSave} disabled={loading} className="px-4 py-1.5 bg-emerald-600 rounded text-xs font-bold">
                    {loading ? 'Saving...' : 'Save Engine Key'}
                </button>
            </div>
        </div>
    );
}