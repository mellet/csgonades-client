import { useCallback, useMemo } from "react";
import useSWR from "swr";
import { useSession } from "../../../core/authentication/useSession";
import { NadeApi } from "../../../nade/data/NadeApi";
import { FavoriteApi } from "../FavoriteApi";

async function fetchFavorites() {
  const favorites = await FavoriteApi.getUserFavoritesV2();

  return favorites.map((favorite) => favorite.nadeId);
}

export const useFavorites = () => {
  const { isAuthenticated } = useSession();
  const { data, mutate } = useSWR(
    isAuthenticated ? ["/favorites"] : null,
    fetchFavorites,
    {
      dedupingInterval: 60 * 60 * 1000, // 60 minutes
      focusThrottleInterval: 60 * 60 * 1000, // 60 minutes
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
  const { favoritedNades } = useFavorites();
  return favoritedNades.includes(nadeId);
};
