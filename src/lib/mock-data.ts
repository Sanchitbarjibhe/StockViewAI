export type Index = {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePct: number;
};

export type Sector = {
  name: string;
  changePct: number;
};

export type Mover = {
  symbol: string;
  price: number;
  changePct: number;
  volumeSpike?: boolean;
};

export type NewsItem = {
  headline: string;
  source: string;
  time: string;
  impact: "bullish" | "bearish" | "volatile";
};

export type Commodity = {
  name: string;
  value: number;
  changePct: number;
};

// TODO: replace with a live fetch from NSE's index endpoints (refresh every 5–15s)
export const indices: Index[] = [
  { symbol: "NIFTY 50", name: "Nifty 50", value: 24812.35, change: 142.6, changePct: 0.58 },
  { symbol: "NIFTY BANK", name: "Nifty Bank", value: 52340.1, change: -186.4, changePct: -0.35 },
  { symbol: "NIFTY FIN SERVICE", name: "Nifty Financial Services", value: 23789.5, change: 98.2, changePct: 0.41 },
];

// TODO: replace with real sector index endpoints
export const sectors: Sector[] = [
  { name: "IT", changePct: 1.82 },
  { name: "AUTO", changePct: 0.94 },
  { name: "METAL", changePct: -1.35 },
  { name: "PHARMA", changePct: 0.62 },
  { name: "FMCG", changePct: -0.28 },
  { name: "REALTY", changePct: 2.41 },
  { name: "ENERGY", changePct: -0.71 },
  { name: "PSU BANK", changePct: 1.15 },
  { name: "MEDIA", changePct: -2.03 },
  { name: "INFRA", changePct: 0.33 },
];

// TODO: replace with real turnover / volume-surge detection off NSE bhavcopy or live feed
export const topGainers: Mover[] = [
  { symbol: "TATASTEEL", price: 168.4, changePct: 6.2, volumeSpike: true },
  { symbol: "ADANIENT", price: 3124.5, changePct: 4.8 },
  { symbol: "HAL", price: 4890.0, changePct: 4.1, volumeSpike: true },
];

export const topLosers: Mover[] = [
  { symbol: "PAYTM", price: 412.15, changePct: -5.4 },
  { symbol: "ZOMATO", price: 268.9, changePct: -3.9, volumeSpike: true },
  { symbol: "IDEA", price: 14.2, changePct: -3.1 },
];

// TODO: replace with an RSS parser feed (Google News / exchange press releases) + a lightweight sentiment classifier
export const news: NewsItem[] = [
  {
    headline: "RBI holds repo rate steady, signals data-dependent stance ahead",
    source: "Reuters",
    time: "12m ago",
    impact: "bullish",
  },
  {
    headline: "Crude oil climbs on Middle East supply concerns",
    source: "Moneycontrol",
    time: "34m ago",
    impact: "bearish",
  },
  {
    headline: "FII flows turn choppy ahead of Fed commentary this week",
    source: "ET Markets",
    time: "1h ago",
    impact: "volatile",
  },
];

// TODO: replace with live NSE commodities + gold spot feed
export const commodities: Commodity[] = [
  { name: "MCX GOLD", value: 71420, changePct: 0.34 },
  { name: "NSE COMMODITIES IDX", value: 6812.4, changePct: -0.12 },
];

// TODO: replace with a real call to gemini-2.5-flash, rate-limited (e.g. every 15 min) to control cost
export const aiBias = {
  bias: "Cautiously Bullish" as const,
  confidence: 72,
  summary:
    "Broad market breadth favors buyers as IT and Realty lead sector gains, though Bank Nifty's pullback and choppy FII flows warrant a tighter stop on leveraged longs into the Fed commentary this week.",
  generatedAt: "2 min ago",
};
