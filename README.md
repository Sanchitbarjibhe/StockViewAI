# Neo Trading Terminal — MVP Landing Page

This is the validation-stage build: the full one-page terminal UI, running on
mock data (`lib/mock-data.ts`), so you can ship it today and swap in real data
sources without touching the design.

## What's real vs. mocked right now

| Section | Status | Next step |
|---|---|---|
| Ticker tape | Mocked | Swap `lib/mock-data.ts` indices/sectors/commodities for a polled NSE endpoint (5–15s refresh) |
| Index cards (Nifty/Bank/FinNifty) | Mocked | Same NSE endpoint as above |
| Sectoral heatmap | Mocked | NSE sector index endpoints |
| AI Market Bias | Mocked, pre-written summary | Call `gemini-2.5-flash` server-side, rate-limited (e.g. every 15 min) to control API cost during validation |
| Top gainers/losers + volume spikes | Mocked | NSE bhavcopy or live feed turnover data |
| News feed | Mocked | Google News RSS parser + a lightweight sentiment classifier (or a second cheap Gemini call) |
| Pricing plans | Real UI, no billing wired | Point "Get Early Access" at an email-capture form first — don't wire Razorpay/Stripe until you see real click-through |

## Why it's built this way

This mirrors how Dropbox, Buffer, and Nomad List validated demand before
building the expensive part:

- The **AI Bias card** is intentionally the most "finished-feeling" section —
  it's your differentiator, so it's the one thing worth partially gating
  behind the pricing CTA (Buffer's fake-door test).
- Everything data-heavy (heatmap, movers, news) is wired to swap from mock to
  real in one file — `lib/mock-data.ts` — so you're not re-architecting later.
- The pricing section captures intent (clicks / signups) before you build
  billing, same as Buffer's two-page test.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.
