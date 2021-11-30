import { useCallback, useMemo } from "react";
import useSWR from "swr";
import { useSession } from "../../../core/authentication/useSession";
import { NadeApi } from "../../../nade/data/NadeApi";
import { FavoriteApi } from "../FavoriteApi";

async function fetchFavorites() {
  const favorites = await FavoriteApi.getUserFavoritesV2();

  console.log("# Fetched favorited nades", favorites.length);

  return favorites.map((favorite) => favorite.nadeId);
}

export const useFavoritesV2 = () => {
  const { isAuthenticated } = useSession();
  const { data, mutate } = useSWR(
    isAuthenticated ? ["/favorites"] : null,
    fetchFavorites,
    {
      dedupingInterval: 30 * 60 * 1000, // 30 minutes
      errorRetryCount: 1,
      focusThrottleInterval: 30 * 60 * 1000, // 30 minutes
    }
  );

  const favoritedNades = useMemo(() => {
    return data || [];
  }, [data]);

  const addNadeAsFavorite = useCallback(
    async (nadeId: string) => {
      if (!isAuthenticated) {
        return;
      }
      console.log("# Adding favorite");
      mutate(
        (prevFavoritedNades) =>
          prevFavoritedNades ? [...prevFavoritedNades, nadeId] : [nadeId],
        false
      );
      await NadeApi.favoriteNade(nadeId);
    },
    [mutate, isAuthenticated]
  );

  const removeNadeAsFavorite = useCallback(
    async (nadeId: string) => {
      if (!isAuthenticated) {
        return;
      }

      mutate((prevFavoritedNades) => {
        if (!prevFavoritedNades) {
          return prevFavoritedNades;
        } else {
          return prevFavoritedNades.filter((nId) => nId !== nadeId);
        }
      }, false);
      await NadeApi.unFavoriteNade(nadeId);
    },
    [isAuthenticated, mutate]
  );

  const clearFavorites = useCallback(() => {
    mutate([]);
  }, [mutate]);

  return {
    favoritedNades,
    addNadeAsFavorite,
    removeNadeAsFavorite,
    clearFavorites,
  };
};

export const useIsNadeFavorited = (nadeId: string) => {
  const { favoritedNades } = useFavoritesV2();
  return favoritedNades.includes(nadeId);
};
