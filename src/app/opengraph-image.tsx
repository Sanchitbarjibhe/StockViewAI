import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'StockViewAI AI market analytics terminal';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#07111f',
                    color: '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center',
                    padding: '72px',
                    width: '100%',
                }}
            >
                <div style={{ color: '#38bdf8', fontSize: 28, fontWeight: 700 }}>
                    STOCKVIEWAI
                </div>
                <div style={{ fontSize: 64, fontWeight: 800, marginTop: 24 }}>
                    AI Trading Terminal
                </div>
                <div style={{ color: '#a7f3d0', fontSize: 32, marginTop: 24 }}>
                    Real-time market analytics for active traders in India
                </div>
            </div>
        ),
        { ...size },
    );
}