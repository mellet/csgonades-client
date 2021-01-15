import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Favorite } from "../../models/Favorite";
import { allFavoritesSelector } from "../FavoriteSelectors";

export const useIsFavorited = (nadeId: string): Favorite | undefined => {
  const favories = useSelector(allFavoritesSelector);

  const result = useMemo(() => {
    return favories.find((favorite) => favorite.nadeId === nadeId);
  }, [favories, nadeId]);

  return result;
};
