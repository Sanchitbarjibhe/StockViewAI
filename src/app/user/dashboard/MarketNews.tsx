"use client";

import React from 'react';
import { Newspaper, TrendingUp, Flame, AlertTriangle } from 'lucide-react';

interface MarketNewsProps {
    newsList: any[];
    setSelectedNews: (news: any) => void;
}

const MarketNews: React.FC<MarketNewsProps> = ({ newsList, setSelectedNews }) => {
    return (
        <section style={{ padding: '12px 14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Newspaper style={{ color: '#F59E0B', width: '14px', height: '14px' }} />
                    <h3 style={{ fontSize: '11px', fontWeight: '700', margin: 0, color: '#E2E8F0' }}>LIVE MARKET IMPACT & BREAKOUT NEWS</h3>
                </div>
                <span style={{ fontSize: '9px', color: '#64748B' }}>Click news item for detailed analysis</span>
            </div>

            <div className="two-col-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {newsList.map((item) => {
                    const isBull = item.impactType === 'bull';
                    const isBear = item.impactType === 'bear';
                    const tagBg = isBull ? 'rgba(34, 197, 94, 0.15)' : isBear ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)';
                    const tagColor = isBull ? '#22C55E' : isBear ? '#EF4444' : '#F59E0B';
                    const tagBorder = isBull ? '1px solid rgba(34, 197, 94, 0.3)' : isBear ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)';

                    const Icon = item.category === 'STOCKS' ? TrendingUp : item.category === 'COMMODITY' ? Flame : AlertTriangle;

                    return (
                        <div
                            key={item.id}
                            onClick={() => {
                                setSelectedNews(item);
                                if (item.link) window.open(item.link, '_blank');
                            }}
                            className="news-item"
                            style={{
                                padding: '10px 12px',
                                backgroundColor: 'rgba(10, 15, 26, 0.7)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease, background-color 0.2s',
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'center'
                            }}
                        >
                            {/* Icon */}
                            <div style={{ color: tagColor, alignSelf: 'flex-start', marginTop: '4px' }}>
                                <Icon style={{ width: '16px', height: '16px' }} />
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                        <span style={{ fontSize: '8px', fontWeight: '800', backgroundColor: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '4px', color: '#94A3B8' }}>
                                            {item.category}
                                        </span>
                                        <span style={{ fontSize: '9px', fontWeight: '800', color: '#F8FAFC' }}>
                                            {item.tag}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '9px', color: '#64748B' }}>{item.time}</span>
                                </div>

                                <p style={{ fontSize: '11px', fontWeight: '700', color: '#F1F5F9', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {item.title}
                                </p>

                                <span style={{ fontSize: '9px', fontWeight: '800', backgroundColor: tagBg, color: tagColor, border: tagBorder, padding: '2px 8px', borderRadius: '5px', letterSpacing: '0.4px', alignSelf: 'flex-start' }}>
                                    IMPACT: {item.impact}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default MarketNews;