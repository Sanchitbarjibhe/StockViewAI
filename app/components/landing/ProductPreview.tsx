'use client';

import React, { useState } from 'react';
import { Sparkles, TrendingUp, Activity, PieChart, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';
import terminalpreview from '../../../public/terminalpreview.jpg';





export default function ProductPreview() {
    const [activeTab, setActiveTab] = useState<'terminal' | 'heatmap' | 'ai'>('terminal');

    return (
        <section style={{ position: 'relative', padding: '64px 16px', maxWidth: '1152px', margin: '0 auto', overflow: 'hidden' }}>

            {/* Background Glow Effect */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '500px',
                height: '300px',
                backgroundColor: 'rgba(147, 51, 234, 0.15)',
                filter: 'blur(120px)',
                borderRadius: '9999px',
                pointerEvents: 'none'
            }} />

            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    color: '#60a5fa',
                    fontSize: '12px',
                    fontWeight: 600,
                    marginBottom: '12px'
                }}>
                    <Sparkles style={{ width: '14px', height: '14px' }} />
                    <span>Inside The Terminal</span>
                </div>

                <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', margin: 0 }}>
                    Designed for Speed & Institutional Precision
                </h2>

                <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px', maxWidth: '576px', marginLeft: 'auto', marginRight: 'auto' }}>
                    Experience how StockView unifies sector momentum, volume tape reading, and AI insights into a single screen.
                </p>
            </div>

            {/* Interactive Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
                {[
                    { id: 'terminal', label: 'Single-Screen Terminal', icon: Activity },
                    { id: 'heatmap', label: 'Sector Heatmap', icon: PieChart },
                    { id: 'ai', label: 'AI Advisor Tape', icon: Zap },
                ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                border: isActive ? '1px solid #3b82f6' : '1px solid #1e293b',
                                backgroundColor: isActive ? 'rgba(37, 99, 235, 0.2)' : 'rgba(15, 23, 42, 0.5)',
                                color: isActive ? '#60a5fa' : '#94a3b8',
                                boxShadow: isActive ? '0 0 15px rgba(59, 130, 246, 0.3)' : 'none'
                            }}
                        >
                            <Icon style={{ width: '16px', height: '16px' }} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Mockup Container with Floating Badges */}
            <div style={{
                position: 'relative',
                borderRadius: '16px',
                border: '1px solid #1e293b',
                backgroundColor: 'rgba(2, 6, 23, 0.8)',
                padding: '16px',
                boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.5)',
                backdropFilter: 'blur(16px)'
            }}>

                {/* Floating Glowing Badge 1: Top Left */}
                <div style={{
                    position: 'absolute',
                    top: '-16px',
                    left: '16px',
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.25)',
                    fontSize: '12px',
                    color: '#e2e8f0'
                }}>
                    <span style={{ position: 'relative', display: 'flex', height: '8px', width: '8px' }}>
                        <span style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            borderRadius: '9999px',
                            backgroundColor: '#34d399',
                            opacity: 0.75
                        }} />
                        <span style={{ position: 'relative', height: '8px', width: '8px', borderRadius: '9999px', backgroundColor: '#10b981' }} />
                    </span>
                    <span style={{ fontWeight: 600, color: '#34d399' }}>Institutional Breakout Alert</span>
                </div>

                {/* Floating Glowing Badge 2: Bottom Right */}
                <div style={{
                    position: 'absolute',
                    bottom: '-16px',
                    right: '16px',
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(168, 85, 247, 0.4)',
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.25)',
                    fontSize: '12px',
                    color: '#e2e8f0'
                }}>
                    <Sparkles style={{ width: '14px', height: '14px', color: '#c084fc' }} />
                    <span style={{ fontWeight: 500 }}>
                        AI Insight: <span style={{ color: '#d8b4fe', fontWeight: 700 }}>Bullish Orderflow Detected</span>
                    </span>
                </div>

                {/* Mac OS Window Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderBottom: '1px solid rgba(30, 41, 59, 0.8)',
                    marginBottom: '8px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '9999px', backgroundColor: 'rgba(244, 63, 94, 0.8)' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '9999px', backgroundColor: 'rgba(245, 158, 11, 0.8)' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '9999px', backgroundColor: 'rgba(16, 185, 129, 0.8)' }} />
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                        STOCKVIEW_TERMINAL_V2.6 // REALTIME
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#34d399', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                        <ShieldCheck style={{ width: '12px', height: '12px' }} />
                        <span>SEBI Compliant Data</span>
                    </div>
                </div>

                {/* Screen Mockup Content */}
                <div style={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#0f172a',
                    border: '1px solid rgba(30, 41, 59, 0.6)',
                    aspectRatio: '16/9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                    {/* Placeholder Fallback UI (फक्त स्क्रीनशॉट नसेल तर दिसेल) */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: '#020617',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        fontFamily: 'monospace'
                    }}>
                        {/* Top Stats Bar */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '12px' }}>
                            {[
                                { name: 'NIFTY 50', val: '24,320.15', chg: '+0.85%', isUp: true },
                                { name: 'BANK NIFTY', val: '52,110.40', chg: '-0.12%', isUp: false },
                                { name: 'NIFTY IT', val: '38,940.00', chg: '+2.10%', isUp: true },
                                { name: 'REALTY', val: '1,045.30', chg: '+1.45%', isUp: true },
                            ].map((m, i) => (
                                <div key={i} style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', border: '1px solid #1e293b', padding: '8px', borderRadius: '8px', textAlign: 'left' }}>
                                    <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>{m.name}</p>
                                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc', margin: '2px 0' }}>{m.val}</p>
                                    <p style={{ fontSize: '10px', fontWeight: 700, color: m.isUp ? '#34d399' : '#f43f5e', margin: 0 }}>
                                        {m.chg}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div style={{
                            marginTop: '5px',
                            marginBottom: '5px',
                            textAlign: 'center',
                            padding: '32px',
                            backgroundColor: 'rgba(15, 23, 42, 0.4)',
                            borderRadius: '12px',
                            border: '1px solid rgba(30, 41, 59, 0.5)',
                            backdropFilter: 'blur(4px)'
                        }}>
                            <TrendingUp style={{ width: '40px', height: '40px', color: '#3b82f6', margin: '0 auto 0 auto' }} />
                            <p style={{ color: '#cbd5e1', fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 600, margin: 13 }}>
                                High Resolution Live Terminal View
                            </p>
                            <img
                                src={terminalpreview.src}
                                alt="StockView App Terminal Preview"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    borderRadius: '12px'
                                }}
                            />

                        </div>
                        {/* Central Terminal Callout */}

                    </div>
                </div>
            </div>
        </section>
    );
}