export const NadeTickrate = {
  any: "Any",
  tick128: "128 Tick",
  tick64: "64 Tick",
};

const NadeTickrateShort = {
  any: "Any",
  tick128: "128T",
  tick64: "64T",
};

export type Tickrate = keyof typeof NadeTickrate;

export function tickrateString(tick: Tickrate): string {
  return NadeTickrate[tick];
}

export function tickrateShortString(tick: Tickrate): string {
  return NadeTickrateShort[tick];
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
