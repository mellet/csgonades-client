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
  vertigo: "Vertigo",
};

export type CsgoMap = keyof typeof CsGoMaps;
export type CsgoMapKeys = keyof typeof CsGoMaps;

type MapOption = {
  key: CsgoMapKeys;
  text: string;
  value: CsgoMapKeys;
};

export function nadeMapOptions(): MapOption[] {
  const options: MapOption[] = [];
  for (const key in CsGoMaps) {
    const map = key as CsgoMapKeys;
    options.push({
      key: map,
      text: CsGoMaps[map],
      value: map,
    });
  }
  return options;
}

export function mapString(csgoMap: CsgoMap): string {
  return CsGoMaps[csgoMap];
}

export function getAllCsGoMaps(): CsgoMap[] {
  const maps: CsgoMap[] = [];
  for (const key in CsGoMaps) {
    const map = key as CsgoMapKeys;
    maps.push(map);
  }
  return maps;
}
