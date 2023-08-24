/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f1f7fe",
          100: "#e2edfc",
          200: "#bfdaf8",
          300: "#86bdf3",
          400: "#469bea",
          500: "#1e7ed9",
          600: "#1061b9",
          700: "#0f4e95",
          800: "#10437c",
          900: "#133967",
          950: "#0d2444"
        },
        secondary: {
          500: "#0F8C50"
        },
        orange: "#E78139"
      }
    }
  },
  plugins: []
}
