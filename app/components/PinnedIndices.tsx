import React from 'react';
import { Settings } from 'lucide-react';

interface IndexData {
    name: string;
    price: string;
    change: string;
    isUp: boolean;
}

interface PinnedIndicesProps {
    loadingMarketData: boolean;
    liveIndices: IndexData[];
    selectedIndices: string[];
    onShowSettings: () => void;
}

const PinnedIndices: React.FC<PinnedIndicesProps> = ({ loadingMarketData, liveIndices, selectedIndices, onShowSettings }) => {
    const filteredIndices = liveIndices.filter(idx => selectedIndices.includes(idx.name));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', letterSpacing: '0.5px' }}>PINNED INDICES (LIVE NSE)</span>
                <button onClick={onShowSettings} style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#94A3B8', padding: '2px 8px', borderRadius: '5px', fontSize: '10px', cursor: 'pointer' }}>
                    <Settings style={{ width: '10px', height: '10px' }} /> Configure
                </button>
            </div>
            <div className="pinned-indices-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${filteredIndices.length > 0 ? filteredIndices.length : 1}, 1fr)`, gap: '10px' }}>
                {loadingMarketData && liveIndices.length === 0 ? <p style={{ fontSize: '11px', color: '#64748B' }}>Loading Live NSE Data...</p> :
                    filteredIndices.map((idx) => (
                        <div key={idx.name} style={{ padding: '10px 12px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.07)', borderLeft: `3px solid ${idx.isUp ? '#22C55E' : '#EF4444'}`, borderRadius: '10px' }}>
                            <p style={{ fontSize: '10px', color: '#94A3B8', margin: 0, fontWeight: '600' }}>{idx.name}</p>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '3px' }}>
                                <span style={{ fontSize: '15px', fontWeight: '700', color: '#F8FAFC' }}>{idx.price}</span>
                                <span style={{ fontSize: '10px', color: idx.isUp ? '#22C55E' : '#EF4444', fontWeight: '700' }}>{idx.isUp ? '▲' : '▼'} {idx.change}</span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PinnedIndices;
