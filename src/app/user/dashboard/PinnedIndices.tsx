'use client';

import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';

// 1. Data Interface
export interface IndexData {
    name: string;
    price: string;
    change: string;
    isUp: boolean;
}

// 2. Dummy Fallback Data
const DUMMY_INDICES: IndexData[] = [
    { name: 'NIFTY 50', price: '24,834.80', change: '+0.65%', isUp: true },
    { name: 'NIFTY BANK', price: '51,290.15', change: '-0.32%', isUp: false },
    { name: 'FINNIFTY', price: '23,450.60', change: '+0.40%', isUp: true },
    { name: 'SENSEX', price: '81,332.90', change: '+0.58%', isUp: true },
];

const DEFAULT_SELECTED = ['NIFTY 50', 'NIFTY BANK', 'FINNIFTY', 'SENSEX'];

// 3. Component Props Interface
export interface PinnedIndicesProps {
    loadingMarketData?: boolean;
    liveIndices?: IndexData[];
    selectedIndices?: string[];
    onShowSettings?: () => void;
    useApi?: boolean; // Future API enablement
}

const PinnedIndices: React.FC<PinnedIndicesProps> = ({
    loadingMarketData: propLoading = false,
    liveIndices: propLiveIndices,
    selectedIndices: propSelectedIndices,
    onShowSettings,
    useApi = false
}) => {
    // State management with Props OR Fallback Dummy Data
    const [indices, setIndices] = useState<IndexData[]>(propLiveIndices || DUMMY_INDICES);
    const [selected, setSelected] = useState<string[]>(propSelectedIndices || DEFAULT_SELECTED);
    const [loading, setLoading] = useState<boolean>(propLoading);

    // Dynamic props updates
    useEffect(() => {
        if (propLiveIndices?.length) setIndices(propLiveIndices);
        if (propSelectedIndices?.length) setSelected(propSelectedIndices);
        setLoading(propLoading);
    }, [propLiveIndices, propSelectedIndices, propLoading]);

    // FUTURE API CALL EFFECT (Enable with `useApi={true}`)
    useEffect(() => {
        if (!useApi) return;

        let isMounted = true;
        const fetchIndicesData = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api//user/pinned-indices');
                const data = await res.json();

                if (data.success && isMounted && data.indices) {
                    setIndices(data.indices);
                }
            } catch (err) {
                console.error("❌ Pinned Indices Fetch Error:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchIndicesData();

        return () => {
            isMounted = false;
        };
    }, [useApi]);

    // Filter based on selected indices
    const filteredIndices = indices.filter(idx => selected.includes(idx.name));
    const displayIndices = filteredIndices.length > 0 ? filteredIndices : indices;

    return (
        <div>
            {/* Header / Sub-nav */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', letterSpacing: '0.5px' }}>
                    PINNED INDICES (LIVE NSE)
                </span>
                {/* <button
                    onClick={onShowSettings}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: '#161B22',
                        border: '1px solid #30363D',
                        color: '#94A3B8',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    <Settings style={{ width: '11px', height: '11px' }} /> List All Indicies
                </button> */}
            </div>

            {/* Grid Items */}
            <div
                className="pinned-indices-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${displayIndices.length}, 1fr)`,
                    gap: '10px'
                }}
            >
                {loading && indices.length === 0 ? (
                    <div style={{ padding: '10px 12px', backgroundColor: '#0D1117', borderRadius: '8px', border: '1px solid #1E293B' }}>
                        <p style={{ fontSize: '11px', color: '#64748B', margin: 0 }}>Loading Live NSE Data...</p>
                    </div>
                ) : (
                    displayIndices.map((idx) => (
                        <div
                            key={idx.name}
                            className="card-glow"
                            style={{
                                padding: '10px 12px',
                                backgroundColor: '#0D1117',
                                border: '1px solid #1E293B',
                                borderLeft: `3px solid ${idx.isUp ? '#22C55E' : '#EF4444'}`,
                                borderRadius: '8px'
                            }}
                        >
                            <p style={{ fontSize: '10px', color: '#94A3B8', margin: 0, fontWeight: '700', letterSpacing: '0.3px' }}>
                                {idx.name}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                                <span style={{ fontSize: '15px', fontWeight: '700', color: '#F8FAFC' }}>
                                    {idx.price}
                                </span>
                                <span style={{ fontSize: '10px', color: idx.isUp ? '#22C55E' : '#EF4444', fontWeight: '700' }}>
                                    {idx.isUp ? '▲' : '▼'} {idx.change}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PinnedIndices;