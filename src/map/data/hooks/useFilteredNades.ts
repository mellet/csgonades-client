import { useMemo } from "react";
import { useSelector } from "react-redux";
import { NadeLight } from "../../../nade/models/Nade";
import { Tickrate } from "../../../nade/models/NadeTickrate";
import { NadeType } from "../../../nade/models/NadeType";
import { favoritedNadeIdsSelector } from "../../../favorites/data/FavoriteSelectors";
import {
  addFavoriteToNades,
  filterByFavorite,
  filterByTickrate,
  filterByType,
  filterBySortMethod,
  filterByPro,
  filterByTeam,
} from "./helpers";
import {
  filterByTickrateSelector,
  filterByFavoritesSelector,
  filterByTypeSelector,
  filterByMethodSelector,
  currentMapSelector,
  allNadesSelector,
  filterByProSelector,
  filterByTeamSelector,
} from "../selectors";
import { NadeSortingMethod } from "../slice";
import { TeamSide } from "../../../nade/models/TeamSide";

export const useFilterServerSideNades = (
  ssrNades: NadeLight[]
): NadeLight[] => {
  const currentMap = useSelector(currentMapSelector);
  const byTickrate = useSelector(filterByTickrateSelector);
  const byFavorites = useSelector(filterByFavoritesSelector);
  const byType = useSelector(filterByTypeSelector);
  const byTeam = useSelector(filterByTeamSelector);
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
      byType,
      byTickrate,
      byPro,
      byTeam
    );
  }, [
    byPro,
    byTickrate,
    byFavorites,
    byType,
    favoritedNades,
    ssrNades,
    bySortingMethod,
    currentMap,
    storeNades,
    byTeam,
  ]);
};

export function filterNades(
  nades: NadeLight[],
  favoritedNades: string[],
  byFavorites: boolean,
  byMethod: NadeSortingMethod,
  byType?: NadeType,
  byTickrate?: Tickrate,
  byPro?: boolean,
  byTeam?: TeamSide,
): NadeLight[] {
  let thenades = [...nades];
  thenades.sort(sortByScore);

  thenades = addFavoriteToNades(thenades, favoritedNades);
  thenades = filterByType(thenades, byType);
  thenades = filterByTickrate(thenades, byTickrate);
  thenades = filterByFavorite(thenades, byFavorites);
  thenades = filterBySortMethod(thenades, byMethod);
  thenades = filterByPro(thenades, byPro);
  thenades = filterByTeam(thenades, byTeam);
  return thenades;
}

function sortByScore(a: NadeLight, b: NadeLight) {
  return b.score - a.score;
}
