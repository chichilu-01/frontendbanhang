export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInOut: {
          "0%, 100%": { opacity: 0 },
          "10%, 90%": { opacity: 1 },
        },
      },
      animation: {
        "fade-in-out": "fadeInOut 3s ease-in-out",
      },
    },
  },
  plugins: [],
};
