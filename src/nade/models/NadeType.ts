const NadeTypes = {
  flash: "Flash",
  hegrenade: "Grenade",
  molotov: "Molotov",
  smoke: "Smoke",
};

export type NadeType = keyof typeof NadeTypes;

export function nadeTypeString(nadeType?: NadeType, plural?: boolean): string {
  if (!nadeType) {
    return "Missing type";
  }

  if (plural) {
    return NadeTypes[nadeType] + "s";
  }

  return NadeTypes[nadeType];
}
