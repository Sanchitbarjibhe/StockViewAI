import { topGainers, topLosers } from "@/lib/mock-data";
import type { Mover } from "@/lib/mock-data";

function MoverList({ title, items, positive }: { title: string; items: Mover[]; positive: boolean }) {
  return (
    <div className="glass p-6">
      <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-mvp-dim">{title}</h3>
      <div className="flex flex-col divide-y divide-mvp-panel-border">
        {items.map((m) => (
          <div key={m.symbol} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-mvp-ink">{m.symbol}</span>
              {m.volumeSpike && (
                <span className="border border-mvp-amber/50 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-mvp-amber">
                  Vol Spike
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-mvp-ink">₹{m.price.toLocaleString("en-IN")}</div>
              <div className={`text-xs ${positive ? "text-mvp-bull" : "text-mvp-bear"}`}>
                {positive ? "+" : ""}
                {m.changePct.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarketMovers() {
  return (
    <section className="px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 font-display text-xl font-semibold text-mvp-ink md:text-2xl">
          Momentum Drivers
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <MoverList title="Top Gainers" items={topGainers} positive />
          <MoverList title="Top Losers" items={topLosers} positive={false} />
        </div>
      </div>
    </section>
  );
}
