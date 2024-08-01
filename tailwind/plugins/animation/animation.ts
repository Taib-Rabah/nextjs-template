import { withOptions } from "tailwindcss/plugin";

import { genValues } from "../../utils";
import { Options, optionsSchema } from "./schema";

const myAnimPlugin = withOptions(
  (userOptions: DeepPartial<Options>) =>
    ({ addUtilities, matchUtilities }) => {
      /* ---- Validate Options ---- */
      const parseResult = optionsSchema.safeParse(userOptions);
      const options = parseResult.success ? parseResult.data : optionsSchema.parse({});

      /* ---- Keyframes ---- */
      const keyframes = {
        "@keyframes anim": {
          from: {
            opacity: `var(--start-opacity, ${options.startOpacity})`,
            translate: `var(--start-x, 0) var(--start-y, ${options.startY})`,
            scale: `var(--start-scale-x, 1) var(--start-scale-y, ${options.startScaleY})`,
            rotate: `var(--start-rotate, ${options.startRotate})`,
          },
          to: {
            opacity: `var(--end-opacity, ${options.endOpacity})`,
            translate: `var(--end-x, 0) var(--end-y, ${options.endY})`,
            scale: `var(--end-scale-x, 1) var(--end-scale-y, ${options.endScaleY})`,
            rotate: `var(--end-rotate, ${options.endRotate})`,
          },
        },
      };

      addUtilities(keyframes);

      /* ---- Start Animation And Apply Start Values Immediately (Animation Delay) ---- */
      addUtilities({
        ".anim": {
          "animation-name": "anim",
          "animation-duration": `var(--duration, ${options.duration})`,
          "animation-timing-function": `var(--timing, ${options.timing})`,
          "animation-delay": `var(--delay, ${options.delay})`,
          "animation-fill-mode": `var(--mode, ${options.mode})`,
          "animation-direction": `var(--direction, ${options.direction})`,
          "animation-iteration-count": `var(--count, ${options.count})`,
          opacity: `var(--start-opacity, ${options.startOpacity})`,
          translate: `var(--start-x, ${options.startX}) var(--start-y, ${options.startY})`,
          scale: `var(--start-scale-x, ${options.startScaleX}) var(--start-scale-y, ${options.startScaleY})`,
          rotate: `var(--start-rotate, ${options.startRotate})`,
        },
      });

      /* ---- Only Apply Start Values---- */
      addUtilities({
        ".anim-apply": {
          opacity: `var(--start-opacity, ${options.startOpacity})`,
          translate: `var(--start-x, ${options.startX}) var(--start-y, ${options.startY})`,
          scale: `var(--start-scale-x, ${options.startScaleX}) var(--start-scale-y, ${options.startScaleY})`,
          rotate: `var(--start-rotate, ${options.startRotate})`,
        },
      });

      /* ---- Opacity ---- */
      const opacityValues = genValues([
        { range: [0, 100], step: 5, divider: 100 },
        {
          range: [
            [1, 9],
            [91, 99],
          ],
          step: 1,
          divider: 100,
        },
      ]);

      matchUtilities(
        {
          "anim-opacity": (value, { modifier }) => ({
            "--start-opacity": value,
            "--end-opacity": modifier,
          }),
        },
        {
          values: opacityValues,
          modifiers: opacityValues,
        },
      );

      /* ---- Translate ---- */
      const genTranslateValues = (direction?: -1 | 1) =>
        genValues({
          range: [0, 16],
          step: 1,
          divider: 4,
          unit: "rem",
          extra: [["full", "100%"]],
          direction,
        });

      const translateValues = genTranslateValues();

      const translateModifiers = {
        ...translateValues,
        ...genTranslateValues(-1),
      };

      matchUtilities(
        {
          "anim-xy": (value, { modifier }) => ({
            "--start-x": value,
            "--start-y": value,
            "--end-x": modifier,
            "--end-y": modifier,
          }),
          "anim-x": (value, { modifier }) => ({
            "--start-x": value,
            "--end-x": modifier,
          }),
          "anim-y": (value, { modifier }) => ({
            "--start-y": value,
            "--end-y": modifier,
          }),
        },
        {
          values: translateValues,
          modifiers: translateModifiers,
          supportsNegativeValues: true,
        },
      );

      /* ---- Rotate ---- */
      const genRotateValues = (direction?: -1 | 1) =>
        genValues([
          {
            range: [0, 360],
            step: 30,
            unit: "deg",
            extra: [["full", "360deg"]],
            direction,
          },
          {
            range: [1, 10],
            step: 1,
            unit: "deg",
            direction,
          },
        ]);

      const rotateValues = genRotateValues();
      const rotateModifiers = {
        ...rotateValues,
        ...genRotateValues(-1),
      };

      matchUtilities(
        {
          "anim-rotate": (value, { modifier }) => ({
            "--start-rotate": value,
            "--end-rotate": modifier,
          }),
        },
        {
          values: rotateValues,
          modifiers: rotateModifiers,
          supportsNegativeValues: true,
        },
      );

      /* ---- Scale ---- */
      const scaleValues = genValues([
        {
          range: [0, 200],
          step: 5,
          divider: 100,
        },
        {
          range: [
            [1, 9],
            [91, 109],
            [191, 199],
          ],
          step: 1,
          divider: 100,
        },
      ]);

      matchUtilities(
        {
          "anim-scale": (value, { modifier }) => ({
            "--start-scale-x": value,
            "--start-scale-y": value,
            "--end-scale-x": modifier,
            "--end-scale-y": modifier,
          }),
          "anim-scale-x": (value, { modifier }) => ({
            "--start-scale-x": value,
            "--end-scale-x": modifier,
          }),
          "anim-scale-y": (value, { modifier }) => ({
            "--start-scale-y": value,
            "--end-scale-y": modifier,
          }),
        },
        {
          values: scaleValues,
          modifiers: scaleValues,
          supportsNegativeValues: true,
        },
      );

      /* ---- Time ---- */
      const timeValues = genValues({ range: [0, 2000], step: 50, unit: "ms" });

      matchUtilities(
        {
          "anim-time": (value, { modifier }) => ({
            "--duration": value,
            "--delay": modifier,
          }),
          "anim-delay": (value) => ({
            "--delay": value,
          }),
        },
        {
          values: timeValues,
          modifiers: timeValues,
        },
      );

      /* ---- Mode ---- */
      const modeValues = {
        backwards: "backwards",
        forwards: "forwards",
        both: "both",
        none: "none",
      };

      matchUtilities(
        {
          "anim-mode": (value) => ({
            "--mode": value,
          }),
        },
        {
          values: modeValues,
        },
      );

      /* ---- Direction ---- */
      const directionValues = {
        normal: "normal",
        reverse: "reverse",
        alternate: "alternate",
        "alternate-reverse": "alternate-reverse",
      };

      matchUtilities(
        {
          "anim-direction": (value) => ({
            "--direction": value,
          }),
        },
        {
          values: directionValues,
        },
      );

      /* ---- Count ---- */
      const countValues = genValues({ range: [1, 10], step: 1, extra: [["infinite", "infinite"]] });

      matchUtilities(
        {
          "anim-count": (value) => ({
            "--count": value,
          }),
        },
        {
          values: countValues,
        },
      );

      /* ---- Timing ---- */
      const timingValues = {
        ease: "ease",
        linear: "linear",
        "ease-in": "ease-in",
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out",
        "step-start": "step-start",
        "step-end": "step-end",
      };

      matchUtilities(
        {
          "anim-timing": (value) => ({
            "--timing": value,
          }),
        },
        {
          values: timingValues,
        },
      );

      /* ---- Animation State ---- */
      matchUtilities(
        {
          "anim-state": (value) => ({
            "animation-play-state": value,
          }),
        },
        {
          values: {
            paused: "paused",
            running: "running",
          },
        },
      );
    },
);

export default myAnimPlugin;
