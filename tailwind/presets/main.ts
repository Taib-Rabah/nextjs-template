import { Config } from "tailwindcss";
import { genValues, pxToRem } from "../utils";

const spacing = genValues({ range: [0.5, 16], step: 0.5, divider: 4, unit: "rem", extra: [0.25] });
const fontSize = spacing;

const borderWidth = genValues({ range: [1, 8], step: 1, divider: 16, unit: "rem" });

const opacity = genValues({
  range: [
    [0, 9],
    [91, 99],
  ],
  step: 1,
  divider: 100,
});

const preset: Config = {
  content: [],
  theme: {
    extend: {
      spacing,
      fontSize,
      borderWidth,
      opacity,
    },
    data: {
      "active": "active='true'",
      "not-active": "active='false'",
      "selected": "selected='true'",
      "not-selected": "selected='false'",
    },
    screens: {
      sm: pxToRem(640), // 40rem
      md: pxToRem(768), // 48rem
      lg: pxToRem(1024), // 64rem
      xl: pxToRem(1280), // 80rem
      "2xl": pxToRem(1536), // 96rem
    }
  },
};

export default preset;
