"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { Flame, Send, Search, PieChart, X, Settings, Sparkles, Loader2, Terminal, ChevronRight, Zap, Newspaper, TrendingUp, AlertTriangle } from 'lucide-react';

// Import custom components
import Header from './components/Header';
import PinnedIndices from './components/PinnedIndices'; // Corrected import path
import IndexSettingsModal from './components/modals/IndexSettingsModal';
import StockDetailModal from './components/modals/StockDetailModal';
import NewsImpactModal from './components/modals/NewsImpactModal';

// These components would be created similarly. I'm adding placeholders for now.
const MarketOverview = ({ globalIndices, loadingMarketData, commodities, topGainers, topLosers, ioGainers, volumeGainers }: any) => <div />;
const SectorHeatmap = ({ sectors, loadingMarketData, sectorPerformance, sectorTimeframe, setSectorTimeframe, activeMarqueeSector, setSelectedSectorModal, tapeMode, setTapeMode, marqueeItems }: any) => <div />;
const NewsFeed = ({ newsList, setSelectedNews }: any) => <div />;
const AIAnalysis = ({ loading, aiResponse }: any) => <div />;
const AIPromptBar = ({ prompt, setPrompt, handleAskAI, loading, quickChips }: any) => <div />;
const SectorDetailModal = ({ selectedSectorModal, setSelectedSectorModal }: any) => <div />; // This is still a placeholder




// डेटासाठी इंटरफेस तयार करणे
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


    const [marketData, setMarketData] = useState({
        indices: [],
        commodities: [],
        sectorData: [],
        topGainers: [],
        topLosers: [],
        volumeGainers: []
    });


    // Frontend State

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
                setLoadingMarketData(true);
                const res = await fetch('/api/market-data');
                const data = await res.json();

                if (data.success) {
                    setLiveIndices(data.indices || []);
                    setCommodities(data.commodities || []);
                    setTopGainers(data.topGainers || []);
                    setTopLosers(data.topLosers || []);
                    setVolumeGainers(data.volumeGainers || []);
                    setSectors(data.sectorData || []);
                    setMarketData(data); // Also update the single marketData state
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

    // Memoize allIndices to prevent re-computation on every render
    const allIndices = useMemo(() => liveIndices.map(idx => ({
        id: idx.name,
        name: idx.name,
        price: idx.price,
        change: idx.change,
        isUp: idx.isUp
    })), [liveIndices]);


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
        <div style={{ backgroundColor: '#05080E', height: '100vh', color: '#E2E8F0', display: 'flex', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden' }}>
            <div style={{ width: '100%', maxWidth: '980px', height: '100vh', display: 'flex', flexDirection: 'column', padding: '0 14px' }}>

                {/* BACKGROUND GLOW */}
                <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse at top, rgba(34, 197, 94, 0.15), transparent 70%)', zIndex: -1, opacity: 0.8 }}></div>

                {/* MAIN SCROLLABLE AREA */}
                <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '12px 0 6px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>

                    <Header
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        handleSearch={handleSearch}
                    />

                    {/* PINNED INDICES - LIVE NSE DATA */}
                    <PinnedIndices
                        loadingMarketData={loadingMarketData}
                        liveIndices={liveIndices}
                        selectedIndices={selectedIndices}
                        onShowSettings={() => setShowIndexSettings(true)}
                    />

                    <MarketOverview
                        globalIndices={globalIndices}
                        loadingMarketData={loadingMarketData}
                        commodities={commodities}
                        topGainers={topGainers}
                        topLosers={topLosers}
                        ioGainers={ioGainers}
                        volumeGainers={volumeGainers}
                    />

                    <SectorHeatmap
                        sectors={sectors}
                        loadingMarketData={loadingMarketData}
                        sectorPerformance={sectorPerformance[sectorTimeframe]}
                        sectorTimeframe={sectorTimeframe}
                        setSectorTimeframe={setSectorTimeframe}
                        activeMarqueeSector={activeMarqueeSector}
                        setSelectedSectorModal={setSelectedSectorModal}
                        tapeMode={tapeMode}
                        setTapeMode={setTapeMode}
                        marqueeItems={marqueeItems}
                    />

                    <NewsFeed newsList={newsList} setSelectedNews={setSelectedNews} />

                    <AIAnalysis loading={loading} aiResponse={aiResponse} />
                </div>

                {/* ================= HIGH-END ULTRA PREMIUM AI SEARCH / PROMPT BAR ================= */}
                <AIPromptBar
                    prompt={prompt}
                    setPrompt={setPrompt}
                    handleAskAI={handleAskAI}
                    loading={loading}
                    quickChips={quickChips}
                />

            </div>

            {/* DETAILED NEWS IMPACT MODAL */}
            {selectedNews && <NewsImpactModal selectedNews={selectedNews} onClose={() => setSelectedNews(null)} />}

            {/* SEARCH STOCK DETAIL MODAL */}
            {searchedStockData && <StockDetailModal stockData={searchedStockData} onClose={() => setSearchedStockData(null)} />}

            {/* PINNED INDICES SETTINGS MODAL */}
            {showIndexSettings && <IndexSettingsModal
                onClose={() => setShowIndexSettings(false)}
                allIndices={allIndices}
                liveIndices={liveIndices}
                loadingMarketData={loadingMarketData}
                selectedIndices={selectedIndices}
                setSelectedIndices={setSelectedIndices}
            />}

            {/* Note: Create and import SectorDetailModal component similarly */}
            {selectedSectorModal && <SectorDetailModal selectedSectorModal={selectedSectorModal} setSelectedSectorModal={setSelectedSectorModal} />}
        </div>
    );
}