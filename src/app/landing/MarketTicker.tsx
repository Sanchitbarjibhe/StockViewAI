// components/landing/MarketTicker.tsx (Pure Inline CSS)
'use client';

import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

export default function MarketTicker() {
  // Live Ticker Data
  const stockItems = [
    { symbol: 'NIFTY 50', price: '24,320.15', change: '+0.85%', isUp: true },
    { symbol: 'BANK NIFTY', price: '52,110.40', change: '-0.12%', isUp: false },
    { symbol: 'RELIANCE', price: '3,010.50', change: '+1.40%', isUp: true },
    { symbol: 'HDFCBANK', price: '1,640.20', change: '+0.65%', isUp: true },
    { symbol: 'TATA MOTORS', price: '1,080.00', change: '-0.95%', isUp: false },
    { symbol: 'INFY', price: '1,820.30', change: '+2.10%', isUp: true },
    { symbol: 'NIFTY IT', price: '38,940.00', change: '+1.80%', isUp: true },
  ];

  // Supported Brokers List
  const brokers = [
    { name: 'Zerodha', badge: 'Kite Connect API' },
    { name: 'AngelOne', badge: 'SmartAPI' },
    { name: 'Fyers', badge: 'API v3' },
    { name: 'Upstox', badge: 'Developer API' },
    { name: 'NSE / BSE Data Feeds', badge: 'Realtime Tick Data' },
  ];

  return (
    <div style={{ width: '100%', backgroundColor: '#020617', overflow: 'hidden', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b', padding: '16px 0' }}>

      {/* Dynamic Keyframes for CSS Animation */}
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* 1. TOP SECTION: Live Stocks Marquee Ticker */}
      <div style={{ display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap', marginBottom: '16px', position: 'relative' }}>

        {/* Left & Right Fade Gradients */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '64px', background: 'linear-gradient(to right, #020617, transparent)', zIndex: 10, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '64px', background: 'linear-gradient(to left, #020617, transparent)', zIndex: 10, pointerEvents: 'none' }} />

        {/* Moving Stock Container */}
        <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          animation: 'marqueeScroll 25s linear infinite',
          willChange: 'transform',
        }}>
          {/* Loop twice to make seamless infinite scroll */}
          {[...stockItems, ...stockItems].map((stock, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid #1e293b',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'monospace',
              }}
            >
              <span style={{ fontWeight: 700, color: '#f8fafc' }}>{stock.symbol}</span>
              <span style={{ color: '#cbd5e1' }}>{stock.price}</span>
              <span style={{
                fontWeight: 700,
                color: stock.isUp ? '#34d399' : '#f43f5e',
                backgroundColor: stock.isUp ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '10px',
              }}>
                {stock.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '80%', height: '1px', backgroundColor: 'rgba(30, 41, 59, 0.5)', margin: '0 auto 16px auto' }} />

      {/* 2. BOTTOM SECTION: Supported Brokers Bar */}
      <div style={{ textAlign: 'center', padding: '0 16px' }}>

        <p style={{
          fontSize: '11px',
          color: '#64748b',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          fontWeight: 700,
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}>
          <Zap style={{ width: '12px', height: '12px', color: '#60a5fa' }} />
          Supported Broker Integrations & Direct Feeds
        </p>

        {/* Brokers List Badges */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px',
          alignItems: 'center',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {brokers.map((broker, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(51, 65, 85, 0.8)',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                color: '#e2e8f0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              <ShieldCheck style={{ width: '14px', height: '14px', color: '#34d399' }} />
              <span style={{ fontWeight: 700, color: '#f1f5f9' }}>{broker.name}</span>
              <span style={{ fontSize: '10px', color: '#64748b', backgroundColor: '#0f172a', padding: '1px 6px', borderRadius: '4px' }}>
                {broker.badge}
              </span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}