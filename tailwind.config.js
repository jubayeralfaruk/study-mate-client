// tailwind.config.js
import daisyui from "daisyui";
import { themes } from "daisyui/src/theming/themes";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: { ...themes["light"] },
        dark: { ...themes["dark"] },
      },
      "cupcake",
    ],
  },
};
