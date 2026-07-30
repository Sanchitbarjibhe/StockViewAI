import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",

    ],
    theme: {
        extend: {
            colors: {
                // --- MAIN PROJECT COLORS ---
                main: {
                    bg: "#0A0E17",
                    neonGreen: "#39FF14",
                    neonRed: "#FF073A",
                },
                // Legacy Support for Main Project (Backward Compatibility)
                background: "#0A0E17",
                neonGreen: "#39FF14",
                neonRed: "#FF073A",

                // --- MVP LANDING PAGE COLORS ---
                mvp: {
                    void: "#05070A",
                    panel: "rgba(255,255,255,0.035)",
                    "panel-border": "rgba(255,255,255,0.09)",
                    amber: {
                        DEFAULT: "#F0A93D",
                        dim: "#8A6A2E",
                    },
                    bull: "#3ECF8E",
                    bear: "#FF5C5C",
                    ink: "#EDEFF2",
                    dim: "#7C8794",
                },
            },
            fontFamily: {
                display: ["var(--font-display)", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
            boxShadow: {
                "glow-amber": "0 0 24px -4px rgba(240,169,61,0.35)",
                "glow-bull": "0 0 20px -6px rgba(62,207,142,0.45)",
                "glow-bear": "0 0 20px -6px rgba(255,92,92,0.45)",
            },
            backdropBlur: {
                glass: "18px",
            },
        },
    },
    plugins: [],
};

export default config;