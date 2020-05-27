import { useSelector } from "react-redux";
import { favoriteInProgress } from "../FavoriteSelectors";

export const useIsFavoriteInProgress = (): boolean => {
  const isInProgress = useSelector(favoriteInProgress);
  return isInProgress;
};
