'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Zap, Flame, LucideIcon } from 'lucide-react';

// 1. Data Interface
export interface MarketItem {
    symbolOrName: string;
    mainValue: string;
    subValue: string;
    isUp: boolean;
}

// 2. Dummy Fallback Data
export const DUMMY_GLOBAL_MARKETS: MarketItem[] = [
    { symbolOrName: 'NASDAQ', mainValue: '17,850.70', subValue: '+1.25%', isUp: true },
    { symbolOrName: 'DOW JONES', mainValue: '39,150.33', subValue: '-0.76%', isUp: false },
    { symbolOrName: 'S&P 500', mainValue: '5,467.80', subValue: '+0.39%', isUp: true },
    { symbolOrName: 'DAX', mainValue: '18,177.62', subValue: '-0.89%', isUp: false },
];

export const DUMMY_COMMODITIES: MarketItem[] = [
    { symbolOrName: 'GOLD', mainValue: '72,450', subValue: '+0.45%', isUp: true },
    { symbolOrName: 'SILVER', mainValue: '88,200', subValue: '-0.30%', isUp: false },
    { symbolOrName: 'CRUDE OIL', mainValue: '6,820', subValue: '+1.10%', isUp: true },
    { symbolOrName: 'NATURAL GAS', mainValue: '215.40', subValue: '-2.15%', isUp: false },
];

export const DUMMY_TOP_GAINERS: MarketItem[] = [
    { symbolOrName: 'RELIANCE', mainValue: '2,980.50', subValue: '+3.45%', isUp: true },
    { symbolOrName: 'TCS', mainValue: '3,890.00', subValue: '+2.10%', isUp: true },
    { symbolOrName: 'INFY', mainValue: '1,560.25', subValue: '+1.85%', isUp: true },
    { symbolOrName: 'BHARTIARTL', mainValue: '1,210.00', subValue: '+1.50%', isUp: true },
];

export const DUMMY_TOP_LOSERS: MarketItem[] = [
    { symbolOrName: 'HDFCBANK', mainValue: '1,430.10', subValue: '-2.35%', isUp: false },
    { symbolOrName: 'ICICIBANK', mainValue: '1,080.00', subValue: '-1.90%', isUp: false },
    { symbolOrName: 'LT', mainValue: '3,540.50', subValue: '-1.40%', isUp: false },
    { symbolOrName: 'AXISBANK', mainValue: '1,120.00', subValue: '-1.15%', isUp: false },
];

export const DUMMY_IO_GAINERS: MarketItem[] = [
    { symbolOrName: 'BANKNIFTY', mainValue: '2.1Cr', subValue: '+25.8%', isUp: true },
    { symbolOrName: 'NIFTY', mainValue: '3.5Cr', subValue: '+18.2%', isUp: true },
    { symbolOrName: 'FINNIFTY', mainValue: '1.8Cr', subValue: '+15.1%', isUp: true },
    { symbolOrName: 'SBIN', mainValue: '98L', subValue: '+12.5%', isUp: true },
];

export const DUMMY_VOLUME_GAINERS: MarketItem[] = [
    { symbolOrName: 'TATASTEEL', mainValue: '45.2M', subValue: '+8.40%', isUp: true },
    { symbolOrName: 'ZOMATO', mainValue: '38.1M', subValue: '+6.15%', isUp: true },
    { symbolOrName: 'JIOFIN', mainValue: '29.5M', subValue: '+5.30%', isUp: true },
    { symbolOrName: 'IDEA', mainValue: '120.4M', subValue: '-3.20%', isUp: false },
];

// 3. Reusable Card Column Component
interface MarketColumnProps {
    title: string;
    items?: MarketItem[];
    loading?: boolean;
    icon?: LucideIcon;
    iconColor?: string;
    iconTransform?: string;
}

const MarketColumn: React.FC<MarketColumnProps> = ({
    title,
    items = [],
    loading = false,
    icon: Icon,
    iconColor = '#64748B',
    iconTransform
}) => {
    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                {Icon && (
                    <Icon style={{ color: iconColor, width: '14px', height: '14px', transform: iconTransform }} />
                )}
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', letterSpacing: '0.5px' }}>
                    {title}
                </span>
            </div>

            {/* Content List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {loading ? (
                    <div className="card-glow" style={{ padding: '8px 12px', borderRadius: '8px' }}>
                        <p style={{ fontSize: '10px', color: '#64748B', margin: 0 }}>Loading...</p>
                    </div>
                ) : (
                    items.map((item, index) => (
                        <div
                            key={`${item.symbolOrName}-${index}`}
                            className="card-glow"
                            style={{
                                padding: '8px 12px',
                                borderRadius: '8px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <span style={{ fontSize: '10px', fontWeight: '700', color: '#E2E8F0' }}>
                                {item.symbolOrName}
                            </span>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '11px', fontWeight: '700', color: '#FFF', margin: 0 }}>
                                    {item.mainValue}
                                </p>
                                <p
                                    style={{
                                        fontSize: '10px',
                                        fontWeight: '700',
                                        margin: '1px 0 0 0',
                                        color: item.isUp ? '#22C55E' : '#EF4444'
                                    }}
                                >
                                    {item.isUp ? '▲' : '▼'} {item.subValue}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MarketColumn;