import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByFavoritesSelector } from "../selectors";
import { toggleFavoritesAction } from "../slice";

export const useFilterByFavorites = () => {
  const byFavorites = useSelector(filterByFavoritesSelector);
  const dispatch = useDispatch();

  const toggleFavFilter = () => dispatch(toggleFavoritesAction());

  const filterByFavorites = useCallback(toggleFavFilter, [dispatch]);

  return {
    filterByFavorites,
    byFavorites,
  };
};
