import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1140px" },
    },
    extend: {
      fontFamily: {
        serif: ["'Ovo'", "Georgia", "serif"],
        sans: ["'Source Sans Pro'", "Arial", "sans-serif"],
      },
      colors: {
        accent: "#BF9456",
        heading: "#333333",
        body: "#515151",
        muted: "#6B6B6B",
        rule: "#CCCCCC",
        ink: "#212121",
      },
      letterSpacing: {
        eyebrow: "0.2em",
        characters: "0.625em",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
