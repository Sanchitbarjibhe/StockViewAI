import type { Metadata } from 'next';
import Link from 'next/link';


export default function Home() {
    // 🔗 Beta Version Link
    const betaLink = 'https://stockviewai-beta.vercel.app';

    return (
        <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 sm:p-12 font-sans selection:bg-cyan-500 selection:text-black">
            {/* Background Decorative Glow */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0,transparent_100%)] pointer-events-none" />

            {/* Header / Logo Section */}
            <header className="flex justify-between items-center max-w-6xl w-full mx-auto relative z-10">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-cyan-500 flex items-center justify-center font-bold text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                        S
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        StockView<span className="text-cyan-400">AI</span>
                    </span>
                </div>

                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Beta Live
                </span>
            </header>

            {/* Hero Section */}
            <section className="max-w-4xl w-full mx-auto text-center my-auto py-16 relative z-10 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 mb-8 shadow-inner">
                    <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>Institutional Market Analytics & Signal Terminal</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                    Next-Gen AI Terminal for <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                        Active Market Traders
                    </span>
                </h1>

                <p className="text-slate-400 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed">
                    Access sub-second NSE sectoral heatmaps, Smart Money volume profile trackers, Option Chain PCR analysis, and automated market signals.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                    <a
                        href={betaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-base hover:opacity-90 transition-all duration-200 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 group"
                    >
                        <span>Try Beta Version</span>
                        <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>

                {/* Feature Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 w-full text-left">
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                        <div className="text-cyan-400 font-bold mb-1">Sub-Second Tape</div>
                        <p className="text-xs text-slate-400">Real-time market analytics and smart money flow detection.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                        <div className="text-cyan-400 font-bold mb-1">Sectoral Heatmaps</div>
                        <p className="text-xs text-slate-400">Track NSE sector strength and relative momentum live.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                        <div className="text-cyan-400 font-bold mb-1">AI Signals</div>
                        <p className="text-xs text-slate-400">Institutional volume profile and option chain PCR insights.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="max-w-6xl w-full mx-auto text-center sm:flex sm:justify-between sm:text-left text-xs text-slate-500 border-t border-slate-900 pt-6 relative z-10">
                <p>© {new Date().getFullYear()} StockViewAI. All rights reserved.</p>
                <p className="mt-2 sm:mt-0">Designed for NSE NIFTY & BankNifty Traders</p>
            </footer>
        </main>
    );
}