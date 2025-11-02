import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      colors: {
        primary: {
          50: "#f4f1ff",
          100: "#e6dcff",
          200: "#cab8ff",
          300: "#a98eff",
          400: "#8c65ff",
          500: "#6c3eff",
          600: "#562ee6",
          700: "#4224b3",
          800: "#2d187f",
          900: "#1a0b4d"
        },
        accent: "#ffb347",
        surface: "#0b0b17"
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 20%, rgba(108,62,255,0.4), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,179,71,0.35), transparent 45%), linear-gradient(180deg, #0b0b17 0%, #111927 100%)"
      }
    }
  },
  plugins: []
};

export default config;
