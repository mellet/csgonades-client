import useSWR from "swr";
import { GameMode } from "../models/GameMode";
import { NadeApi } from "./NadeApi";
import { useFavorites } from "../../favorites/data/useFavorites";
import { useMemo } from "react";
import { addFavoriteToNades } from "../../map/logic/helpers";
import { NadeLight } from "../models/NadePartial";

async function recentNadesFetcher(_url: string, gameMode: GameMode) {
  return NadeApi.getRecent(gameMode);
}

export const useRecentNades = (gameMode: GameMode) => {
  const { data, isValidating } = useSWR(
    ["/nades/recent", gameMode],
    recentNadesFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    recentNades: data || [],
    isLoading: isValidating,
  };
};

export const useRecentNadesWithFavorites = (
  nades: NadeLight[]
): NadeLight[] => {
  const { favoritedNades } = useFavorites();

  return useMemo(() => {
    let thenades = [...nades];
    thenades = addFavoriteToNades(thenades, favoritedNades);

    return thenades;
  }, [nades, favoritedNades]);
};
