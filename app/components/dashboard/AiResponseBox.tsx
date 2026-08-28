"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
                        <p style={{ fontSize: '10px', fontWeight: '900', color: '#22C55E', margin: 0, letterSpacing: '0.8px' }}>STOCKVIEW AI ANALYSIS</p>
                        <span style={{ fontSize: '9px', color: '#64748B', fontWeight: '600' }}>LIVE INSIGHT</span>
                    </div>
                    {loading ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94A3B8' }}>
                            <span className="ai-response-pulse" aria-hidden="true" />
                            Analyzing market setup & volume profiles...
                        </div>
                    ) : (
                        <div className="ai-response-content" style={{ fontSize: '12px', color: '#E2E8F0', lineHeight: '1.55', fontWeight: '500' }}>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ children }) => <h3>{children}</h3>,
                                    h2: ({ children }) => <h3>{children}</h3>,
                                    h3: ({ children }) => <h3>{children}</h3>,
                                    strong: ({ children }) => <strong style={{ color: '#F8FAFC', fontWeight: 800 }}>{children}</strong>,
                                    ul: ({ children }) => <ul>{children}</ul>,
                                    ol: ({ children }) => <ol>{children}</ol>,
                                    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
                                    code: ({ children }) => <code>{children}</code>,
                                    table: ({ children }) => <div className="ai-response-table"><table>{children}</table></div>,
                                }}
                            >
                                {aiResponse}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AiResponseBox;