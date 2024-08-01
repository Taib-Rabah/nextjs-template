import Plugin from "tailwindcss/plugin";
import { genValues } from "../utils";

const myMainPlugin = Plugin(({ addUtilities, matchUtilities, addVariant, matchVariant, theme }) => {
  /* ---- Utils ---- */
  const _addVariant = (name: string, definition: string) => {
    addVariant(name, `&${definition}`);
    addVariant(`group-${name}`, `.group${definition} &`);
    addVariant(`peer-${name}`, `.peer${definition} ~ &`);
  };

  const _matchVariant = (name: string, definition: string) => {
    matchVariant(name, (value) => {
      const validDefinition = definition.replace("VALUE", value);
      const result = `&${validDefinition}`;
      return result;
    });
    matchVariant(`group-${name}`, (value) => {
      const validDefinition = definition.replace("VALUE", value);
      const result = `.group${validDefinition} &`;
      return result;
    });
    matchVariant(`peer-${name}`, (value) => {
      const validDefinition = definition.replace("VALUE", value);
      const result = `.peer${validDefinition} ~ &`;
      return result;
    });
  };

  /* ---- Opposite Media Queries ---- */
  const screens = theme("screens", {} as Record<string, string>);

  for (const screenKey in screens) {
    const newKey = `-${screenKey}`;
    const newScreen = `@media (width < ${screens[screenKey]})`;
    addVariant(newKey, newScreen);
  }

  /* ---- Device That Can(t) Hover ---- */
  addVariant("can-hover", "@media (hover: hover)");
  addVariant("cant-hover", "@media (hover: none)");

  /* ---- :not() Selector ---- */
  _matchVariant("not", ":not(VALUE)");

  /* ---- :hover And :focus-visible ---- */
  _addVariant("hocus", ":where(:hover, :focus-visible)");

  /* ---- ::before And ::after ---- */
  addVariant("pseudo", ["&::before", "&::after"]);

  /* ---- translate Property ---- */
  const genTranslateValues = (direction: -1 | 1) =>
    genValues({ range: [0, 16], step: 1, divider: 4, unit: "rem", extra: [["full", "100%"]], direction });
  const translateValues = genTranslateValues(1);
  const translateModifiers = { ...translateValues, ...genTranslateValues(-1) };

  matchUtilities(
    {
      translate: (value, { modifier }) => ({
        translate: `${value} ${modifier ?? value}`,
      }),
    },
    {
      values: translateValues,
      modifiers: translateModifiers,
      supportsNegativeValues: true,
    },
  );

  /* ---- Duration And Delay Inheritance ---- */
  addUtilities({
    ".duration-inherit": {
      "transition-duration": "inherit",
      "animation-duration": "inherit",
    },
    ".delay-inherit": {
      "transition-delay": "inherit",
      "animation-delay": "inherit",
    },
  });

  /* ---- Wrapper ---- */

  // prettier-ignore
  const columns = [
      "[full-start]",
      "1fr",

        "[breakout-start]",
        "minmax(0, 8rem)",

          "[content-start]",
          "min(var(--content-width) + var(--inline-padding), 100%)",
          "[content-end]",

        "minmax(0, 8rem)",
        "[breakout-end]",

      "1fr",
      "[full-end]",
    ];

  addUtilities({
    ".content-grid": {
      "--inline-padding": "1rem",
      "--content-width": "calc(theme(screens.lg) + var(--inline-padding) * 2)",

      display: "grid",
      "grid-template-columns": columns.join(" "),
      "place-content": "start",

      "> *": {
        "padding-inline": "var(--inline-padding)",
      },
      "> *:not(.content-grid-full, .content-grid-breakout)": {
        "grid-column": "content",
      },
    },
  });
  matchUtilities(
    {
      "content-grid": (value) => ({
        "grid-column": value,
      }),
    },
    {
      values: {
        content: "content",
        breakout: "breakout",
        full: "full",
      },
    },
  );
});

export default myMainPlugin;
