export const NadeTickrate = {
  any: "Both",
  tick128: "128 Tick",
  tick64: "64 Tick",
};

export type Tickrate = keyof typeof NadeTickrate;

export function tickrateString(tick: Tickrate): string {
  return NadeTickrate[tick];
}

type TickrateOption = {
  key: Tickrate;
  text: string;
  value: Tickrate;
};

export function nadeTickrateOptions(): TickrateOption[] {
  const options: TickrateOption[] = [];
  for (const key in NadeTickrate) {
    const objKey = key as Tickrate;
    const text = tickrateString(objKey);
    options.push({
      key: objKey,
      text,
      value: objKey,
    });
  }
  return options;
}
