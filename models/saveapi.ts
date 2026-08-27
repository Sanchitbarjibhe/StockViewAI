'use client';

import React, { useState } from 'react';
import { Key, CheckCircle, ShieldAlert } from 'lucide-react';

export const ApiKeySettingsModal = () => {
    const [apiKey, setApiKey] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    const handleSaveKey = async () => {
        const res = await fetch('/api/user/save-settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ geminiApiKey: apiKey })
        });

        if (res.ok) {
            setIsSaved(true);
            setApiKey('');
        }
    };

    return (
        <>
        <div style= {{ backgroundColor: '#0D1117', border: '1px solid #1E293B', padding: '20px', borderRadius: '12px', width: '380px' }
}>
    <div style={ { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' } }>
        <Key style={ { color: '#10B981', width: '18px', height: '18px' } } />
            < h3 style = {{ fontSize: '14px', margin: 0, color: '#FFF' }}> Bring Your Own Gemini Key </h3>
                </div>

                < p style = {{ fontSize: '11px', color: '#64748B', marginBottom: '12px' }}>
                    Your API key is encrypted using AES-256 and used only for your terminal queries.
            </p>

                        < input
                type = "password"
placeholder = "AIzaSy..."
value = { apiKey }
onChange = {(e) => setApiKey(e.target.value)}
style = {{
    width: '100%',
        backgroundColor: '#161B22',
            border: '1px solid #30363D',
                color: '#FFF',
                    padding: '8px 12px',
                        borderRadius: '6px',
                            fontSize: '12px',
                                marginBottom: '12px',
                                    outline: 'none'
}}
            />

    < button
onClick = { handleSaveKey }
style = {{
    width: '100%',
        backgroundColor: '#10B981',
            color: '#070A0F',
                fontWeight: '800',
                    padding: '8px',
                        borderRadius: '6px',
                            border: 'none',
                                cursor: 'pointer'
}}
            >
    { isSaved? 'Key Configured ✅': 'Save Encrypted Key' }
    </button>
    </div>
    </>
    );
};