import { indices, sectors, commodities } from "@/lib/mock-data";

function TickerRow() {
  const items = [
    ...indices.map((i) => ({ label: i.symbol, value: i.value.toLocaleString("en-IN"), pct: i.changePct })),
    ...sectors.map((s) => ({ label: `NIFTY ${s.name}`, value: null, pct: s.changePct })),
    ...commodities.map((c) => ({ label: c.name, value: c.value.toLocaleString("en-IN"), pct: c.changePct })),
  ];

  return (
    <>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-2 px-6 whitespace-nowrap text-[13px]">
          <span className="text-mvp-dim">{item.label}</span>
          {item.value && <span className="text-mvp-ink">{item.value}</span>}
          <span className={item.pct >= 0 ? "text-mvp-bull" : "text-mvp-bear"}>
            {item.pct >= 0 ? "▲" : "▼"} {Math.abs(item.pct).toFixed(2)}%
          </span>
        </span>
      ))}
    </>
  );
}

export default function TickerTape() {
  return (
    <div className="w-full overflow-hidden border-b border-mvp-panel-border bg-mvp-void py-2">
      <div className="ticker-track">
        <TickerRow />
        <TickerRow />
      </div>
    </div>
  );
}
