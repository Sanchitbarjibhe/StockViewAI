"use client";

import React from 'react';
import { Terminal, ChevronRight, Loader2 } from 'lucide-react';

interface AiPromptBarProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    handleAskAI: () => void;
    loading: boolean;
    quickChips: string[];
}

const AiPromptBar: React.FC<AiPromptBarProps> = ({ prompt, setPrompt, handleAskAI, loading, quickChips }) => {
    return (
        <div style={{ padding: '12px 0 16px 0', backgroundColor: '#05080E', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            {/* QUICK CHIPS */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', padding: '0 4px', flexWrap: 'wrap' }}>
                {quickChips.map((chip) => (
                    <button
                        key={chip}
                        onClick={() => setPrompt(chip)}
                        style={{
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            color: '#22C55E',
                            padding: '4px 10px',
                            borderRadius: '16px',
                            fontSize: '10px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {chip}
                    </button>
                ))}
            </div>
            <div
                className="ultra-search-container ai-prompt-container"
                style={{ display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '16px', padding: '6px 8px 6px 14px' }}
            >
                <div className="ai-prompt-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '12px', borderRight: '1px solid rgba(255, 255, 255, 0.12)' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '8px', backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Terminal style={{ width: '14px', height: '14px', color: '#22C55E' }} />
                    </div>
                    <div>
                        <p style={{ fontSize: '9px', fontWeight: '900', color: '#22C55E', margin: 0, letterSpacing: '0.6px' }}>StockView AI</p>
                        <p style={{ fontSize: '8px', color: '#64748B', margin: 0, fontWeight: '700' }}>TERMINAL v2</p>
                    </div>
                </div>

                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                    placeholder="Ask AI (e.g., Analyze Nifty support/resistance, FII/DII activity in banking sector?)"
                    style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: '#FFF', fontSize: '12px', outline: 'none', fontWeight: '500' }}
                />

                <button onClick={handleAskAI} disabled={loading} className="ai-prompt-button" style={{ backgroundColor: loading ? '#64748B' : '#22C55E', color: '#05080E', border: 'none', padding: '8px 18px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '900', fontSize: '11px', boxShadow: loading ? 'none' : '0 0 16px rgba(34, 197, 94, 0.5)', transition: 'transform 0.1s ease, background-color 0.2s' }}>
                    {loading ? (
                        <Loader2 style={{ width: '14px', height: '14px' }} className="animate-spin" />
                    ) : (
                        <>
                            <span>ANALYZE</span>
                            <ChevronRight style={{ width: '13px', height: '13px', strokeWidth: 3 }} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AiPromptBar;
