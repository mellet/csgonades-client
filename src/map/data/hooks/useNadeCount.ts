import { NadeLight } from "../../../nade/models/Nade";

export type NadeCounts = {
  numSmokes: number;
  numMolotovs: number;
  numFlashed: number;
  numGrenades: number;
};

export const useNadeCount = (allNades: NadeLight[]): NadeCounts => {
  const numSmokes = allNades.filter((n) => n.type === "smoke").length;
  const numMolotovs = allNades.filter((n) => n.type === "molotov").length;
  const numFlashed = allNades.filter((n) => n.type === "flash").length;
  const numGrenades = allNades.filter((n) => n.type === "hegrenade").length;

  return {
    numSmokes,
    numMolotovs,
    numFlashed,
    numGrenades,
  };
};
