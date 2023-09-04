const CsGoMaps = {
  ancient: "Ancient",
  anubis: "Anubis",
  cache: "Cache",
  cobblestone: "Cobblestone",
  dust2: "Dust2",
  inferno: "Inferno",
  mirage: "Mirage",
  nuke: "Nuke",
  overpass: "Overpass",
  train: "Train",
  tuscan: "Tuscan",
  vertigo: "Vertigo",
};

export type CsMap = keyof typeof CsGoMaps;
type CsMapKey = keyof typeof CsGoMaps;

type MapOption = {
  key: CsMapKey;
  text: string;
  value: CsMapKey;
};

export function nadeMapOptions(): MapOption[] {
  const options: MapOption[] = [];
  for (const key in CsGoMaps) {
    const map = key as CsMapKey;
    options.push({
      key: map,
      text: CsGoMaps[map],
      value: map,
    });
  }
  return options;
}

export function mapString(csgoMap: CsMap): string {
  return CsGoMaps[csgoMap];
}

export function getAllCsMaps(): CsMap[] {
  const maps: CsMap[] = [];
  for (const key in CsGoMaps) {
    const map = key as CsMapKey;
    maps.push(map);
  }
  return maps;
}
