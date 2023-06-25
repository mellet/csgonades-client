import { useMemo } from "react";
import { NadeLight } from "../../nade/models/Nade";
import { custerNades } from "../../utils/Cluster";
import { useFilterServerSideNades } from "./useFilteredNades";

export const useNadeClusters = (rawNades: NadeLight[]): NadeLight[][] => {
  const nades = useFilterServerSideNades(rawNades);

  const unqiueNadesForPosition = useMemo(() => {
    if (!nades) {
      return [];
    }

    const cluster = memClusterNades(nades);
    return cluster;
  }, [nades]);

  return unqiueNadesForPosition;
};

const memoizeClusterNades = (
  fn: (nades: NadeLight[]) => NadeLight[][]
): ((nades: NadeLight[]) => NadeLight[][]) => {
  const cache = {};
  return (...args) => {
    const nades = args[0] as NadeLight[];
    const key = nades.reduce((acc, nade) => (acc += nade.id), "");
    if (key in cache) {
      return cache[key];
    } else {
      const result = fn(nades);
      cache[key] = result;
      return result;
    }
  };
};

const memClusterNades = memoizeClusterNades(custerNades);
