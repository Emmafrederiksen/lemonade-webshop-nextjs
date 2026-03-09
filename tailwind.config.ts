import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
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

                border:"#E6A82D",

                success: {
                    default: "#16A34A",
                },

                warning: {
                    default: "#E6A82D",
                },

                danger: {
                    default: "#DE0A3D",
                },

                surface: {
                    slideCart: "#FFFBF5",
                    navBar: "#FFFBF5",
                    footer: "#FFF5E6",
                },
            },  

            backgroundImage: {

                heroGradient: "linear-gradient(90deg,#FFE59D 0%,#FFFBF5 60%,#FFFBF5 100%)",

                cardGradient: "linear-gradient(180deg,#FF5858 0%,#FFC8C8 100%)"

            },

            borderRadius: {
                card: "16px",
            },

            boxShadow: {
                card: "0 8px 20px rgba(0,0,0,0.05)",
            }
        }
    }
} satisfies Config