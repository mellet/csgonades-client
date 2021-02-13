import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGa } from "../../../utils/Analytics";
import { filterByFavoritesSelector } from "../selectors";
import { toggleFavoritesAction } from "../slice";

export const useFilterByFavorites = () => {
  const ga = useGa();
  const byFavorites = useSelector(filterByFavoritesSelector);
  const dispatch = useDispatch();

  const toggleFavFilter = () => {
    ga.event({
      category: "map-page",
      action: "Filter Favorite",
    });
    dispatch(toggleFavoritesAction());
  };

  const filterByFavorites = useCallback(toggleFavFilter, [dispatch, ga]);

  return {
    filterByFavorites,
    byFavorites,
  };
};
