import { useState, useEffect } from "react";
import MarketColumn, { MarketItem, DUMMY_GLOBAL_MARKETS, DUMMY_COMMODITIES, DUMMY_TOP_GAINERS, DUMMY_TOP_LOSERS, DUMMY_IO_GAINERS, DUMMY_VOLUME_GAINERS } from "./MarketColumn";
import { Flame, TrendingUp, Zap } from "lucide-react";

export interface ActiveStocksProps {
    globalIndices?: MarketItem[];
    commodities?: MarketItem[];
    topGainers?: MarketItem[];
    topLosers?: MarketItem[];
    ioGainers?: MarketItem[];
    volumeGainers?: MarketItem[];
    useApi?: boolean; // In future api use
}

const ActiveStocks: React.FC<ActiveStocksProps> = ({
    globalIndices: propGlobal,
    commodities: propCommodities,
    topGainers: propTopGainers,
    topLosers: propTopLosers,
    ioGainers: propIoGainers,
    volumeGainers: propVolumeGainers,
    useApi = false // Future switch
}) => {
    // Component State initialized with Props OR Fallback Dummy Data
    const [globalIndices, setGlobalIndices] = useState<MarketItem[]>(propGlobal || DUMMY_GLOBAL_MARKETS);
    const [commodities, setCommodities] = useState<MarketItem[]>(propCommodities || DUMMY_COMMODITIES);
    const [topGainers, setTopGainers] = useState<MarketItem[]>(propTopGainers || DUMMY_TOP_GAINERS);
    const [topLosers, setTopLosers] = useState<MarketItem[]>(propTopLosers || DUMMY_TOP_LOSERS);
    const [ioGainers, setIoGainers] = useState<MarketItem[]>(propIoGainers || DUMMY_IO_GAINERS);
    const [volumeGainers, setVolumeGainers] = useState<MarketItem[]>(propVolumeGainers || DUMMY_VOLUME_GAINERS);
    const [loading, setLoading] = useState<boolean>(false);

    // Dynamic props updates handling
    useEffect(() => {
        if (propGlobal?.length) setGlobalIndices(propGlobal);
        if (propCommodities?.length) setCommodities(propCommodities);
        if (propTopGainers?.length) setTopGainers(propTopGainers);
        if (propTopLosers?.length) setTopLosers(propTopLosers);
        if (propIoGainers?.length) setIoGainers(propIoGainers);
        if (propVolumeGainers?.length) setVolumeGainers(propVolumeGainers);
    }, [propGlobal, propCommodities, propTopGainers, propTopLosers, propIoGainers, propVolumeGainers]);

    // FUTURE API CALL EFFECT (Enable by passing `useApi={true}`)
    useEffect(() => {
        if (!useApi) return;

        let isMounted = true;
        const fetchMarketData = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/user/market-data');
                const data = await res.json();

                if (data.success && isMounted) {
                    if (data.globalIndices) setGlobalIndices(data.globalIndices);
                    if (data.commodities) setCommodities(data.commodities);
                    if (data.topGainers) setTopGainers(data.topGainers);
                    if (data.topLosers) setTopLosers(data.topLosers);
                    if (data.ioGainers) setIoGainers(data.ioGainers);
                    if (data.volumeGainers) setVolumeGainers(data.volumeGainers);
                }
            } catch (err) {
                console.error("❌ Market Data Fetch Error:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchMarketData();

        return () => {
            isMounted = false;
        };
    }, [useApi]);

    return (
        <div className="six-col-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
            {/* 1. Global Markets */}
            <MarketColumn title="GLOBAL MARKETS" items={globalIndices} loading={loading} />

            {/* 2. Commodities */}
            <MarketColumn title="COMMODITIES" items={commodities} loading={loading} />

            {/* 3. Top Gainers */}
            <MarketColumn title="TOP GAINERS" icon={TrendingUp} iconColor="#22C55E" items={topGainers} loading={loading} />

            {/* 4. Top Losers */}
            <MarketColumn title="TOP LOSERS" icon={TrendingUp} iconColor="#EF4444" iconTransform="scaleY(-1) rotate(45deg)" items={topLosers} loading={loading} />

            {/* 5. IO Gainers */}
            <MarketColumn title="IO GAINERS" icon={Zap} iconColor="#F59E0B" items={ioGainers} loading={loading} />

            {/* 6. Volume Gainers */}
            <MarketColumn title="VOLUME GAINERS" icon={Flame} iconColor="#3B82F6" items={volumeGainers} loading={loading} />
        </div>
    );
};

export default ActiveStocks;