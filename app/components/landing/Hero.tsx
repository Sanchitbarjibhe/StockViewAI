'use client';

import React, { useState } from 'react';

interface FormDataState {
  name: string;
  email: string;
  phone: string;
}

export default function Hero() {
  const [formData, setFormData] = useState<FormDataState>({ name: '', email: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/mvpentry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('✅ Registration successful! Welcome aboard.');
        setFormData({ name: '', email: '', phone: '' }); // Reset form
      } else {
        setMessage(`❌ Error: ${result.message || 'An unknown error occurred.'}`);
      }
    } catch (error) {
      setMessage('❌ Failed to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>

      {/* Badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 16px', borderRadius: '20px', border: '1px solid rgba(168,85,247,0.3)', backgroundColor: 'rgba(168,85,247,0.1)', color: '#d8b4fe', fontSize: '12px', fontWeight: '600', marginBottom: '24px' }}>
        ✨ Next-Gen Institutional AI Insights
      </div>

      {/* Main Heading */}
      <h1 style={{ fontSize: '42px', fontWeight: '800', lineHeight: '1.2', marginBottom: '20px', letterSpacing: '-0.5px' }}>
        Instant Market Analysis with <br />
        <span style={{ color: '#c084fc', background: 'linear-gradient(to right, #c084fc, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Smart AI Advisor
        </span>
      </h1>

      <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '650px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
        Get real-time institutional volume levels, RSI-VWAP breakout alerts, and 3-bullet AI technical insights on a single screen.
      </p>

      {/* Lead Capture Form Card */}
      <div style={{ maxWidth: '420px', margin: '0 auto', backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '28px', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your Full Name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', backgroundColor: '#020617', border: '1px solid #334155', color: '#f8fafc', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your Email ID"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', backgroundColor: '#020617', border: '1px solid #334155', color: '#f8fafc', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
          <input
            type="tel"
            name="phone"
            required
            placeholder="Enter Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: '100%', backgroundColor: '#020617', border: '1px solid #334155', color: '#f8fafc', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{ width: '100%', background: 'linear-gradient(to right, #9333ea, #059669)', color: '#ffffff', fontWeight: '600', padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', marginTop: '6px', opacity: isLoading ? 0.6 : 1 }}
          >
            {isLoading ? 'Registering...' : 'Start Free AI Trial →'}
          </button>
        </form>
        {message && (
          <p style={{ fontSize: '12px', color: message.startsWith('❌') ? '#fca5a5' : '#86efac', marginTop: '12px', textAlign: 'center' }}>{message}</p>
        )}
        {!message && (<p style={{ fontSize: '11px', color: '#64748b', marginTop: '12px', textAlign: 'center' }}>
          ⚡ Instant 3-day free access. No credit card required.
        </p>)}
      </div>
    </section>
  );
}