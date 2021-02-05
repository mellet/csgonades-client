import { useCallback } from "react";
import { useAddFavorite } from "./useAddFavorite";
import { useIsFavorited } from "./useIsFavorited";
import { useUnfavorite } from "./useUnFavorite";

export const useNadeFavorite = (nadeId: string) => {
  const addFavorite = useAddFavorite();
  const unFavorite = useUnfavorite();
  const favorite = useIsFavorited(nadeId);

  const toggleFavorite = useCallback(() => {
    if (favorite) {
      unFavorite(nadeId);
    } else {
      addFavorite(nadeId);
    }
  }, [favorite, addFavorite, unFavorite, nadeId]);

  return {
    toggleFavorite,
    isFavorite: !!favorite,
  };
};
