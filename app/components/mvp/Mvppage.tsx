import TickerTape from './TickerTape';
import HeroIndices from './HeroIndices';
import SectorHeatmap from './SectorHeatmap';
import AIBiasCard from './AIBiasCard';
import MarketMovers from './MarketMovers';
import NewsFeed from './NewsFeed';
import PricingGate from './PricingGate';


export default function MvpPage() {
    // const [isAuthOpen, setIsAuthOpen] = useState(false);

    return (
        <div className="scanlines antialiased min-h-screen selection:bg-purple-500 selection:text-white">
            <TickerTape />
            <HeroIndices />
            <SectorHeatmap />
            <AIBiasCard />
            <MarketMovers />
            <NewsFeed />
            <PricingGate />

            <footer className="border-t border-mvp-panel-border px-6 py-8 text-center text-xs text-mvp-dim md:px-12">
                Neo Trading Terminal — data shown is illustrative. Not investment advice.
            </footer>
        </div>
    );
}