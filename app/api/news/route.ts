import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET() {
    try {
        const feed = await parser.parseURL(
            'https://news.google.com/rss/search?q=NSE+BSE+stock+market+India&hl=en-IN&gl=IN&ceid=IN:en'
        );

        const newsItems = feed.items.slice(0, 4).map((item, index) => {
            const titleParts = item.title?.split(' - ') || [];
            const title = titleParts.slice(0, -1).join(' - ') || item.title || '';
            const source = titleParts[titleParts.length - 1] || 'Market News';

            // Time Ago
            const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
            const diffMs = new Date().getTime() - pubDate.getTime();
            const diffMins = Math.floor(diffMs / (1000 * 60));
            const time = diffMins < 60 ? `${diffMins}m ago` : `${Math.floor(diffMins / 60)}h ago`;

            const titleUpper = title.toUpperCase();

            // Dynamic Category
            let category = 'STOCKS';
            if (titleUpper.includes('GOLD') || titleUpper.includes('CRUDE') || titleUpper.includes('OIL') || titleUpper.includes('SILVER')) {
                category = 'COMMODITY';
            } else if (titleUpper.includes('FED') || titleUpper.includes('RBI') || titleUpper.includes('INFLATION') || titleUpper.includes('GDP') || titleUpper.includes('GOVT')) {
                category = 'MACRO';
            }

            // Dynamic Tag / Symbol Extraction
            const words = title.split(' ');
            const tag = words[0]?.length > 2 ? words[0].replace(/[^a-zA-Z]/g, '').toUpperCase() : 'MARKET';

            // Dynamic Impact Analysis
            let impactType: 'bull' | 'bear' | 'neutral' = 'neutral';
            let impact = 'MODERATE VOLATILITY';

            if (titleUpper.includes('RALLY') || titleUpper.includes('SURGE') || titleUpper.includes('GAIN') || titleUpper.includes('PROFIT') || titleUpper.includes('BUY') || titleUpper.includes('JUMP')) {
                impactType = 'bull';
                impact = 'HIGH BULLISH';
            } else if (titleUpper.includes('FALL') || titleUpper.includes('DROP') || titleUpper.includes('SLUMP') || titleUpper.includes('LOSS') || titleUpper.includes('PLUNGE') || titleUpper.includes('WAR')) {
                impactType = 'bear';
                impact = 'SECTOR BEARISH';
            } else if (titleUpper.includes('FED') || titleUpper.includes('RATE') || titleUpper.includes('RBI')) {
                impact = 'STRONG VOLATILITY';
            }

            return {
                id: item.guid || index,
                title,
                source,
                time,
                link: item.link,
                category,
                tag,
                impact,
                impactType
            };
        });

        return NextResponse.json({ success: true, news: newsItems });
    } catch (error) {
        console.error('❌ News Fetch Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch news' }, { status: 500 });
    }
}