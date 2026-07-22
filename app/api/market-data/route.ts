import { NextResponse } from 'next/server';

const nseHeaders = {
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.nseindia.com',
};

async function getNSEData(url: string) {
    try {
        // NSE वरून Session Cookie जनरेट करणे
        const initRes = await fetch('https://www.nseindia.com', { headers: nseHeaders });
        const cookies = initRes.headers.get('set-cookie') || '';

        const res = await fetch(url, {
            headers: {
                ...nseHeaders,
                'Cookie': cookies,
            },
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (err) {
        console.error(`NSE Fetch Error for ${url}:`, err);
        return null;
    }
}

export async function GET() {
    try {
        // ⚡ Fast Performance साठी सर्व NSE endpoints समांतर (Parallelly) कॉल करणे
        const [
            indicesData,
            gainersData,
            losersData,
            volumeGainersData,
            goldData,
        ] = await Promise.all([
            getNSEData('https://www.nseindia.com/api/allIndices'),
            getNSEData('https://www.nseindia.com/api/live-analysis-variations?index=gainers&key=NIFTY'),
            getNSEData('https://www.nseindia.com/api/live-analysis-variations?index=losers&key=NIFTY'),
            getNSEData('https://www.nseindia.com/api/live-analysis-volume-gainers'),
            getNSEData('https://www.nseindia.com/api/quote-commodity?symbol=GOLD'),
        ]);

        const allIndices = indicesData?.data || [];

        // 1. Major Pinned Indices (Nifty 50, Nifty Bank, Financial Services)
        const indices = allIndices
            .filter((idx: any) =>
                ['NIFTY 50', 'NIFTY BANK', 'NIFTY FINANCIAL SERVICES'].includes(idx.index)
            )
            .map((idx: any) => ({
                name: idx.index,
                price: idx.last ? idx.last.toLocaleString('en-IN') : '0',
                change: `${idx.percentChange >= 0 ? '+' : ''}${idx.percentChange?.toFixed(2)}%`,
                isUp: idx.percentChange >= 0,
            }));

        // 2. Commodities Data (Nifty Commodities Index + Live Gold Quote)
        const commoditiesData: any[] = [];
        const commodityIndex = allIndices.find((idx: any) => idx.index === 'NIFTY COMMODITIES');

        if (commodityIndex) {
            commoditiesData.push({
                name: 'NIFTY COMMODITIES',
                price: commodityIndex.last ? commodityIndex.last.toLocaleString('en-IN') : '0',
                change: `${commodityIndex.percentChange >= 0 ? '+' : ''}${commodityIndex.percentChange?.toFixed(2)}%`,
                isUp: commodityIndex.percentChange >= 0,
            });
        }

        if (goldData?.metadata?.lastPrice) {
            const details = goldData.metadata;
            commoditiesData.push({
                name: 'GOLD',
                price: `₹${details.lastPrice.toLocaleString('en-IN')}`,
                change: `${details.pChange >= 0 ? '+' : ''}${details.pChange?.toFixed(2)}%`,
                isUp: details.pChange >= 0,
            });
        }

        // 3. Top Price Gainers (Nifty List)
        const topGainers =
            gainersData?.NIFTY?.data?.slice(0, 4).map((item: any) => ({
                symbol: item.symbol,
                price: `₹${item.ltp}`,
                change: `+${item.pChange?.toFixed(2)}%`,
                isUp: true,
            })) || [];

        // 4. Top Price Losers (Nifty List)
        const topLosers =
            losersData?.NIFTY?.data?.slice(0, 4).map((item: any) => ({
                symbol: item.symbol,
                price: `₹${item.ltp}`,
                change: `${item.pChange?.toFixed(2)}%`,
                isUp: false,
            })) || [];

        // 5. Volume Surge Gainers (NSE Live Spikes)
        const volumeGainers =
            volumeGainersData?.data?.slice(0, 4).map((item: any) => ({
                symbol: item.symbol,
                volume: item.totalTradedVolume ? (item.totalTradedVolume / 100000).toFixed(2) + 'L' : 'N/A',
                turnover: item.turnoverInLakhs ? `₹${item.turnoverInLakhs.toFixed(0)}L` : 'N/A',
                price: `₹${item.ltp || item.lastPrice}`,
                change: `${item.pChange >= 0 ? '+' : ''}${item.pChange?.toFixed(2)}%`,
                isUp: item.pChange >= 0,
            })) || [];

        // 6. Sectoral Heatmap Data (Top 10 Sectors)
        const targetSectors = [
            'NIFTY IT',
            'NIFTY BANK',
            'NIFTY AUTO',
            'NIFTY PHARMA',
            'NIFTY METAL',
            'NIFTY FMCG',
            'NIFTY ENERGY',
            'NIFTY REALTY',
            'NIFTY MEDIA',
            'NIFTY PSU BANK',
        ];

        const sectorData = allIndices
            .filter((idx: any) => targetSectors.includes(idx.index))
            .map((idx: any) => ({
                name: idx.index,
                price: idx.last ? idx.last.toLocaleString('en-IN') : '0',
                change: `${idx.percentChange >= 0 ? '+' : ''}${idx.percentChange?.toFixed(2)}%`,
                isUp: idx.percentChange >= 0,
            }));

        // Return Everything in JSON
        return NextResponse.json({
            success: true,
            indices,
            commodities: commoditiesData,
            sectorData,
            topGainers,
            topLosers,
            volumeGainers,
        });
    } catch (error) {
        console.error('NSE Market Data API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch NSE market data' },
            { status: 500 }
        );
    }
}