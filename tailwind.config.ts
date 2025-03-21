import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,tsx}",
    "./components/**/*.{js,ts,tsx}",
    "./lib/**/*.{js,ts,tsx}",
  ],
  theme: {
    colors: {
      gray: {
        "50": "#F9FAFB",
        "100": "#F3F4F6",
        "200": "#E5E7EB",
        "300": "#D1D5DC",
        "400": "#99A1AF",
        "500": "#6A7282",
        "600": "#4A5565",
        "700": "#364153",
        "800": "#1E2939",
        "900": "#101828",
        "950": "#030712",
      },
      primary: {
        "50": "#F7FEE7",
        "100": "#ECFCCA",
        "200": "#D8F999",
        "300": "#BBF451",
        "400": "#9AE600",
        "500": "#7CCF00",
        "600": "#5EA500",
        "700": "#497D00",
        "800": "#3C6300",
        "900": "#35530E",
        "950": "#192E03",
      },
      secondary: {
        "50": "#EFF6FF",
        "100": "#DBEAFE",
        "200": "#BEDBFF",
        "300": "#8EC5FF",
        "400": "#50A2FF",
        "500": "#2B7FFF",
        "600": "#155DFC",
        "700": "#1447E6",
        "800": "#193CB8",
        "900": "#1C398E",
        "950": "#162456",
      },
      success: {
        "50": "#F0FDF4",
        "100": "#DBFCE7",
        "200": "#B9F8CF",
        "300": "#7BF1A8",
        "400": "#05DF72",
        "500": "#00C950",
        "600": "#00A63E",
        "700": "#008235",
        "800": "#016630",
        "900": "#0D542B",
        "950": "#032E15",
      },
      warning: {
        "50": "#FFFBEB",
        "100": "#FEF3C6",
        "200": "#FEE685",
        "300": "#FFD230",
        "400": "#FFB900",
        "500": "#FE9A00",
        "600": "#E17100",
        "700": "#BB4D00",
        "800": "#973C00",
        "900": "#7A3306",
        "950": "#461901",
      },
      danger: {
        "50": "#FEF2F2",
        "100": "#FFE2E2",
        "200": "#FFC9C9",
        "300": "#FFA2A2",
        "400": "#FF6467",
        "500": "#FB2C36",
        "600": "#E7000B",
        "700": "#C10007",
        "800": "#9F0712",
        "900": "#82181A",
        "950": "#460809",
      },
      white: "#ffffff",
      black: "#000000",
      transparent: "transparent",
    },
    fontSize: {
      display1: [
        "64px",
        {
          lineHeight: "72px",
          letterSpacing: "0",
          fontWeight: "600",
        },
      ],
      display2: [
        "56px",
        {
          lineHeight: "64px",
          letterSpacing: "0",
          fontWeight: "600",
        },
      ],
      display3: [
        "48px",
        {
          lineHeight: "56px",
          letterSpacing: "0",
          fontWeight: "600",
        },
      ],
      display4: [
        "40px",
        {
          lineHeight: "48px",
          letterSpacing: "0",
          fontWeight: "600",
        },
      ],
      display5: [
        "36px",
        {
          lineHeight: "44px",
          letterSpacing: "0",
          fontWeight: "600",
        },
      ],
      heading1: [
        "32px",
        {
          lineHeight: "40px",
          letterSpacing: "0",
          fontWeight: "600",
        },
      ],
      heading2: [
        "28px",
        {
          lineHeight: "32px",
          letterSpacing: "0",
          fontWeight: "600",
        },
      ],
      heading3: [
        "24px",
        {
          lineHeight: "32px",
          letterSpacing: "0",
          fontWeight: "600",
        },
      ],
      heading4: [
        "16px",
        {
          lineHeight: "56px",
          letterSpacing: "0.012rem",
          fontWeight: "700",
        },
      ],
      heading5: [
        "14px",
        {
          lineHeight: "48px",
          letterSpacing: "0.012rem",
          fontWeight: "700",
        },
      ],
      label1: [
        "18px",
        {
          lineHeight: "28px",
          letterSpacing: "0",
          fontWeight: "500",
        },
      ],
      label2: [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "0",
          fontWeight: "500",
        },
      ],
      label3: [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "0",
          fontWeight: "500",
        },
      ],
      label4: [
        "12px",
        {
          lineHeight: "1.5rem",
          letterSpacing: "0",
          fontWeight: "500",
        },
      ],
      label5: [
        "11px",
        {
          lineHeight: "16px",
          letterSpacing: "0",
          fontWeight: "500",
        },
      ],
      "body-xl-400": [
        "20px",
        {
          lineHeight: "28px",
          letterSpacing: "0",
          fontWeight: "400",
        },
      ],
      "body-xl-500": [
        "20px",
        {
          lineHeight: "28px",
          letterSpacing: "0",
          fontWeight: "500",
        },
      ],
      "body-xl-600": [
        "20px",
        {
          lineHeight: "28px",
          letterSpacing: "0",
          fontWeight: "600",
        },
      ],
      "body-l-400": [
        "18px",
        {
          lineHeight: "24px",
          letterSpacing: "0",
          fontWeight: "400",
        },
      ],
      "body-l-500": [
        "18px",
        {
          lineHeight: "24px",
          letterSpacing: "0",
          fontWeight: "500",
        },
      ],
      "body-l-600": [
        "18px",
        {
          lineHeight: "24px",
          letterSpacing: "0",
          fontWeight: "600",
        },
      ],
      "body-md-400": [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "0",
          fontWeight: "400",
        },
      ],
      "body-md-500": [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "0",
          fontWeight: "500",
        },
      ],
      "body-md-600": [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "0",
          fontWeight: "600",
        },
      ],
      "body-sm-400": [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "0",
          fontWeight: "400",
        },
      ],
      "body-sm-500": [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "0",
          fontWeight: "500",
        },
      ],
      "body-sm-600": [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "0",
          fontWeight: "600",
        },
      ],
      "body-tiny-400": [
        "12px",
        {
          lineHeight: "16px",
          letterSpacing: "0",
          fontWeight: "400",
        },
      ],
      "body-tiny-500": [
        "12px",
        {
          lineHeight: "16px",
          letterSpacing: "0",
          fontWeight: "500",
        },
      ],
      "body-tiny-600": [
        "12px",
        {
          lineHeight: "16px",
          letterSpacing: "0",
          fontWeight: "600",
        },
      ],

      "body-xs-400": [
        "11px",
        {
          lineHeight: "12px",
          letterSpacing: "0",
          fontWeight: "400",
        },
      ],
      "body-xs-500": [
        "11px",
        {
          lineHeight: "12px",
          letterSpacing: "0",
          fontWeight: "500",
        },
      ],
      "body-xs-600": [
        "11px",
        {
          lineHeight: "12px",
          letterSpacing: "0",
          fontWeight: "600",
        },
      ],
    },
    screens: {
      sx: "320px",
      tiny: "360px",
      sm: "575px",
      ms: "768px",
      lg: "1024px",
      xl: "1280px",
      // '2xl': '1440px',
      // '3xl': '1680px',
      // '4xl': '1920px'
    },
    container: {
      center: true,
      screens: {
        sx: "320px",
        tiny: "360px",
        sm: "575px",
        ms: "768px",
        lg: "1024px",
        xl: "1320px",
        // '2xl': '1440px',
        // '3xl': '1680px',
        // '4xl': '1920px'
      },
      padding: {
        DEFAULT: "0rem",
        sx: "0rem",
        tiny: "0rem",
        sm: "0rem",
        ms: "0rem",
        lg: "0rem",
        xl: "0rem",
        "2xl": "0rem",
        "3xl": "0rem",
        "4xl": "0rem",
      },
    },
    extend: {
      colors: {
        primary_custom: "#CCFF01",
      },

      keyframes: {
        //used banner small right
        "flash-glide": {
          "0%": { left: "-100%" },
          "100%": { left: "150%" },
        },
        //used 4 criterias
        rotateY: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
      },
      animation: {
        //used banner small right
        "flash-glide": "flash-glide 0.7s ease-in-out",
        //used 4 criterias
        rotateY: "rotateY 0.6s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
