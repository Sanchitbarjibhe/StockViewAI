import React from 'react';
import { X } from 'lucide-react';

interface IndexData {
    id?: string;
    name: string;
    price: string;
    change: string;
    isUp: boolean;
}

interface IndexSettingsModalProps {
    onClose: () => void;
    allIndices: IndexData[];
    liveIndices: IndexData[];
    loadingMarketData: boolean;
    selectedIndices: string[];
    setSelectedIndices: React.Dispatch<React.SetStateAction<string[]>>;
}

const IndexSettingsModal: React.FC<IndexSettingsModalProps> = ({ onClose, allIndices, liveIndices, loadingMarketData, selectedIndices, setSelectedIndices }) => {
    return (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
            <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#0F172A', border: '1px solid rgba(59, 130, 246, 0.4)', borderRadius: '14px', padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                    <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#FFF', margin: 0 }}>Configure Pinned Indices</h2>
                    <button onClick={onClose} style={{ backgroundColor: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                        <X style={{ width: '18px', height: '18px' }} />
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '8px', margin: '14px 0' }}>
                    <button onClick={() => setSelectedIndices(allIndices.map(i => i.name))} style={{ flex: 1, backgroundColor: 'rgba(59, 130, 246, 0.2)', border: '1px solid #3B82F6', color: '#E2E8F0', padding: '6px', borderRadius: '6px', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}>SHOW ALL</button>
                    <button onClick={() => setSelectedIndices([])} style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#94A3B8', padding: '6px', borderRadius: '6px', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}>HIDE ALL</button>
                </div>

                <div className="no-scrollbar" style={{ maxHeight: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '6px' }}>
                    {loadingMarketData && liveIndices.length === 0 ? (
                        <p style={{ fontSize: '11px', color: '#94A3B8', textAlign: 'center' }}>Loading indices...</p>
                    ) : (
                        liveIndices.map(idx => (
                            <label key={idx.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', backgroundColor: 'rgba(10, 15, 26, 0.7)', borderRadius: '6px', cursor: 'pointer' }}>
                                <input type="checkbox" checked={selectedIndices.includes(idx.name)} onChange={() => { setSelectedIndices(prev => prev.includes(idx.name) ? prev.filter(id => id !== idx.name) : [...prev, idx.name]); }} style={{ width: '14px', height: '14px', accentColor: '#22C55E' }} />
                                <span style={{ fontSize: '11px', fontWeight: '600', color: '#E2E8F0' }}>{idx.name}</span>
                            </label>
                        ))
                    )}
                </div>

                <button onClick={onClose} style={{ width: '100%', marginTop: '16px', backgroundColor: '#22C55E', color: '#0B0F17', border: 'none', padding: '9px', borderRadius: '8px', fontWeight: '800', fontSize: '11px', cursor: 'pointer' }}>
                    DONE
                </button>
            </div>
        </div>
    );
};

export default IndexSettingsModal;