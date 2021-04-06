import { useSelector } from "react-redux";
import { allFavoritesSelector } from "../FavoriteSelectors";

export const useFavorites = () => {
  const favorites = useSelector(allFavoritesSelector);
  return favorites;
};

export const useIsNadeFavorited = (nadeId: string) => {
  const favorites = useSelector(allFavoritesSelector);

  const isFavorited = favorites.find((f) => f.nadeId === nadeId);

  return !!isFavorited;
};
