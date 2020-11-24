import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilterAction } from "../slice";
import {
  filterByTickrateSelector,
  filterByFavoritesSelector,
  filterByTypeSelector,
  filterByProSelector,
} from "../selectors";

export const useFilterReset = () => {
  const byTickrate = useSelector(filterByTickrateSelector);
  const byFavorites = useSelector(filterByFavoritesSelector);
  const byType = useSelector(filterByTypeSelector);
  const byPro = useSelector(filterByProSelector);
  const dispatch = useDispatch();

  const resetFilter = useCallback(() => dispatch(resetFilterAction()), [
    dispatch,
  ]);

  const canReset = useMemo(() => {
    if (byFavorites) {
      return true;
    }
    if (byTickrate !== "any") {
      return true;
    }
    if (byType) {
      return true;
    }
    if (byPro) {
      return true;
    }
    return false;
  }, [byTickrate, byFavorites, byType, byPro]);

  return {
    resetFilter,
    canReset,
  };
};
