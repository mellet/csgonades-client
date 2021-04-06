import { useSelector } from "react-redux";
import { allFavoritesSelector } from "../FavoriteSelectors";

export const useFavorites = () => {
  const favorites = useSelector(allFavoritesSelector);
  return favorites;
};
