// import { aiBias } from 'lib/mock-data';

import { aiBias } from "@/lib/mock-data";

export default function AIBiasCard() {
  return (
    <section className="px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="glass relative overflow-hidden p-8 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-mvp-amber">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mvp-amber" />
              Gemini 2.5 Flash · Market Bias
            </div>
            <span className="text-xs text-mvp-dim">Updated {aiBias.generatedAt}</span>
          </div>

          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-center">
            <div className="shrink-0">
              <div className="font-display text-3xl font-semibold text-mvp-amber md:text-4xl">
                {aiBias.bias}
              </div>
              <div className="mt-2 text-sm text-mvp-dim">
                Confidence <span className="text-mvp-ink">{aiBias.confidence}%</span>
              </div>
            </div>

            <div className="relative flex-1">
              <p className="max-w-2xl text-sm leading-relaxed text-mvp-ink/90 md:text-base">
                {aiBias.summary.slice(0, 92)}
                <span className="blur-[3px] select-none">
                  {aiBias.summary.slice(92)}
                </span>
              </p>
              <div className="mt-4">
                <a
                  href="#pricing"
                  className="inline-block border border-mvp-amber/60 bg-mvp-amber/10 px-4 py-2 text-xs font-medium uppercase tracking-wide text-mvp-amber transition-colors hover:bg-mvp-amber/20"
                >
                  Unlock Full AI Breakdown
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
