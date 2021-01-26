import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilterAction } from "../slice";
import {
  filterByTickrateSelector,
  filterByFavoritesSelector,
  filterByTypeSelector,
  filterByProSelector,
} from "../selectors";
import { useAnalytics } from "../../../utils/Analytics";

export const useFilterReset = () => {
  const { event } = useAnalytics();

  const byTickrate = useSelector(filterByTickrateSelector);
  const byFavorites = useSelector(filterByFavoritesSelector);
  const byType = useSelector(filterByTypeSelector);
  const byPro = useSelector(filterByProSelector);
  const dispatch = useDispatch();

  const resetFilter = useCallback(
    (disableAnalytics?: boolean) => {
      dispatch(resetFilterAction());
      if (!disableAnalytics) {
        event({
          category: "Filter",
          action: "Reset",
        });
      }
    },
    [dispatch, event]
  );

  const canReset = useMemo(() => {
    if (byFavorites) {
      return true;
    }
    if (byTickrate !== "any") {
      return true;
    }
    if (byType !== "smoke") {
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
