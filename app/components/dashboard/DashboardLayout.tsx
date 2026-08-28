'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PinnedIndices from './PinnedIndices';
import Header from './Header';
// import ActiveStocks from './ActiveStocks'; future use
import AiResponseBox from './AiResponseBox';
import MarketNews from './MarketNews';
import SectoralHeatmap from './SectoralHeatmap';
import AiPromptBar from './AiPromptBar';
import AuthModal from '../authmodel';

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

export default function DashboardLayout() {
    // -------------------- UI state --------------------
    const [prompt, setPrompt] = useState("");
    const [aiResponse, setAiResponse] = useState("FII buying support seen in Banking & IT sectors. Overall Market Bias: Mild Bullish.");
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedStockData, setSearchedStockData] = useState<any>(null);
    const [selectedNews, setSelectedNews] = useState<any>(null);
    const [newsList, setNewsList] = useState<any[]>([]);
    const [tapeMode, setTapeMode] = useState<'SECTORS' | 'INDICES'>('SECTORS');
    const [sectorTimeframe, setSectorTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | '5Y'>('1D');
    const [selectedSectorModal, setSelectedSectorModal] = useState<any>(null);
    const [showIndexSettings, setShowIndexSettings] = useState<boolean>(false);
    const [liveIndices, setLiveIndices] = useState<IndexData[]>([]);
    const [commodities, setCommodities] = useState<IndexData[]>([]);
    const [topGainers, setTopGainers] = useState<StockPerformance[]>([]);
    const [topLosers, setTopLosers] = useState<StockPerformance[]>([]);
    const [volumeGainers, setVolumeGainers] = useState<VolumeGainer[]>([]);
    const [sectors, setSectors] = useState<any[]>([]);
    const [loadingMarketData, setLoadingMarketData] = useState<boolean>(true);
    const [selectedIndices, setSelectedIndices] = useState<string[]>(['NIFTY 50', 'NIFTY BANK', 'NIFTY FINANCIAL SERVICES', 'NIFTY 500', 'NIFTY 200', 'NIFTY 100', 'NIFTY MID SELECT']);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    const isAuthenticated = status === 'authenticated';
    const userEmail = session?.user?.email ?? '';

    const handleOpenAuth = () => {
        router.push('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        signOut({ callbackUrl: '/' });
    };

    const handleAuthSuccess = (email: string) => {
        console.log(`Auth success for ${email} from within dashboard modal.`);
        setIsAuthOpen(false); // Close the modal on success
    };

    // -------------------- Data fetching --------------------
    const fetchNews = useCallback(async () => {
        try {
            const res = await fetch('/api/news', { cache: 'no-store' });
            const json = await res.json();
            if (json.success) {
                setNewsList(json.news || []);
            }
        } catch (err) {
            console.error('Failed to load news', err);
        }
    }, []);

    useEffect(() => {
        fetchNews();
        const interval = window.setInterval(fetchNews, 60000);
        return () => window.clearInterval(interval);
    }, [fetchNews]);

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

    // -------------------- Search handling --------------------
    const handleSearch = (e: any) => {
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

    const fetchMarketData = useCallback(async () => {
        try {
            setLoadingMarketData(true);
            const res = await fetch('/api/market-data', { cache: 'no-store' });
            const data = await res.json();

            if (data.success) {
                setLiveIndices(data.indices || []);
                setCommodities(data.commodities || []);
                setTopGainers(data.topGainers || []);
                setTopLosers(data.topLosers || []);
                setVolumeGainers(data.volumeGainers || []);
                setSectors(data.sectorData || []);
            }
        } catch (err) {
            console.error('❌ NSE Data Fetch Failed:', err);
        } finally {
            setLoadingMarketData(false);
        }
    }, []);

    useEffect(() => {
        fetchMarketData();
        const interval = window.setInterval(fetchMarketData, 10000);
        return () => window.clearInterval(interval);
    }, [fetchMarketData]);

    // -------------------- Derived values --------------------
    const allIndices = useMemo(() => liveIndices.map(idx => ({
        id: idx.name,
        name: idx.name,
        price: idx.price,
        change: idx.change,
        isUp: idx.isUp
    })), [liveIndices]);


    const sectorPerformance: Record<string, Record<string, { change: string; isUp: boolean }>> = {
        '1D': sectors.reduce((acc, sec) => ({ ...acc, [sec.name]: { change: sec.change, isUp: sec.isUp } }), {}),
        '1W': { 'NIFTY IT': { change: '+4.5%', isUp: true }, 'NIFTY BANK': { change: '-1.2%', isUp: false }, 'NIFTY AUTO': { change: '+3.1%', isUp: true }, 'NIFTY PHARMA': { change: '+2.5%', isUp: true }, 'NIFTY METAL': { change: '-2.0%', isUp: false }, 'NIFTY FMCG': { change: '+1.8%', isUp: true }, 'NIFTY ENERGY': { change: '+2.2%', isUp: true }, 'NIFTY REALTY': { change: '-3.5%', isUp: false }, 'NIFTY MEDIA': { change: '+1.1%', isUp: true }, 'NIFTY PSU BANK': { change: '+5.2%', isUp: true } },
        '1M': { 'NIFTY IT': { change: '+8.2%', isUp: true }, 'NIFTY BANK': { change: '+2.1%', isUp: true }, 'NIFTY AUTO': { change: '+6.5%', isUp: true }, 'NIFTY PHARMA': { change: '+5.0%', isUp: true }, 'NIFTY METAL': { change: '+1.5%', isUp: true }, 'NIFTY FMCG': { change: '+3.0%', isUp: true }, 'NIFTY ENERGY': { change: '+4.8%', isUp: true }, 'NIFTY REALTY': { change: '-1.0%', isUp: false }, 'NIFTY MEDIA': { change: '+2.5%', isUp: true }, 'NIFTY PSU BANK': { change: '+10.1%', isUp: true } },
        '1Y': { 'NIFTY IT': { change: '+25.0%', isUp: true }, 'NIFTY BANK': { change: '+18.5%', isUp: true }, 'NIFTY AUTO': { change: '+45.2%', isUp: true }, 'NIFTY PHARMA': { change: '+22.1%', isUp: true }, 'NIFTY METAL': { change: '+35.8%', isUp: true }, 'NIFTY FMCG': { change: '+15.6%', isUp: true }, 'NIFTY ENERGY': { change: '+30.0%', isUp: true }, 'NIFTY REALTY': { change: '+55.0%', isUp: true }, 'NIFTY MEDIA': { change: '+12.3%', isUp: true }, 'NIFTY PSU BANK': { change: '+65.7%', isUp: true } },
        '5Y': { 'NIFTY IT': { change: '+120%', isUp: true }, 'NIFTY BANK': { change: '+90%', isUp: true }, 'NIFTY AUTO': { change: '+150%', isUp: true }, 'NIFTY PHARMA': { change: '+85%', isUp: true }, 'NIFTY METAL': { change: '+180%', isUp: true }, 'NIFTY FMCG': { change: '+70%', isUp: true }, 'NIFTY ENERGY': { change: '+160%', isUp: true }, 'NIFTY REALTY': { change: '+210%', isUp: true }, 'NIFTY MEDIA': { change: '+40%', isUp: true }, 'NIFTY PSU BANK': { change: '+250%', isUp: true } }
    };

    const [activeMarqueeSector, setActiveMarqueeSector] = useState<any>(null);

    // -------------------- AI prompt helpers --------------------
    const quickChips = [
        "Analyze Nifty support/resistance",
        "FII/DII activity in banking sector?",
        "Top 5 gainers in Nifty 50",
        "Market sentiment today",
        "Detect Sector Rotation: High - Beta to Defensive ?",
        "Institutional accumulation in Nifty Midcap today ?",
        "Smart Money volume divergence in BankNifty",
        "Nifty PCR & Max Pain level analysis",
        "Unwinding signals in Nifty Call / Put options",
        "India VIX trend & market volatility impact",
        "Top 3 breakout stocks based on volume profile",
        "Identify short - covering candidate sectors",
        "Risk - Off vs Risk - On sentiment check",
        "USD / INR & US 10Y Yield impact on Nifty",
        "FII cash vs futures positioning overview"
    ];

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
            else setAiResponse(data.error || data.conclusion || "Could not retrieve a response.");
        } catch (err) {
            setAiResponse("Server Error: Could not connect to the backend.");
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

    // -------------------- Marquee data --------------------
    const marqueeItems = useMemo(() => {
        if (tapeMode === 'SECTORS') {
            if (activeMarqueeSector?.stocks?.length) {
                return activeMarqueeSector.stocks;
            }

            return sectors.map(sec => ({
                symbol: sec.name,
                price: sec.price,
                change: sec.change,
                isUp: sec.isUp
            }));
        }

        return allIndices.map(i => ({ symbol: i.name, price: i.price, change: i.change, isUp: i.isUp }));
    }, [activeMarqueeSector, allIndices, sectors, tapeMode]);

    return (
        <>
            {/* Header with search and market actions */}
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                isAuthenticated={isAuthenticated}
                userEmail={userEmail}
                onOpenAuth={handleOpenAuth}
                onLogout={handleLogout}
            />

            <PinnedIndices
                loadingMarketData={loadingMarketData}
                liveIndices={liveIndices}
                selectedIndices={selectedIndices}
                onShowSettings={() => setShowIndexSettings(true)} // Pass a function that takes no arguments
            />
            {/* <ActiveStocks /> for future use */}

            <SectoralHeatmap
                sectors={sectors} // from state
                loadingMarketData={loadingMarketData}
                sectorPerformance={sectorPerformance} // from state
                sectorTimeframe={sectorTimeframe}
                setSectorTimeframe={setSectorTimeframe}
                activeMarqueeSector={activeMarqueeSector}
                setSelectedSectorModal={setSelectedSectorModal}
                tapeMode={tapeMode}
                setTapeMode={setTapeMode}
                marqueeItems={marqueeItems} // from state

            />


            {/* <MarketNews newsList={newsList} setSelectedNews={setSelectedNews} /> from state | for future use*/}

            <AiResponseBox loading={loading} aiResponse={aiResponse} />
            <AiPromptBar
                prompt={prompt}
                setPrompt={setPrompt}
                handleAskAI={handleAskAI}
                loading={loading}
                quickChips={quickChips} // from state
            />

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                onSuccessLogin={handleAuthSuccess}
            />
        </>
    );
}