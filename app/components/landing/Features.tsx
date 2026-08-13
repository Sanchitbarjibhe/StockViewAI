import React from 'react';

export default function Features() {
  return (
    <section id="features" style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid #0f172a' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', marginBottom: '40px', color: '#e2e8f0' }}>Why Traders Choose StockView AI?</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>

        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '24px', borderRadius: '16px' }}>
          <div style={{ fontSize: '24px', marginBottom: '12px' }}>🧠</div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Gemini AI Advisor</h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>
            Converts complex candlestick patterns and indicator data into 3 clean, actionable bullet points.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '24px', borderRadius: '16px' }}>
          <div style={{ fontSize: '24px', marginBottom: '12px' }}>🖥️</div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Single-Screen Terminal</h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>
            All indicators, charts, and institutional breakouts visible on one unified dashboard.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '24px', borderRadius: '16px' }}>
          <div style={{ fontSize: '24px', marginBottom: '12px' }}>🚀</div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Zero Lag Analytics</h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>
            Fast technical analysis generation designed specifically for swing and day traders.
          </p>
        </div>

      </div>
    </section>
  );
}