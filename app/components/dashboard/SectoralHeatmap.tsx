"use client";

import React from 'react';
import { PieChart } from 'lucide-react';

interface SectoralHeatmapProps {
    sectors: any[];
    loadingMarketData: boolean;
    sectorTimeframe: '1D' | '1W' | '1M' | '1Y' | '5Y';
    setSectorTimeframe: (timeframe: '1D' | '1W' | '1M' | '1Y' | '5Y') => void;
    sectorPerformance: Record<string, Record<string, { change: string; isUp: boolean }>>;
    activeMarqueeSector: any;
    setSelectedSectorModal: (sector: any) => void;
    tapeMode: 'SECTORS' | 'INDICES';
    setTapeMode: (mode: 'SECTORS' | 'INDICES') => void;
    marqueeItems: any[];
}

const SectoralHeatmap: React.FC<SectoralHeatmapProps> = ({
    sectors,
    loadingMarketData,
    sectorTimeframe,
    setSectorTimeframe,
    sectorPerformance,
    activeMarqueeSector,
    setSelectedSectorModal,
    tapeMode,
    setTapeMode,
    marqueeItems
}) => {
    const marqueeContent = [...marqueeItems, ...marqueeItems, ...marqueeItems];

    return (
        <section style={{ padding: '12px 14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <PieChart style={{ color: '#3B82F6', width: '14px', height: '14px' }} />
                    <h3 style={{ fontSize: '11px', fontWeight: '700', margin: 0, color: '#E2E8F0' }}>SECTORAL HEATMAP (ALL {sectors.length} SECTORS)</h3>
                </div>
                <div style={{ display: 'flex', gap: '4px', backgroundColor: 'rgba(10, 15, 26, 0.8)', padding: '2px', borderRadius: '6px' }}>
                    {(['1D', '1W', '1M', '1Y', '5Y'] as const).map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setSectorTimeframe(tf)}
                            style={{
                                backgroundColor: sectorTimeframe === tf ? '#3B82F6' : 'transparent',
                                color: sectorTimeframe === tf ? '#FFF' : '#94A3B8',
                                border: 'none',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontSize: '9px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </div>

            <div className="five-col-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
                {loadingMarketData && sectors.length === 0 ? (
                    <p style={{ fontSize: '11px', color: '#64748B', gridColumn: '1 / -1' }}>Loading Sector Data...</p>
                ) : (
                    sectors.map((sec, i) => {
                        const perf = sectorPerformance[sectorTimeframe]?.[sec.name] || { change: sec.change, isUp: sec.isUp };
                        return (<div
                            key={i}
                            onClick={() => {
                                setSelectedSectorModal(sec);
                            }}
                            style={{
                                backgroundColor: activeMarqueeSector?.name === sec.name ? 'rgba(59, 130, 246, 0.2)' : perf.isUp ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                padding: '8px 6px', borderRadius: '8px',
                                border: activeMarqueeSector?.name === sec.name ? '1px solid #3B82F6' : perf.isUp ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)',
                                textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s ease'
                            }}
                        >
                            <p style={{ fontSize: '9px', color: activeMarqueeSector?.name === sec.name ? '#3B82F6' : '#94A3B8', margin: 0, fontWeight: '700' }}>{sec.name}</p>
                            <p style={{ fontSize: '10px', fontWeight: '800', margin: '2px 0 0 0', color: perf.isUp ? '#22C55E' : '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                                {perf.isUp ? '▲' : '▼'} {perf.change}
                            </p>
                        </div>
                        )
                    }))}
            </div>

            <div style={{ backgroundColor: 'rgba(10, 15, 26, 0.9)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '8px', padding: '6px 10px', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', backgroundColor: 'rgba(0,0,0,0.6)', padding: '2px', borderRadius: '5px', gap: '2px' }}>
                    <button onClick={() => setTapeMode('SECTORS')} style={{ backgroundColor: tapeMode === 'SECTORS' ? '#3B82F6' : 'transparent', color: tapeMode === 'SECTORS' ? '#0F172A' : '#94A3B8', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: '800', cursor: 'pointer' }}>
                        SECTOR
                    </button>
                    <button onClick={() => setTapeMode('INDICES')} style={{ backgroundColor: tapeMode === 'INDICES' ? '#22C55E' : 'transparent', color: tapeMode === 'INDICES' ? '#0F172A' : '#94A3B8', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: '800', cursor: 'pointer' }}>
                        INDEX
                    </button>
                </div>

                <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                    <div className="marquee-track" style={{ minWidth: 'max-content', whiteSpace: 'nowrap', willChange: 'transform' }}>
                        {marqueeContent.length > 0 ? marqueeContent.map((stk, idx) => (
                            <div key={`${stk.symbol}-${idx}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginRight: '28px', fontSize: '10px' }}>
                                <span style={{ fontWeight: '700', color: '#F1F5F9' }}>{stk.symbol}</span>
                                <span style={{ color: '#94A3B8' }}>{stk.price}</span>
                                <span style={{ color: stk.isUp ? '#22C55E' : '#EF4444', fontWeight: '700' }}>
                                    {stk.isUp ? '▲' : '▼'} {stk.change}
                                </span>
                            </div>
                        )) : (
                            <span style={{ color: '#94A3B8', fontSize: '10px' }}>No live ticker data</span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectoralHeatmap;