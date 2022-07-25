export const NadeTypes = {
  flash: "Flash",
  hegrenade: "Grenade",
  molotov: "Molotov",
  smoke: "Smoke",
};

export type NadeType = keyof typeof NadeTypes;

type NadeTypeOption = {
  key: NadeType;
  text: string;
  value: NadeType;
};

export function nadeTypeString(nadeType?: NadeType, plural?: boolean): string {
  if (!nadeType) {
    return "Missing type";
  }

  if (plural) {
    return NadeTypes[nadeType] + "s";
  }

  return NadeTypes[nadeType];
}

export function nadeTypeOptions(): NadeTypeOption[] {
  const options: NadeTypeOption[] = [];
  for (const key in NadeTypes) {
    const objKey = key as NadeType;
    const text = nadeTypeString(objKey);
    options.push({
      key: objKey,
      text,
      value: objKey,
    });
  }
  return options;
}
