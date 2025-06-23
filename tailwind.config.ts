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
      fontStretch: {
        normal: "100%",
        condensed: "75%",
        expanded: "115%",
        expandedFull: "125%",
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
