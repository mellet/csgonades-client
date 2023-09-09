import { z } from "zod";

const NadeTickrate = {
  any: "Any",
  tick128: "128 Tick",
  tick64: "64 Tick",
};

const NadeTickrateShort = {
  any: "Any",
  tick128: "128T",
  tick64: "64T",
};

export const TickrateSchema = z
  .enum(["any", "tick128", "tick64"])
  .optional()
  .nullable();

export type Tickrate = z.infer<typeof TickrateSchema>;

export function tickrateString(tick: Tickrate): string {
  if (!tick) {
    return "";
  }
  return NadeTickrate[tick];
}

export function tickrateShortString(tick: Tickrate): string {
  if (!tick) {
    return "";
  }
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
