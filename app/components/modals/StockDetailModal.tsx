import React from 'react';
import { X } from 'lucide-react';

interface StockDetailModalProps {
    stockData: any;
    onClose: () => void;
}

const StockDetailModal: React.FC<StockDetailModalProps> = ({ stockData, onClose }) => {
    if (!stockData) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
            <div style={{ width: '100%', maxWidth: '480px', backgroundColor: '#0F172A', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '14px', padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFF', margin: 0 }}>{stockData.symbol}</h2>
                            <span style={{ fontSize: '10px', backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>{stockData.sector}</span>
                        </div>
                        <p style={{ fontSize: '11px', color: '#94A3B8', margin: '2px 0 0 0' }}>{stockData.name}</p>
                    </div>
                    <button onClick={onClose} style={{ backgroundColor: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                        <X style={{ width: '18px', height: '18px' }} />
                    </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '14px 0' }}>
                    <span style={{ fontSize: '24px', fontWeight: '800', color: '#FFF' }}>{stockData.price}</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: stockData.isUp ? '#22C55E' : '#EF4444', display: 'flex', alignItems: 'center' }}>
                        {stockData.isUp ? '▲' : '▼'} {stockData.change}
                    </span>
                </div>

                <div className="stock-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', backgroundColor: 'rgba(10, 15, 26, 0.8)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div><p style={{ fontSize: '10px', color: '#64748B', margin: 0 }}>Day's High / Low</p><p style={{ fontSize: '12px', fontWeight: '700', color: '#E2E8F0', margin: '2px 0 0 0' }}>{stockData.dayHigh} / {stockData.dayLow}</p></div>
                    <div><p style={{ fontSize: '10px', color: '#64748B', margin: 0 }}>Volume</p><p style={{ fontSize: '12px', fontWeight: '700', color: '#E2E8F0', margin: '2px 0 0 0' }}>{stockData.volume}</p></div>
                    <div><p style={{ fontSize: '10px', color: '#64748B', margin: 0 }}>Market Cap</p><p style={{ fontSize: '12px', fontWeight: '700', color: '#E2E8F0', margin: '2px 0 0 0' }}>{stockData.mcap}</p></div>
                    <div><p style={{ fontSize: '10px', color: '#64748B', margin: 0 }}>P/E Ratio</p><p style={{ fontSize: '12px', fontWeight: '700', color: '#E2E8F0', margin: '2px 0 0 0' }}>{stockData.pe}</p></div>
                </div>

                <div style={{ marginTop: '14px' }}>
                    <button onClick={onClose} style={{ width: '100%', backgroundColor: '#22C55E', color: '#0B0F17', border: 'none', padding: '9px', borderRadius: '8px', fontWeight: '800', fontSize: '11px', cursor: 'pointer' }}>
                        CLOSE VIEW
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StockDetailModal;