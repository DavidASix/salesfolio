/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef4ee",
          100: "#fde6d7",
          200: "#fbc9ad",
          300: "#f7a37a",
          DEFAULT: "#f36f3f",
          400: "#f36f3f",
          500: "#f04f1f",
          600: "#e13615",
          700: "#bb2513",
          800: "#952017",
          900: "#781d16",
          950: "#410b09",
        },
        accent: {
          50: "#f1f9fa",
          100: "#dceef1",
          200: "#bddfe4",
          300: "#8fc7d1",
          400: "#6db1bf",
          DEFAULT: "#6db1bf",
          500: "#3e8a9c",
          600: "#367284",
          700: "#315e6d",
          800: "#2f4e5b",
          900: "#2b434e",
          950: "#182b34",
        },
        base: {
          light: "#f8f8f8",
          50: "#f8f8f8",
          100: "#f1f0ef",
          200: "#e6e3e2",
          300: "#d4cfcd",
          DEFAULT: "#b2a9a6",
          400: "#b2a9a6",
          500: "#a09693",
          600: "#887d7a",
          700: "#716764",
          800: "#5f5755",
          900: "#524c4a",
          950: "#2a2625",
          dark: "#2a2625",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        salesfolio: {
          primary: "#F36F3F",
          secondary: "#F04F1F",
          accent: "#6db1bf",
          neutral: "#2a2a2a",
          "base-100": "#f1f0ef",
          info: "#fb923c",
          success: "#16a34a",
          warning: "#f87171",
          error: "#ef4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
