import { useMemo } from "react";
import { useSelector } from "react-redux";
import { MapCoordinates, NadeLight } from "../../../nade-data/Nade/Nade";
import { Tickrate } from "../../../nade-data/Nade/NadeTickrate";
import { NadeType } from "../../../nade-data/Nade/NadeType";
import { favoritedNadeIdsSelector } from "../../../store/FavoriteStore/FavoriteSelectors";
import {
  addFavoriteToNades,
  filterByCoords,
  filterByFavorite,
  filterByTickrate,
  filterByType,
  filterBySortMethod,
  filterByPro,
} from "./helpers";
import {
  filterByCoordsSelector,
  filterByTickrateSelector,
  filterByFavoritesSelector,
  filterByTypeSelector,
  filterByMethodSelector,
  currentMapSelector,
  allNadesSelector,
  filterByProSelector,
} from "../selectors";
import { NadeSortingMethod } from "../reducer";

export const useFilterServerSideNades = (
  ssrNades: NadeLight[]
): NadeLight[] => {
  const currentMap = useSelector(currentMapSelector);
  const byCoords = useSelector(filterByCoordsSelector);
  const byTickrate = useSelector(filterByTickrateSelector);
  const byFavorites = useSelector(filterByFavoritesSelector);
  const byType = useSelector(filterByTypeSelector);
  const favoritedNades = useSelector(favoritedNadeIdsSelector);
  const bySortingMethod = useSelector(filterByMethodSelector);
  const storeNades = useSelector(allNadesSelector);
  const byPro = useSelector(filterByProSelector);

  return useMemo(() => {
    const actualNades = currentMap
      ? storeNades[currentMap] || ssrNades
      : ssrNades;

    return filterNades(
      actualNades,
      favoritedNades,
      byFavorites,
      bySortingMethod,
      byCoords,
      byType,
      byTickrate,
      byPro
    );
  }, [
    byPro,
    byCoords,
    byTickrate,
    byFavorites,
    byType,
    favoritedNades,
    ssrNades,
    bySortingMethod,
    currentMap,
    storeNades,
  ]);
};

export function filterNades(
  nades: NadeLight[],
  favoritedNades: string[],
  byFavorites: boolean,
  byMethod: NadeSortingMethod,
  byCoords?: MapCoordinates,
  byType?: NadeType,
  byTickrate?: Tickrate,
  byPro?: boolean
): NadeLight[] {
  let thenades = [...nades];
  thenades.sort(sortByScore);

  thenades = addFavoriteToNades(thenades, favoritedNades);
  thenades = filterByCoords(thenades, byCoords);
  thenades = filterByType(thenades, byType);
  thenades = filterByTickrate(thenades, byTickrate);
  thenades = filterByFavorite(thenades, byFavorites);
  thenades = filterBySortMethod(thenades, byMethod);
  thenades = filterByPro(thenades, byPro);
  return thenades;
}

function sortByScore(a: NadeLight, b: NadeLight) {
  return b.score - a.score;
}
