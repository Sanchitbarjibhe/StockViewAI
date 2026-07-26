"use client";

import React, { useEffect, useState } from 'react';
import {
  Flame,
  Search,
  PieChart, X, Zap, BarChart2,
  Settings,
  Sparkles,
  Loader2,
  Terminal,
  ChevronRight,
  Newspaper, TrendingUp, AlertTriangle
} from 'lucide-react';

interface IndexData {
  name: string;
  price: string;
  change: string;
  isUp: boolean;
  symbol?: string; // for settings
}

interface StockPerformance {
  symbol: string;
  price: string;
  change: string;
  isUp: boolean;
}

interface VolumeGainer {
  symbol: string;
  change: string;
  isUp: boolean;
  volume: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("FII buying support seen in Banking & IT sectors. Overall Market Bias: Mild Bullish.");
  const [loading, setLoading] = useState(false);

  // Search & Stock Data State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedStockData, setSearchedStockData] = useState<any>(null);

  // News Modal State
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [newsList, setNewsList] = useState<any[]>([]);

  // Marquee Mode State: 'SECTORS' or 'INDICES'
  const [tapeMode, setTapeMode] = useState<'SECTORS' | 'INDICES'>('SECTORS');

  // NEW: Sector timeframe state
  const [sectorTimeframe, setSectorTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | '5Y'>('1D');

  // Pop-ups & Filters State
  const [selectedSectorModal, setSelectedSectorModal] = useState<any>(null);
  const [showIndexSettings, setShowIndexSettings] = useState<boolean>(false);


  // 1. Live Indices साठी State तयार करा
  const [liveIndices, setLiveIndices] = useState<IndexData[]>([]);
  const [commodities, setCommodities] = useState<IndexData[]>([]);
  const [topGainers, setTopGainers] = useState<StockPerformance[]>([]);
  const [topLosers, setTopLosers] = useState<StockPerformance[]>([]);
  const [volumeGainers, setVolumeGainers] = useState<VolumeGainer[]>([]);
  const [sectors, setSectors] = useState<any[]>([]);
  const [loadingMarketData, setLoadingMarketData] = useState<boolean>(true);

  // News Fetch Effect
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        const json = await res.json();
        if (json.success) {
          setNewsList(json.news);
        }
      } catch (err) {
        console.error("Failed to load news", err);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 60000); // 1-minute auto refresh
    return () => clearInterval(interval);
  }, []);

  // Combined Market Data Fetching Effect
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const res = await fetch('/api/market-data');
        const data = await res.json();

        if (data.success) {
          setLiveIndices(data.indices || []);
          setCommodities(data.commodities || []);
          setTopGainers(data.topGainers || []);
          setTopLosers(data.topLosers || []);
          setVolumeGainers(data.volumeGainers || []);
          setSectors(data.sectorData || []);
          // Also update the single marketData state if you plan to use it
        }
      } catch (err) {
        console.error("❌ NSE Data Fetch Failed:", err);
      } finally {
        setLoadingMarketData(false);
      }
    };

    // Fetch initially
    fetchMarketData();

    // Auto-Refresh every 10 seconds
    const interval = setInterval(fetchMarketData, 10000);
    return () => clearInterval(interval);
  }, []);

  // allIndices ला liveIndices च्या आधारे तयार करा
  const allIndices = liveIndices.map(idx => ({
    id: idx.name, // API response मध्ये symbol नाही, म्हणून name वापरत आहे
    name: idx.name,
    price: idx.price,
    change: idx.change,
    isUp: idx.isUp
  }));


  // Available Master Indices
  const [selectedIndices, setSelectedIndices] = useState<string[]>(['NIFTY 50', 'NIFTY BANK', 'NIFTY FINANCIAL SERVICES', 'NIFTY 500', 'NIFTY 200', 'NIFTY 100', 'NIFTY MID SELECT']);

  // NEW: Global Indices & Commodities Data
  const globalIndices = [
    { name: "NASDAQ", price: "17,850.70", change: "+1.25%", isUp: true },
    { name: "DOW JONES", price: "39,150.33", change: "-0.76%", isUp: false },
    { name: "S&P 500", price: "5,467.80", change: "+0.39%", isUp: true },
    { name: "DAX", price: "18,177.62", change: "-0.89%", isUp: false },
  ];

  // NEW: IO & Volume Gainers Data
  const ioGainers = [
    { symbol: "BANKNIFTY", value: "2.1Cr", change: "+25.8%", isUp: true },
    { symbol: "NIFTY", value: "3.5Cr", change: "+18.2%", isUp: true },
    { symbol: "FINNIFTY", value: "1.8Cr", change: "+15.1%", isUp: true },
    { symbol: "SBIN", value: "98L", change: "+12.5%", isUp: true },
  ];

  // Master Mock Stock Database
  const stockDatabase: Record<string, any> = {
    TCS: {
      symbol: "TCS", name: "Tata Consultancy Services Ltd.", price: "₹3,890.10", change: "+1.8%", isUp: true,
      dayHigh: "₹3,910.00", dayLow: "₹3,840.50", volume: "2.4M", mcap: "₹14.1 Lakh Cr", pe: "31.4",
      rsi: "62.5 (Bullish)", "52wHigh": "₹4,254.75", "52wLow": "₹3,070.25", sector: "NIFTY IT"
    },
    RELIANCE: {
      symbol: "RELIANCE", name: "Reliance Industries Ltd.", price: "₹2,980.50", change: "-0.1%", isUp: false,
      dayHigh: "₹3,010.00", dayLow: "₹2,965.00", volume: "5.8M", mcap: "₹20.1 Lakh Cr", pe: "28.2",
      rsi: "51.0 (Neutral)", "52wHigh": "₹3,024.90", "52wLow": "₹2,220.30", sector: "NIFTY ENERGY"
    },
    INFY: {
      symbol: "INFY", name: "Infosys Ltd.", price: "₹1,520.30", change: "+2.4%", isUp: true,
      dayHigh: "₹1,535.00", dayLow: "₹1,490.00", volume: "4.1M", mcap: "₹6.3 Lakh Cr", pe: "24.8",
      rsi: "68.2 (Strong Bullish)", "52wHigh": "₹1,733.00", "52wLow": "₹1,355.00", sector: "NIFTY IT"
    }
  };

  // NEW: Mock data for different timeframes
  const sectorPerformance: Record<string, Record<string, { change: string; isUp: boolean }>> = {
    '1D': sectors.reduce((acc, sec) => ({ ...acc, [sec.name]: { change: sec.change, isUp: sec.isUp } }), {}),
    '1W': {
      'NIFTY IT': { change: '+4.5%', isUp: true }, 'NIFTY BANK': { change: '-1.2%', isUp: false }, 'NIFTY AUTO': { change: '+3.1%', isUp: true },
      'NIFTY PHARMA': { change: '+2.5%', isUp: true }, 'NIFTY METAL': { change: '-2.0%', isUp: false }, 'NIFTY FMCG': { change: '+1.8%', isUp: true },
      'NIFTY ENERGY': { change: '+2.2%', isUp: true }, 'NIFTY REALTY': { change: '-3.5%', isUp: false }, 'NIFTY MEDIA': { change: '+1.1%', isUp: true },
      'NIFTY PSU BANK': { change: '+5.2%', isUp: true },
    },
    '1M': {
      'NIFTY IT': { change: '+8.2%', isUp: true }, 'NIFTY BANK': { change: '+2.1%', isUp: true }, 'NIFTY AUTO': { change: '+6.5%', isUp: true },
      'NIFTY PHARMA': { change: '+5.0%', isUp: true }, 'NIFTY METAL': { change: '+1.5%', isUp: true }, 'NIFTY FMCG': { change: '+3.0%', isUp: true },
      'NIFTY ENERGY': { change: '+4.8%', isUp: true }, 'NIFTY REALTY': { change: '-1.0%', isUp: false }, 'NIFTY MEDIA': { change: '+2.5%', isUp: true },
      'NIFTY PSU BANK': { change: '+10.1%', isUp: true },
    },
    '1Y': {
      'NIFTY IT': { change: '+25.0%', isUp: true }, 'NIFTY BANK': { change: '+18.5%', isUp: true }, 'NIFTY AUTO': { change: '+45.2%', isUp: true },
      'NIFTY PHARMA': { change: '+22.1%', isUp: true }, 'NIFTY METAL': { change: '+35.8%', isUp: true }, 'NIFTY FMCG': { change: '+15.6%', isUp: true },
      'NIFTY ENERGY': { change: '+30.0%', isUp: true }, 'NIFTY REALTY': { change: '+55.0%', isUp: true }, 'NIFTY MEDIA': { change: '+12.3%', isUp: true },
      'NIFTY PSU BANK': { change: '+65.7%', isUp: true },
    },
    '5Y': {
      'NIFTY IT': { change: '+120%', isUp: true }, 'NIFTY BANK': { change: '+90%', isUp: true }, 'NIFTY AUTO': { change: '+150%', isUp: true },
      'NIFTY PHARMA': { change: '+85%', isUp: true }, 'NIFTY METAL': { change: '+180%', isUp: true }, 'NIFTY FMCG': { change: '+70%', isUp: true },
      'NIFTY ENERGY': { change: '+160%', isUp: true }, 'NIFTY REALTY': { change: '+210%', isUp: true }, 'NIFTY MEDIA': { change: '+40%', isUp: true },
      'NIFTY PSU BANK': { change: '+250%', isUp: true },
    }
  };

  const [activeMarqueeSector, setActiveMarqueeSector] = useState<any>(null);

  // HIGH IMPACT NEWS DATA WITH IMPACT STATUS

  const quickChips = [
    "Analyze Nifty support/resistance",
    "FII/DII activity in banking sector?",
    "Top 5 gainers in Nifty 50",
    "Market sentiment today"
  ];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    if (!query) return;

    if (stockDatabase[query]) {
      setSearchedStockData(stockDatabase[query]);
    } else {
      setSearchedStockData({
        symbol: query, name: `${query} India Ltd.`, price: "₹1,245.50", change: "+0.8%", isUp: true,
        dayHigh: "₹1,260.00", dayLow: "₹1,230.00", volume: "1.2M", mcap: "₹45,000 Cr", pe: "22.5",
        rsi: "55.4 (Neutral)", "52wHigh": "₹1,400.00", "52wLow": "₹980.00", sector: "EQUITY"
      });
    }
  };

  const handleAskAI = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai-conclusion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ marketData: allIndices, userPrompt: prompt })
      });
      const data = await res.json();
      if (data.success) setAiResponse(data.conclusion);
      else setAiResponse("त्रुटी: उत्तर मिळवता आले नाही.");
    } catch (err) {
      setAiResponse("सर्व्हर एरर: बॅकएंडशी संपर्क होऊ शकला नाही.");
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  useEffect(() => {
    if (!activeMarqueeSector && sectors.length > 0) {
      setActiveMarqueeSector(sectors[0]);
    }
  }, [sectors, activeMarqueeSector]);

  const marqueeItems = tapeMode === 'SECTORS'
    ? activeMarqueeSector?.stocks || []
    : allIndices.map(i => ({ symbol: i.name, price: i.price, change: i.change, isUp: i.isUp }));


  return (
    <>
      <div style={{ backgroundColor: '#05080E', height: '100vh', color: '#E2E8F0', display: 'flex', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden' }}>

        {/* CSS STYLING */}
        <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: 200%;
          animation: marquee 20s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }

        /* ULTRA PREMIUM SEARCH BAR GLOW */
        .ultra-search-container {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(10, 15, 26, 0.95)) !important;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(34, 197, 94, 0.4) !important;
          box-shadow: 0 0 25px rgba(34, 197, 94, 0.12), inset 0 0 15px rgba(34, 197, 94, 0.05);
          transition: all 0.3s ease-in-out;
        }
        .ultra-search-container:focus-within {
          border-color: #22C55E !important;
          box-shadow: 0 0 35px rgba(34, 197, 94, 0.35), inset 0 0 20px rgba(34, 197, 94, 0.1) !important;
        }

        /* TOP SEARCH BAR STYLING */
        .top-search-container {
          transition: all 0.3s ease-in-out;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background-color: rgba(10, 15, 26, 0.8);
        }
        .top-search-container:focus-within {
          background-color: rgba(15, 23, 42, 0.9);
          border-color: #3B82F6;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
        }

        .news-item:hover {
          transform: translateY(-2px);
          background-color: rgba(15, 23, 42, 0.9) !important;
        }

        /* IMPROVED CARD STYLING */
        .card-glow {
          background-color: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.07);
          transition: all 0.2s ease-in-out;
        }
        .card-glow:hover {
          transform: translateY(-2px);
          background-color: rgba(15, 23, 42, 0.9);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);
        }

        /* RESPONSIVE DESIGN QUERIES */
        @media (max-width: 960px) {
          .four-col-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .six-col-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .five-col-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .main-header { flex-direction: column; gap: 12px; align-items: flex-start; }
          .pinned-indices-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .two-col-grid { grid-template-columns: 1fr !important; }
          .six-col-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stock-detail-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .pinned-indices-grid { grid-template-columns: 1fr !important; }
          .four-col-grid { grid-template-columns: 1fr !important; }
          .six-col-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .five-col-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .top-search-container { width: 100% !important; }
          .header-form { width: 100%; }
          .ai-prompt-container { flex-direction: column; }
          .ai-prompt-badge { border-right: none !important; padding-right: 0 !important; }
          .ai-prompt-button { width: 100%; justify-content: center; }
        }
      `}</style>

        <div style={{ width: '100%', maxWidth: '980px', height: '100vh', display: 'flex', flexDirection: 'column', padding: '0 14px' }}>

          {/* BACKGROUND GLOW */}
          <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse at top, rgba(34, 197, 94, 0.15), transparent 70%)', zIndex: -1, opacity: 0.8 }}></div>

          {/* MAIN SCROLLABLE AREA */}
          <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '12px 0 6px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* HEADER WITH TOP SEARCH BAR */}
            <header className="main-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E', boxShadow: '0 0 10px #22C55E' }} />
                <h1 style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '0.6px', margin: 0, color: '#F8FAFC' }}>
                  NEO<span style={{ color: '#22C55E' }}>TERMINAL</span>
                </h1>
              </div>

              {/* TOP STOCK QUICK LOOKUP */}
              <form onSubmit={handleSearch} className="header-form" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="top-search-container" style={{ position: 'relative', width: '200px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                  <Search style={{ position: 'absolute', left: '10px', top: '7px', width: '13px', height: '13px', color: '#64748B' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Stock Search (उदा. RELIANCE, HDFCBANK...)"
                    style={{ width: '100%', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', padding: '6px 10px 6px 30px', color: '#FFF', fontSize: '11px', outline: 'none' }}
                  />
                </div>
                <button type="submit" style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#22C55E', color: '#0B0F17', border: 'none', borderRadius: '8px', fontSize: '10px', fontWeight: '800' }}>
                  SEARCH
                </button>
              </form>
            </header>

            {/* PINNED INDICES - LIVE NSE DATA */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', letterSpacing: '0.5px' }}>
                  PINNED INDICES (LIVE NSE)
                </span>
                <button onClick={() => setShowIndexSettings(true)} style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#94A3B8', padding: '2px 8px', borderRadius: '5px', fontSize: '10px', cursor: 'pointer' }}>
                  <Settings style={{ width: '10px', height: '10px' }} /> Configure
                </button>
              </div>

              <div className="pinned-indices-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${liveIndices.filter(idx => selectedIndices.includes(idx.name)).length > 0 ? liveIndices.filter(idx => selectedIndices.includes(idx.name)).length : 1}, 1fr)`, gap: '10px' }}>
                {loadingMarketData && liveIndices.length === 0 ? (
                  <p style={{ fontSize: '11px', color: '#64748B' }}>Loading Live NSE Data...</p>
                ) : (
                  liveIndices.length > 0 &&
                  liveIndices.filter(idx => selectedIndices.includes(idx.name)).map((idx) => (
                    <div key={idx.name} style={{ padding: '10px 12px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.07)', borderLeft: `3px solid ${idx.isUp ? '#22C55E' : '#EF4444'}`, borderRadius: '10px' }}>
                      <p style={{ fontSize: '10px', color: '#94A3B8', margin: 0, fontWeight: '600' }}>{idx.name}</p>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '3px' }}>
                        <span style={{ fontSize: '15px', fontWeight: '700', color: '#F8FAFC' }}>{idx.price}</span>
                        <span style={{ fontSize: '10px', color: idx.isUp ? '#22C55E' : '#EF4444', fontWeight: '700' }}>
                          {idx.isUp ? '▲' : '▼'} {idx.change}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* GLOBAL MARKETS, COMMODITIES, GAINERS & LOSERS */}
            <div className="six-col-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
              {/* Global Markets */}
              <div>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>GLOBAL MARKETS</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {globalIndices.map((idx) => (
                    <div key={idx.name} className="card-glow" style={{ padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', fontWeight: '700', color: '#E2E8F0' }}>{idx.name}</span>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '11px', fontWeight: '700', color: '#FFF', margin: 0 }}>{idx.price}</p>
                        <p style={{ fontSize: '10px', fontWeight: '700', margin: '1px 0 0 0', color: idx.isUp ? '#22C55E' : '#EF4444' }}>{idx.isUp ? '▲' : '▼'} {idx.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Commodities */}
              <div>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>COMMODITIES</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {loadingMarketData && commodities.length === 0 ? (
                    <div className="card-glow" style={{ padding: '8px 12px', borderRadius: '8px' }}><p style={{ fontSize: '10px', color: '#64748B', margin: 0 }}>Loading...</p></div>
                  ) : (
                    commodities.map((com) => (
                      <div key={com.name} className="card-glow" style={{ padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', fontWeight: '700', color: '#E2E8F0' }}>{com.name}</span>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ fontSize: '11px', fontWeight: '700', color: '#FFF', margin: 0 }}>{com.price}</p>
                          <p style={{ fontSize: '10px', fontWeight: '700', margin: '1px 0 0 0', color: com.isUp ? '#22C55E' : '#EF4444' }}>{com.isUp ? '▲' : '▼'} {com.change}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              {/* Top Gainer */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <TrendingUp style={{ color: '#22C55E', width: '14px', height: '14px' }} />
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', letterSpacing: '0.5px' }}>TOP GAINERS</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {loadingMarketData && topGainers.length === 0 ? (
                    <div className="card-glow" style={{ padding: '8px 12px', borderRadius: '8px' }}><p style={{ fontSize: '10px', color: '#64748B', margin: 0 }}>Loading...</p></div>
                  ) : (
                    topGainers.map((stock) => (
                      <div key={stock.symbol} className="card-glow" style={{ padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', fontWeight: '700', color: '#E2E8F0' }}>{stock.symbol}</span>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ fontSize: '11px', fontWeight: '700', color: '#FFF', margin: 0 }}>{stock.price}</p>
                          <p style={{ fontSize: '10px', fontWeight: '700', margin: '1px 0 0 0', color: stock.isUp ? '#22C55E' : '#EF4444' }}>{stock.isUp ? '▲' : '▼'} {stock.change}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <TrendingUp style={{ color: '#EF4444', width: '14px', height: '14px', transform: 'scaleY(-1) rotate(45deg)' }} />
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', letterSpacing: '0.5px' }}>TOP LOSERS</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {loadingMarketData && topLosers.length === 0 ? (
                    <div className="card-glow" style={{ padding: '8px 12px', borderRadius: '8px' }}><p style={{ fontSize: '10px', color: '#64748B', margin: 0 }}>Loading...</p></div>
                  ) : (
                    topLosers.map((stock) => (
                      <div key={stock.symbol} className="card-glow" style={{ padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', fontWeight: '700', color: '#E2E8F0' }}>{stock.symbol}</span>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ fontSize: '11px', fontWeight: '700', color: '#FFF', margin: 0 }}>{stock.price}</p>
                          <p style={{ fontSize: '10px', fontWeight: '700', margin: '1px 0 0 0', color: stock.isUp ? '#22C55E' : '#EF4444' }}>{stock.isUp ? '▲' : '▼'} {stock.change}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              {/* IO Gainers */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Zap style={{ color: '#F59E0B', width: '14px', height: '14px' }} />
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', letterSpacing: '0.5px' }}>IO GAINERS</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {ioGainers.map((stock) => (
                    <div key={stock.symbol} className="card-glow" style={{ padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', fontWeight: '700', color: '#E2E8F0' }}>{stock.symbol}</span>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '11px', fontWeight: '700', color: '#FFF', margin: 0 }}>{stock.value}</p>
                        <p style={{ fontSize: '10px', fontWeight: '700', margin: '1px 0 0 0', color: '#22C55E' }}>▲ {stock.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Volume Gainers */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Flame style={{ color: '#3B82F6', width: '14px', height: '14px' }} />
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', letterSpacing: '0.5px' }}>VOLUME GAINERS</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {loadingMarketData && volumeGainers.length === 0 ? (
                    <div className="card-glow" style={{ padding: '8px 12px', borderRadius: '8px' }}><p style={{ fontSize: '10px', color: '#64748B', margin: 0 }}>Loading...</p></div>
                  ) : (
                    volumeGainers.map((stock) => (
                      <div key={stock.symbol} className="card-glow" style={{ padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', fontWeight: '700', color: '#E2E8F0' }}>{stock.symbol}</span>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ fontSize: '11px', fontWeight: '700', color: '#FFF', margin: 0 }}>{stock.volume}</p>
                          <p style={{ fontSize: '10px', fontWeight: '700', margin: '1px 0 0 0', color: stock.isUp ? '#22C55E' : '#EF4444' }}>{stock.isUp ? '▲' : '▼'} {stock.change}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* ALL SECTORAL HEATMAP & LIVE TAPE */}
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

              {/* FULL SECTORS GRID (5 Columns) */}
              <div className="five-col-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
                {loadingMarketData && sectors.length === 0 ? (
                  <p style={{ fontSize: '11px', color: '#64748B', gridColumn: '1 / -1' }}>Loading Sector Data...</p>
                ) : (
                  sectors.map((sec, i) => {
                    const perf = sectorPerformance[sectorTimeframe]?.[sec.name] || { change: sec.change, isUp: sec.isUp };
                    return (<div
                      key={i}
                      onClick={() => {
                        // setActiveMarqueeSector(sec); // This might not work as `sec` doesn't have `stocks`
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

              {/* LIVE TAPE TOGGLE BAR */}
              <div style={{ backgroundColor: 'rgba(10, 15, 26, 0.9)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '8px', padding: '6px 10px', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', backgroundColor: 'rgba(0,0,0,0.6)', padding: '2px', borderRadius: '5px', gap: '2px' }}>
                  <button
                    onClick={() => setTapeMode('SECTORS')}
                    style={{
                      backgroundColor: tapeMode === 'SECTORS' ? '#3B82F6' : 'transparent',
                      color: tapeMode === 'SECTORS' ? '#0F172A' : '#94A3B8',
                      border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: '800', cursor: 'pointer'
                    }}
                  >
                    SECTOR
                  </button>
                  <button
                    onClick={() => setTapeMode('INDICES')}
                    style={{
                      backgroundColor: tapeMode === 'INDICES' ? '#22C55E' : 'transparent',
                      color: tapeMode === 'INDICES' ? '#0F172A' : '#94A3B8',
                      border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: '800', cursor: 'pointer'
                    }}
                  >
                    INDEX
                  </button>
                </div>

                {/* MARQUEE TAPE */}
                <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                  <div className="marquee-track">
                    {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((stk, idx) => (
                      <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginRight: '28px', fontSize: '10px' }}>
                        <span style={{ fontWeight: '700', color: '#F1F5F9' }}>{stk.symbol}</span>
                        <span style={{ color: '#94A3B8' }}>{stk.price}</span>
                        <span style={{ color: stk.isUp ? '#22C55E' : '#EF4444', fontWeight: '700' }}>
                          {stk.isUp ? '▲' : '▼'} {stk.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* HIGH IMPACT MARKET NEWS & BREAKOUTS WITH IMPACT TAGS */}
            <section style={{ padding: '12px 14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Newspaper style={{ color: '#F59E0B', width: '14px', height: '14px' }} />
                  <h3 style={{ fontSize: '11px', fontWeight: '700', margin: 0, color: '#E2E8F0' }}>LIVE MARKET IMPACT & BREAKOUT NEWS</h3>
                </div>
                <span style={{ fontSize: '9px', color: '#64748B' }}>Click news item for detailed analysis</span>
              </div>

              <div className="two-col-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {newsList.map((item) => {
                  const isBull = item.impactType === 'bull';
                  const isBear = item.impactType === 'bear';
                  const tagBg = isBull ? 'rgba(34, 197, 94, 0.15)' : isBear ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)';
                  const tagColor = isBull ? '#22C55E' : isBear ? '#EF4444' : '#F59E0B';
                  const tagBorder = isBull ? '1px solid rgba(34, 197, 94, 0.3)' : isBear ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)';

                  const Icon = item.category === 'STOCKS' ? TrendingUp : item.category === 'COMMODITY' ? Flame : AlertTriangle;

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedNews(item);
                        if (item.link) window.open(item.link, '_blank');
                      }}
                      className="news-item"
                      style={{
                        padding: '10px 12px',
                        backgroundColor: 'rgba(10, 15, 26, 0.7)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease, background-color 0.2s',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center'
                      }}
                    >
                      {/* Icon */}
                      <div style={{ color: tagColor, alignSelf: 'flex-start', marginTop: '4px' }}>
                        <Icon style={{ width: '16px', height: '16px' }} />
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <span style={{ fontSize: '8px', fontWeight: '800', backgroundColor: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '4px', color: '#94A3B8' }}>
                              {item.category}
                            </span>
                            <span style={{ fontSize: '9px', fontWeight: '800', color: '#F8FAFC' }}>
                              {item.tag}
                            </span>
                          </div>
                          <span style={{ fontSize: '9px', color: '#64748B' }}>{item.time}</span>
                        </div>

                        <p style={{ fontSize: '11px', fontWeight: '700', color: '#F1F5F9', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {item.title}
                        </p>

                        <span style={{ fontSize: '9px', fontWeight: '800', backgroundColor: tagBg, color: tagColor, border: tagBorder, padding: '2px 8px', borderRadius: '5px', letterSpacing: '0.4px', alignSelf: 'flex-start' }}>
                          IMPACT: {item.impact}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ULTRA HIGH-HIGHLIGHT AI SUMMARY CARD */}
            <div style={{
              padding: '14px 16px',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              backgroundColor: 'rgba(10, 15, 26, 0.95)',
              borderRadius: '12px',
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.1)',
              marginBottom: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Sparkles style={{ width: '16px', height: '16px', color: '#22C55E', marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <p style={{ fontSize: '10px', fontWeight: '900', color: '#22C55E', margin: 0, letterSpacing: '0.8px' }}>
                      GEMINI AI MARKET ANALYSIS
                    </p>
                    <span style={{ fontSize: '9px', color: '#64748B', fontWeight: '600' }}>LIVE INSIGHT</span>
                  </div>

                  {loading ? (
                    <span style={{ fontSize: '12px', color: '#94A3B8' }}>Analyzing market setup & volume profiles...</span>
                  ) : (
                    <p style={{ fontSize: '12px', color: '#F1F5F9', margin: 0, lineHeight: '1.5', fontWeight: '500' }}>{aiResponse}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ================= HIGH-END ULTRA PREMIUM AI SEARCH / PROMPT BAR ================= */}
          <div style={{ padding: '12px 0 16px 0', backgroundColor: '#05080E', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            {/* QUICK CHIPS */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', padding: '0 4px', flexWrap: 'wrap' }}>
              {quickChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setPrompt(chip)}
                  style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    color: '#22C55E',
                    padding: '4px 10px',
                    borderRadius: '16px',
                    fontSize: '10px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
            <div
              className="ultra-search-container ai-prompt-container"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRadius: '16px',
                padding: '6px 8px 6px 14px',
              }}
            >
              {/* Terminal Badge & Icon */}
              <div className="ai-prompt-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '12px', borderRight: '1px solid rgba(255, 255, 255, 0.12)' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '8px', backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Terminal style={{ width: '14px', height: '14px', color: '#22C55E' }} />
                </div>
                <div>
                  <p style={{ fontSize: '9px', fontWeight: '900', color: '#22C55E', margin: 0, letterSpacing: '0.6px' }}>GEMINI AI</p>
                  <p style={{ fontSize: '8px', color: '#64748B', margin: 0, fontWeight: '700' }}>TERMINAL v2</p>
                </div>
              </div>

              {/* Input Field */}
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                placeholder="Ask AI (e.g., Analyze Nifty support/resistance, FII/DII activity in banking sector?)"
                style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: '#FFF', fontSize: '12px', outline: 'none', fontWeight: '500' }}
              />

              {/* Action Send Button */}
              <button
                onClick={handleAskAI}
                disabled={loading}
                className="ai-prompt-button"
                style={{
                  backgroundColor: loading ? '#64748B' : '#22C55E',
                  color: '#05080E',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: '900',
                  fontSize: '11px',
                  boxShadow: loading ? 'none' : '0 0 16px rgba(34, 197, 94, 0.5)',
                  transition: 'transform 0.1s ease, background-color 0.2s'
                }}
              >
                {loading ? (
                  <Loader2 style={{ width: '14px', height: '14px' }} className="animate-spin" />
                ) : (
                  <>
                    <span>ANALYZE</span>
                    <ChevronRight style={{ width: '13px', height: '13px', strokeWidth: 3 }} />
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* DETAILED NEWS IMPACT MODAL */}
        {selectedNews && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
            <div style={{ width: '100%', maxWidth: '480px', backgroundColor: '#0F172A', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '14px', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                <div>
                  <span style={{ fontSize: '9px', fontWeight: '800', backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B', padding: '2px 6px', borderRadius: '4px' }}>{selectedNews.category}</span>
                  <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#FFF', margin: '6px 0 0 0' }}>{selectedNews.title}</h2>
                </div>
                <button onClick={() => setSelectedNews(null)} style={{ backgroundColor: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                  <X style={{ width: '18px', height: '18px' }} />
                </button>
              </div>

              <div style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ fontSize: '10px', color: '#64748B', margin: 0, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Description</p>
                <p style={{ fontSize: '12px', color: '#E2E8F0', margin: '4px 0 0 0', lineHeight: '1.6' }}>{selectedNews.desc}</p>
              </div>

              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '10px', backgroundColor: 'rgba(10, 15, 26, 0.8)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: '10px', color: '#64748B', margin: 0, fontWeight: '700' }}>IMPACT ANALYSIS</p>
                  <p style={{ fontSize: '12px', fontWeight: '800', color: selectedNews.impactType === 'bull' ? '#22C55E' : selectedNews.impactType === 'bear' ? '#EF4444' : '#F59E0B', margin: '2px 0 0 0' }}>{selectedNews.impact}</p>
                </div>

                <div style={{ padding: '10px', backgroundColor: 'rgba(10, 15, 26, 0.8)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: '10px', color: '#64748B', margin: 0, fontWeight: '700' }}>AFFECTED SECTORS / STOCKS</p>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#E2E8F0', margin: '2px 0 0 0' }}>{selectedNews.affectedSector}</p>
                </div>

                <div style={{ padding: '10px', backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.25)' }}>
                  <p style={{ fontSize: '10px', color: '#22C55E', margin: 0, fontWeight: '800' }}>ACTIONABLE TRADING STRATEGY</p>
                  <p style={{ fontSize: '11px', fontWeight: '600', color: '#F1F5F9', margin: '2px 0 0 0' }}>{selectedNews.actionableStrategy}</p>
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <button onClick={() => setSelectedNews(null)} style={{ width: '100%', backgroundColor: '#22C55E', color: '#0B0F17', border: 'none', padding: '9px', borderRadius: '8px', fontWeight: '800', fontSize: '11px', cursor: 'pointer' }}>
                  CLOSE ANALYSIS
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SEARCH STOCK DETAIL MODAL */}
        {searchedStockData && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
            <div style={{ width: '100%', maxWidth: '480px', backgroundColor: '#0F172A', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '14px', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFF', margin: 0 }}>{searchedStockData.symbol}</h2>
                    <span style={{ fontSize: '10px', backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>{searchedStockData.sector}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#94A3B8', margin: '2px 0 0 0' }}>{searchedStockData.name}</p>
                </div>
                <button onClick={() => setSearchedStockData(null)} style={{ backgroundColor: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                  <X style={{ width: '18px', height: '18px' }} />
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '14px 0' }}>
                <span style={{ fontSize: '24px', fontWeight: '800', color: '#FFF' }}>{searchedStockData.price}</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: searchedStockData.isUp ? '#22C55E' : '#EF4444', display: 'flex', alignItems: 'center' }}>
                  {searchedStockData.isUp ? '▲' : '▼'} {searchedStockData.change}
                </span>
              </div>

              <div className="stock-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', backgroundColor: 'rgba(10, 15, 26, 0.8)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <p style={{ fontSize: '10px', color: '#64748B', margin: 0 }}>Day's High / Low</p>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#E2E8F0', margin: '2px 0 0 0' }}>{searchedStockData.dayHigh} / {searchedStockData.dayLow}</p>
                </div>
                <div>
                  <p style={{ fontSize: '10px', color: '#64748B', margin: 0 }}>Volume</p>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#E2E8F0', margin: '2px 0 0 0' }}>{searchedStockData.volume}</p>
                </div>
                <div>
                  <p style={{ fontSize: '10px', color: '#64748B', margin: 0 }}>Market Cap</p>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#E2E8F0', margin: '2px 0 0 0' }}>{searchedStockData.mcap}</p>
                </div>
                <div>
                  <p style={{ fontSize: '10px', color: '#64748B', margin: 0 }}>P/E Ratio</p>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#E2E8F0', margin: '2px 0 0 0' }}>{searchedStockData.pe}</p>
                </div>
              </div>

              <div style={{ marginTop: '14px' }}>
                <button onClick={() => setSearchedStockData(null)} style={{ width: '100%', backgroundColor: '#22C55E', color: '#0B0F17', border: 'none', padding: '9px', borderRadius: '8px', fontWeight: '800', fontSize: '11px', cursor: 'pointer' }}>
                  CLOSE VIEW
                </button>
              </div>
            </div>
          </div>
        )}
        {/* PINNED INDICES SETTINGS MODAL */}
        {showIndexSettings && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
            <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#0F172A', border: '1px solid rgba(59, 130, 246, 0.4)', borderRadius: '14px', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#FFF', margin: 0 }}>Configure Pinned Indices</h2>
                <button onClick={() => setShowIndexSettings(false)} style={{ backgroundColor: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                  <X style={{ width: '18px', height: '18px' }} />
                </button>
              </div>

              <div style={{ display: 'flex', gap: '8px', margin: '14px 0' }}>
                <button onClick={() => setSelectedIndices(allIndices.map(i => i.id))} style={{ flex: 1, backgroundColor: 'rgba(59, 130, 246, 0.2)', border: '1px solid #3B82F6', color: '#E2E8F0', padding: '6px', borderRadius: '6px', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}>SHOW ALL</button>
                <button onClick={() => setSelectedIndices([])} style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#94A3B8', padding: '6px', borderRadius: '6px', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}>HIDE ALL</button>
              </div>

              <div className="no-scrollbar" style={{ maxHeight: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '6px' }}>
                {loadingMarketData && liveIndices.length === 0 ? (
                  <p style={{ fontSize: '11px', color: '#94A3B8', textAlign: 'center' }}>Loading indices...</p>
                ) : (
                  liveIndices.map(idx => (
                    <label key={idx.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', backgroundColor: 'rgba(10, 15, 26, 0.7)', borderRadius: '6px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedIndices.includes(idx.name)}
                        onChange={() => {
                          setSelectedIndices(prev =>
                            prev.includes(idx.name) ? prev.filter(id => id !== idx.name) : [...prev, idx.name]
                          );
                        }}
                        style={{ width: '14px', height: '14px', accentColor: '#22C55E' }}
                      />
                      <span style={{ fontSize: '11px', fontWeight: '600', color: '#E2E8F0' }}>{idx.name}</span>
                    </label>
                  ))
                )}
              </div>

              <button onClick={() => setShowIndexSettings(false)} style={{ width: '100%', marginTop: '16px', backgroundColor: '#22C55E', color: '#0B0F17', border: 'none', padding: '9px', borderRadius: '8px', fontWeight: '800', fontSize: '11px', cursor: 'pointer' }}>
                DONE
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
