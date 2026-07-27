"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';

interface AiResponseBoxProps {
    aiResponse: string;
    loading: boolean;
}

const AiResponseBox: React.FC<AiResponseBoxProps> = ({ aiResponse, loading }) => {
    return (
        <div style={{
            padding: '14px 16px',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            backgroundColor: 'rgba(10, 15, 26, 0.95)',
            borderRadius: '12px',
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.1)',
            marginBottom: '10px'
        }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Sparkles style={{ width: '16px', height: '16px', color: '#22C55E', marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <p style={{ fontSize: '10px', fontWeight: '900', color: '#22C55E', margin: 0, letterSpacing: '0.8px' }}>GEMINI AI MARKET ANALYSIS</p>
                        <span style={{ fontSize: '9px', color: '#64748B', fontWeight: '600' }}>LIVE INSIGHT</span>
                    </div>
                    {loading ? (<span style={{ fontSize: '12px', color: '#94A3B8' }}>Analyzing market setup & volume profiles...</span>) : (<p style={{ fontSize: '12px', color: '#F1F5F9', margin: 0, lineHeight: '1.5', fontWeight: '500' }}>{aiResponse}</p>)}
                </div>
            </div>
        </div>
    );
};

export default AiResponseBox;