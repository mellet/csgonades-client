import { useMemo } from "react";
import { NadeLight } from "../../nade/models/NadeLight";
import { Tickrate } from "../../nade/models/NadeTickrate";
import { NadeType } from "../../nade/models/NadeType";
import {
  addFavoriteToNades,
  filterByFavorite,
  filterByTickrate,
  filterByType,
  filterByPro,
  filterByTeam,
} from "./helpers";
import { TeamSide } from "../../nade/models/TeamSide";
import { useFilterByTickrate } from "./useFilterByTickrate";
import { useFilterByFavorites } from "./useFilterByFavorites";
import { useFilterByPro } from "./useFilterByPro";
import { useFilterByType } from "./useFilterByType";
import { useFilterByTeam } from "./useFilterByTeam";
import { useFavorites } from "../../favorites/data/useFavorites";

export const useFilterNadeView = (nades: NadeLight[]) => {
  const { byTickrate } = useFilterByTickrate();
  const { byTeam } = useFilterByTeam();
  const { byFavorites } = useFilterByFavorites();
  const { favoritedNades } = useFavorites();

  const filteredNades = useMemo(() => {
    let thenades = nades;
    thenades = addFavoriteToNades(thenades, favoritedNades);
    thenades.sort(sortByScore);
    thenades = filterByTickrate(thenades, byTickrate);
    thenades = filterByTeam(thenades, byTeam);
    thenades = filterByFavorite(thenades, byFavorites);
    return thenades;
  }, [nades, favoritedNades, byTickrate, byTeam, byFavorites]);

  return filteredNades;
};

export const useFilterServerSideNades = (
  ssrNades: NadeLight[]
): NadeLight[] => {
  const { byPro } = useFilterByPro();
  const { byFavorites } = useFilterByFavorites();
  const { byTickrate } = useFilterByTickrate();
  const { byType } = useFilterByType();
  const { byTeam } = useFilterByTeam();
  const { favoritedNades } = useFavorites();

  return useMemo(() => {
    const actualNades = ssrNades;

    return filterNades(
      actualNades,
      favoritedNades,
      byFavorites,
      byTeam,
      byTickrate,
      byType,
      byPro
    );
  }, [
    byFavorites,
    byPro,
    byTeam,
    byTickrate,
    byType,
    favoritedNades,
    ssrNades,
  ]);
};

function filterNades(
  nades: NadeLight[],
  favoritedNades: string[],
  byFavorites: boolean,
  byTeam: TeamSide,
  byTickrate: Tickrate,
  byType?: NadeType,
  byPro?: boolean
): NadeLight[] {
  let thenades = [...nades];
  thenades.sort(sortByScore);
  thenades = addFavoriteToNades(thenades, favoritedNades);
  thenades = filterByType(thenades, byType);
  thenades = filterByTickrate(thenades, byTickrate);
  thenades = filterByFavorite(thenades, byFavorites);
  thenades = filterByPro(thenades, byPro);
  thenades = filterByTeam(thenades, byTeam);
  return thenades;
}

function sortByScore(a: NadeLight, b: NadeLight) {
  return b.score - a.score;
}
