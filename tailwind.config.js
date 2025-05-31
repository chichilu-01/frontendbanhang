export default {
  darkMode: "class", // ⬅️ Cho phép dark mode theo class
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInOut: {
          "0%, 100%": { opacity: 0 },
          "10%, 90%": { opacity: 1 },
        },
        holographicShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "25%": { backgroundPosition: "100% 50%" },
          "50%": { backgroundPosition: "100% 100%" },
          "75%": { backgroundPosition: "0% 100%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "fade-in-out": "fadeInOut 3s ease-in-out",
        hologram: "holographicShift 4s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
