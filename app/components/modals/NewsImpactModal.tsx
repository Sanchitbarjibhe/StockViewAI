import React from 'react';
import { X } from 'lucide-react';

interface NewsImpactModalProps {
    selectedNews: any;
    onClose: () => void;
}

const NewsImpactModal: React.FC<NewsImpactModalProps> = ({ selectedNews, onClose }) => {
    if (!selectedNews) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
            <div style={{ width: '100%', maxWidth: '480px', backgroundColor: '#0F172A', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '14px', padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                    <div>
                        <span style={{ fontSize: '9px', fontWeight: '800', backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B', padding: '2px 6px', borderRadius: '4px' }}>{selectedNews.category}</span>
                        <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#FFF', margin: '6px 0 0 0' }}>{selectedNews.title}</h2>
                    </div>
                    <button onClick={onClose} style={{ backgroundColor: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                        <X style={{ width: '18px', height: '18px' }} />
                    </button>
                </div>

                <div style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <p style={{ fontSize: '10px', color: '#64748B', margin: 0, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Description</p>
                    <p style={{ fontSize: '12px', color: '#E2E8F0', margin: '4px 0 0 0', lineHeight: '1.6' }}>{selectedNews.desc}</p>
                </div>

                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ padding: '10px', backgroundColor: 'rgba(10, 15, 26, 0.8)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <p style={{ fontSize: '10px', color: '#64748B', margin: 0, fontWeight: '700' }}>IMPACT ANALYSIS</p>
                        <p style={{ fontSize: '12px', fontWeight: '800', color: selectedNews.impactType === 'bull' ? '#22C55E' : selectedNews.impactType === 'bear' ? '#EF4444' : '#F59E0B', margin: '2px 0 0 0' }}>{selectedNews.impact}</p>
                    </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                    <button onClick={onClose} style={{ width: '100%', backgroundColor: '#22C55E', color: '#0B0F17', border: 'none', padding: '9px', borderRadius: '8px', fontWeight: '800', fontSize: '11px', cursor: 'pointer' }}>
                        CLOSE ANALYSIS
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsImpactModal;