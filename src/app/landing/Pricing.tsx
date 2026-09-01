import React from 'react';

export default function Pricing() {
    return (
        <section id="pricing" style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', borderTop: '1px solid #0f172a', textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#e2e8f0' }}>Simple, Transparent Pricing</h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '40px' }}>Start for free and upgrade when you need more power.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', textAlign: 'left' }}>

                {/* Free Tier */}
                <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '32px', borderRadius: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Free Plan</h3>
                    <div style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px' }}>₹0 <span style={{ fontSize: '12px', fontWeight: '400', color: '#64748b' }}>/mo</span></div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', fontSize: '13px', color: '#cbd5e1', lineHeight: '2' }}>
                        <li>✓ Basic Technical Charts</li>
                        <li>✓ 3 AI Insights / day</li>
                        <li>✓ Delayed Market Data</li>
                    </ul>
                    <button style={{ width: '100%', backgroundColor: '#1e293b', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                        Get Started
                    </button>
                </div>

                {/* Pro Tier */}
                <div style={{ backgroundColor: '#0f172a', border: '1px solid #a855f7', padding: '32px', borderRadius: '16px', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-12px', right: '20px', backgroundColor: '#9333ea', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '12px' }}>
                        POPULAR
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#c084fc' }}>Pro AI Plan</h3>
                    <div style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px' }}>₹799 <span style={{ fontSize: '12px', fontWeight: '400', color: '#64748b' }}>/mo</span></div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', fontSize: '13px', color: '#cbd5e1', lineHeight: '2' }}>
                        <li>✓ Real-Time Institutional Data</li>
                        <li>✓ Unlimited AI Advisor Signals</li>
                        <li>✓ Volume Profile & Breakout Alerts</li>
                    </ul>
                    <button style={{ width: '100%', backgroundColor: '#9333ea', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                        Upgrade to Pro
                    </button>
                </div>

            </div>
        </section>
    );
}