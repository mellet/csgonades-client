import { useMemo } from "react";
import { useSelector } from "react-redux";
import { NadeLight } from "../../../nade/models/Nade";
import { favoritedNadeIdsSelector } from "../../../favorites/data/FavoriteSelectors";
import { custerNades } from "../../../utils/Cluster";
import {
  filterByTickrateSelector,
  filterByFavoritesSelector,
  filterByTypeSelector,
  filterByProSelector,
} from "../selectors";
import {
  addFavoriteToNades,
  filterByType,
  filterByTickrate,
  filterByFavorite,
  containsSimilarNade,
  filterByPro,
} from "./helpers";

export const useNadesForMapView = (nades: NadeLight[]): NadeLight[] => {
  const byTickrate = useSelector(filterByTickrateSelector);
  const byFavorites = useSelector(filterByFavoritesSelector);
  const byType = useSelector(filterByTypeSelector);
  const favoritedNades = useSelector(favoritedNadeIdsSelector);
  const byPro = useSelector(filterByProSelector);

  const unqiueNadesForPosition = useMemo(() => {
    const unqiueNades: NadeLight[] = [];

    if (!nades) {
      return unqiueNades;
    }

    let filteredNades = [...nades];

    filteredNades = addFavoriteToNades(filteredNades, favoritedNades);
    filteredNades = filterByType(filteredNades, byType);
    filteredNades = filterByTickrate(filteredNades, byTickrate);
    filteredNades = filterByFavorite(filteredNades, byFavorites);
    filteredNades = filterByPro(filteredNades, byPro);

    for (const nade of filteredNades) {
      if (nade.mapEndCoord && nade.type) {
        if (!containsSimilarNade(nade, unqiueNades)) {
          unqiueNades.push(nade);
        }
      }
    }
    return unqiueNades;
  }, [nades, byType, byTickrate, byFavorites, favoritedNades, byPro]);

  return unqiueNadesForPosition;
};

export const useNadeClusters = (nades: NadeLight[]): NadeLight[][] => {
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
