import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAnalytics } from "../../../utils/Analytics";
import { filterByFavoritesSelector } from "../selectors";
import { toggleFavoritesAction } from "../slice";

export const useFilterByFavorites = () => {
  const { event } = useAnalytics();

  const byFavorites = useSelector(filterByFavoritesSelector);
  const dispatch = useDispatch();

  const toggleFavFilter = () => {
    event({
      category: "Filter",
      action: "Toggle Favorite",
    });
    dispatch(toggleFavoritesAction());
  };

  const filterByFavorites = useCallback(toggleFavFilter, [dispatch, event]);

  return {
    filterByFavorites,
    byFavorites,
  };
};
