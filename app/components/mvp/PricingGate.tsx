const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "",
    features: ["Delayed indices", "Sectoral heatmap", "Top gainers/losers"],
    cta: "Current Plan",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹1,499",
    period: "/mo",
    features: [
      "Real-time indices & heatmap",
      "Full Gemini AI Market Bias",
      "Volume spike alerts",
      "Impact news classification",
    ],
    cta: "Get Early Access",
    highlighted: true,
  },
  {
    name: "Institutional",
    price: "Contact",
    period: "",
    features: ["Everything in Pro", "API access", "Custom breakout models", "Priority support"],
    cta: "Talk to Us",
    highlighted: false,
  },
];

export default function PricingGate() {
  return (
    <section id="pricing" className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-semibold text-mvp-ink md:text-3xl">
            Trade with the full terminal
          </h2>
          <p className="mt-2 text-sm text-mvp-dim">
            No card required to register interest — we're onboarding traders in batches.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass flex flex-col p-6 ${
                plan.highlighted ? "border-mvp-amber/50 shadow-glow-amber" : ""
              }`}
            >
              <span className="text-xs uppercase tracking-wider text-mvp-dim">{plan.name}</span>
              <div className="mt-3 font-display text-3xl font-semibold text-mvp-ink">
                {plan.price}
                <span className="text-sm font-normal text-mvp-dim">{plan.period}</span>
              </div>
              <ul className="mt-5 flex-1 space-y-2 text-sm text-mvp-ink/80">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-mvp-amber">·</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-6 w-full border py-2.5 text-xs font-medium uppercase tracking-wide transition-colors ${
                  plan.highlighted
                    ? "border-mvp-amber bg-mvp-amber/10 text-mvp-amber hover:bg-mvp-amber/20"
                    : "border-mvp-panel-border text-mvp-ink/80 hover:bg-mvp-panel"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
