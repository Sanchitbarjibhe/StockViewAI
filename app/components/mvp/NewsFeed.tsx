import { news } from "@/lib/mock-data";
import type { NewsItem } from "@/lib/mock-data";

const impactStyle: Record<NewsItem["impact"], string> = {
  bullish: "text-mvp-bull border-mvp-bull/40",
  bearish: "text-mvp-bear border-mvp-bear/40",
  volatile: "text-mvp-amber border-mvp-amber/40",
};

export default function NewsFeed() {
  return (
    <section className="px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-display text-xl font-semibold text-mvp-ink md:text-2xl">
            Live Impact & Breakout News
          </h2>
          <span className="text-xs text-mvp-dim">Auto-classified · RSS feed</span>
        </div>
        <div className="glass divide-y divide-mvp-panel-border">
          {news.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-mvp-ink/90">{item.headline}</p>
                <p className="mt-1 text-xs text-mvp-dim">
                  {item.source} · {item.time}
                </p>
              </div>
              <span
                className={`shrink-0 self-start border px-2 py-1 text-[10px] uppercase tracking-wide sm:self-center ${impactStyle[item.impact]}`}
              >
                {item.impact}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
