import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      borderColor: {
        DEFAULT: "#53718955",
      },
      fontFamily: {
        nunito: ['"NunitoSans"', "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
        satoshi: ['"Satoshi"', "sans-serif"],
        pixel: ['"pixel"', "sans-serif"],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        thin: "100",
        extrabold: "800",
      },
      fontStretch: {
        normal: "100%",
        condensed: "75%",
        expanded: "125%",
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities }) => {
      matchUtilities(
        {
          width: (value) => ({
            fontVariationSettings: `"wdth" ${value}`,
          }),
        },
        {
          values: {},
          supportsNegativeValues: false,
        }
      );
    }),
  ],
};

export default config;
