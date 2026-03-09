/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {

      colors: {
        brand: {
          primary: "#F66F90",
          textLight: "#ffffff",
          textDark: "#3E434C",
          textMuted: "#6B7280",
        },

        border: "#E6A82D",

        success: {
          DEFAULT: "#16A34A",
        },

        warning: {
          DEFAULT: "#E6A82D",
        },

        danger: {
          DEFAULT: "#DE0A3D",
        },

        surface: {
          slidecart: "#FFFBF5",
          navbar: "#FFFBF5",
          footer: "#FFF5E6",
          secondarybtn: "#FFFBF5",
        },
      },

      backgroundImage: {
        heroGradient: "linear-gradient(90deg,#FFE59D 0%,#FFFBF5 60%,#FFFBF5 100%)",
        cardGradient: "linear-gradient(180deg,#FF5858 0%,#FFC8C8 100%)",
      },

      borderRadius: {
        card: "16px",
      },

      boxShadow: {
        card: "0 8px 20px rgba(0,0,0,0.05)",
      },

      fontFamily: {
        heading: ["var(--font-serif)"],
        body: ["var(--font-sans)"],
      },

      fontSize: {

        "heading-xl": [
          "clamp(32px,4vw,48px)",
          { lineHeight: "1.2" }
        ],

        "heading-lg": [
          "clamp(24px,3vw,36px)",
          { lineHeight: "1.25" }
        ],

        "heading-md": [
          "clamp(20px,2vw,24px)",
          { lineHeight: "1.35" }
        ],

        "heading-sm": [
          "clamp(18px,1.8vw,20px)",
          { lineHeight: "1.4" }
        ],

        body: [
          "16px",
          { lineHeight: "1.6" }
        ],

        small: [
          "14px",
          { lineHeight: "1.5" }
        ],

      },

    },
  },

  plugins: [],
}