import { sectors } from "@/lib/mock-data";

function intensity(pct: number) {
  // clamp magnitude to a 0–1 scale over a 3% move, used to drive glow strength
  return Math.min(Math.abs(pct) / 3, 1);
}

export default function SectorHeatmap() {
  return (
    <section className="px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-display text-xl font-semibold text-mvp-ink md:text-2xl">
            Sectoral Heatmap
          </h2>
          <span className="text-xs text-mvp-dim">Top 10 NSE sectors · live</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {sectors.map((s) => {
            const positive = s.changePct >= 0;
            const glow = intensity(s.changePct);
            return (
              <div
                key={s.name}
                className="glass flex flex-col justify-between p-4 transition-transform hover:-translate-y-0.5"
                style={{
                  boxShadow: `0 0 ${18 * glow}px -4px ${
                    positive ? "rgba(62,207,142," : "rgba(255,92,92,"
                  }${0.15 + glow * 0.45})`,
                }}
              >
                <span className="text-xs font-medium uppercase tracking-wide text-mvp-dim">
                  {s.name}
                </span>
                <span className={`mt-3 font-display text-lg font-semibold ${positive ? "text-mvp-bull" : "text-mvp-bear"}`}>
                  {positive ? "+" : ""}
                  {s.changePct.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
