module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "false",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Barlow", "sans-serif"],
      },
      colors: {
        gray: {
          100: "#E0E6E9",
          500: "#ABBBC2",
          600: "#2a2e39",
          700: "#393c49",
          900: "#1F1D2B",
          800: "#252836",
        },
        primary: "#EB966A",
        accent: {
          blue: "#65B0F6",
          orange: "#FFB572",
          red: "#FF7CA3",
          green: "#50D1AA",
          purple: "#9290FE",
        },
      },
      boxShadow: {
        primary: "0px 8px 24px rgba(234, 124, 105, .32)",
      },
      minHeight: {
        28: "28px",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
    },
  },
  plugins: [],
};
