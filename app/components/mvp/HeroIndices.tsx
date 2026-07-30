import { indices } from "@/lib/mock-data";

export default function HeroIndices() {
  return (
    <section className="px-6 pt-16 pb-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-mvp-amber">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mvp-amber" />
          Live · NSE / BSE
        </div>
        <h1 className="font-display text-4xl font-semibold leading-tight text-mvp-ink md:text-6xl">
          One screen.
          <br />
          Every signal that moves the market.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-mvp-dim md:text-base">
          Institutional-grade indices, sector flow, and AI-read market bias —
          built for traders who don't have time to check five tabs.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {indices.map((idx) => {
            const positive = idx.changePct >= 0;
            return (
              <div
                key={idx.symbol}
                className={`glass rounded-none p-6 ${positive ? "shadow-glow-bull" : "shadow-glow-bear"}`}
              >
                <div className="text-xs uppercase tracking-wider text-mvp-dim">{idx.name}</div>
                <div className="mt-3 font-display text-3xl font-semibold text-mvp-ink">
                  {idx.value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
                <div className={`mt-2 text-sm ${positive ? "text-mvp-bull" : "text-mvp-bear"}`}>
                  {positive ? "▲" : "▼"} {Math.abs(idx.change).toFixed(2)} ({Math.abs(idx.changePct).toFixed(2)}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
