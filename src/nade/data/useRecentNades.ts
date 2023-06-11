import useSWR from "swr";
import { GameMode } from "../models/GameMode";
import { NadeApi } from "./NadeApi";
import { NadeLight } from "../models/Nade";
import { useFavorites } from "../../favorites/data/useFavorites";
import { useMemo } from "react";
import { addFavoriteToNades } from "../../map/logic/helpers";

async function recentNadesFetcher(gameMode: GameMode) {
  const result = await NadeApi.getRecent(gameMode);

  if (result.isOk()) {
    return result.value;
  } else {
    throw result.error;
  }
}

export const useRecentNades = (gameMode: GameMode) => {
  const { data, isValidating } = useSWR([gameMode], recentNadesFetcher, {
    revalidateOnFocus: false,
  });

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
