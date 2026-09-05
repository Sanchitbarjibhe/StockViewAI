'use client';
import { useEffect, useState } from 'react';
import { AlertCircle, Check, Eye, EyeOff, ExternalLink, Info, KeyRound, X } from 'lucide-react';
import CustomResizableDialog from '@/components/user/CustomResizableDialog';

const providerGuideData = {
    gemini: {
        name: 'Google Gemini',
        link: 'https://aistudio.google.com/app/apikey',
        steps: [
            'Open Google AI Studio and sign in.',
            'Select "Get API Key" or "Create API Key".',
            'Copy the generated API key and paste it into the field below.',
        ],
    },
    claude: {
        name: 'Anthropic Claude',
        link: 'https://console.anthropic.com/settings/keys',
        steps: [
            'Open the Anthropic Console and sign in.',
            'Go to Settings, then open the API Keys section.',
            'Select "Create Key" and copy the new key.',
        ],
    },
    openai: {
        name: 'OpenAI (ChatGPT)',
        link: 'https://platform.openai.com/api-keys',
        steps: [
            'Open the OpenAI Platform and sign in.',
            'Open the API Keys page and select "Create new secret key".',
            'Copy the generated key and paste it into the field below.',
        ],
    },
} as const;

export default function ApiSaveModal({ onClose }: { onClose: () => void }) {
    const providers = ['gemini', 'claude', 'openai'] as const;
    const [apiKey, setApiKey] = useState('');
    const [provider, setProvider] = useState<'gemini' | 'claude' | 'openai'>('gemini');
    const [loading, setLoading] = useState(false);
    const [showKey, setShowKey] = useState(false);
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const currentGuide = providerGuideData[provider];

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
        setSuccess('');
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
            setApiKey('');
            setSuccess(data.message || 'API key saved successfully.');
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

                <div className="mb-2 flex items-center justify-between gap-3">
                    <label htmlFor="ai-api-key" className="block text-xs font-semibold text-slate-300">{provider.toUpperCase()} API key</label>
                    <button
                        type="button"
                        onClick={() => setIsGuideOpen(true)}
                        title={`How to get a ${currentGuide.name} API key`}
                        aria-label={`How to get a ${currentGuide.name} API key`}
                        className="rounded-full p-1 text-slate-400 transition hover:bg-slate-800 hover:text-emerald-400"
                    >
                        <Info size={16} />
                    </button>
                </div>
                <div className="relative">
                    <input id="ai-api-key" type={showKey ? 'text' : 'password'} placeholder="Paste your API key" value={apiKey} onChange={(e) => { setApiKey(e.target.value); setError(''); }} className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 pr-11 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-emerald-500" autoFocus />
                    <button type="button" onClick={() => setShowKey(!showKey)} aria-label={showKey ? 'Hide API key' : 'Show API key'} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-slate-500 hover:text-slate-200">{showKey ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                </div>
                {error && <p className="mt-2 flex items-center gap-1.5 text-xs text-rose-400"><AlertCircle size={14} />{error}</p>}
                {success && <p role="status" className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400"><Check size={14} />{success}</p>}

                <div className="mt-6 flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800">Cancel</button>
                    <button type="button" onClick={handleSave} disabled={loading} aria-busy={loading} className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60">
                        {loading ? 'Saving...' : <><Check size={14} /> Save key</>}
                    </button>
                </div>
            </div>
            <CustomResizableDialog
                isOpen={isGuideOpen}
                onClose={() => setIsGuideOpen(false)}
                title={`How to get ${currentGuide.name} API key`}
                initialWidth={480}
                initialHeight={320}
            >
                <div className="space-y-4">
                    <p className="text-xs text-slate-400">Follow these steps to create an API key from the official provider portal.</p>
                    <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300">
                        {currentGuide.steps.map((step) => <li key={step} className="leading-relaxed">{step}</li>)}
                    </ol>
                    <a
                        href={currentGuide.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/50 bg-emerald-600/20 px-3 py-2 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-600 hover:text-white"
                    >
                        Get {currentGuide.name} key
                        <ExternalLink size={14} />
                    </a>
                </div>
            </CustomResizableDialog>
        </div>
    );
}