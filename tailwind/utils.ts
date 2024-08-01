export type Range = [from: number, to: number];
export type Direction = -1 | 1;
export type Extra = number | [string, string];
export type Unit = "px" | "em" | "rem" | "%" | (string & {});

export type GenValuesOptions = {
  range: Range | Range[];
  step: number;
  extra?: Extra[];
  multiplier?: number;
  divider?: number;
  direction?: Direction;
  unit?: Unit;
};

export const genValues = (opts: GenValuesOptions | GenValuesOptions[]) => {
  if (!Array.isArray(opts)) {
    opts = [opts];
  }

  const obj: Record<string, string> = {};

  for (let { range, step, extra, multiplier, divider, direction, unit } of opts) {
    direction ??= 1;
    multiplier ??= 1;
    divider ??= 1;
    unit ??= "";

    if (range.every((item) => typeof item === "number")) {
      range = [range];
    }

    for (const [from, to] of range) {
      for (let i = from * direction; i * direction <= to; i += step * direction) {
        const value = `${+((i * multiplier) / divider).toFixed(4)}${unit}`;
        obj[i] = value;
      }
    }

    if (extra) {
      extra.forEach((extraValue) => {
        if (typeof extraValue === "number") {
          obj[extraValue * direction] = `${((extraValue * multiplier) / divider) * direction}${unit}`;
        } else {
          let [key, value] = extraValue;
          if (direction === -1) {
            key = `-${key}`;
            value = `-${value}`;
          }
          obj[key] = value;
        }
      });
    }
  }

  return obj;
};

export const pxToRem = (px: number) => `${px / 16}rem`;