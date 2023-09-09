import { z } from "zod";

const NadeTypes = {
  flash: "Flash",
  hegrenade: "Grenade",
  molotov: "Molotov",
  smoke: "Smoke",
};

export const NadeTypeSchema = z.enum([
  "flash",
  "hegrenade",
  "molotov",
  "smoke",
]);

export type NadeType = z.infer<typeof NadeTypeSchema>;

export function nadeTypeString(nadeType?: NadeType, plural?: boolean): string {
  if (!nadeType) {
    return "Missing type";
  }

  if (plural) {
    return NadeTypes[nadeType] + "s";
  }

  return NadeTypes[nadeType];
}
