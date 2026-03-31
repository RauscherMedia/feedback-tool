import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: "#FF5C00", light: "#FF7A33", dark: "#CC4A00" },
        surface: {
          primary: "#FFFFFF",
          secondary: "#F5F5F5",
          card: "#FAFAFA",
          tertiary: "#EBEBEB",
        },
        content: {
          primary: "#1A1A1A",
          secondary: "#4A4A4A",
          muted: "#8A8A8A",
        },
        status: {
          pass: "#22C55E",
          warning: "#F59E0B",
          fail: "#EF4444",
        },
      },
      fontFamily: {
        headline: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
