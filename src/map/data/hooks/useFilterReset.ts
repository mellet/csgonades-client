import { useCallback, useMemo } from "react";
import { useGa } from "../../../utils/Analytics";
import { useFilterByPro } from "./useFilterByPro";
import { useFilterByTickrate } from "./useFilterByTickrate";
import { useFilterByFavorites } from "./useFilterByFavorites";
import { useFilterByType } from "./useFilterByType";
import { useFilterByTeam } from "./useFilterByTeam";

export const useFilterReset = () => {
  const ga = useGa();

  const { byPro, resetFilterByPro } = useFilterByPro();
  const { byTickrate, resetFilterByTickrate } = useFilterByTickrate();
  const { byFavorites, resetFilterByFavorites } = useFilterByFavorites();
  const { byType, resetFilterByType } = useFilterByType();
  const { byTeam, resetFilterByTeam } = useFilterByTeam();

  const resetFilter = useCallback(
    (disableAnalytics?: boolean) => {
      resetFilterByPro();
      resetFilterByTickrate();
      resetFilterByFavorites();
      resetFilterByType();
      resetFilterByTeam();

      if (!disableAnalytics) {
        ga.event({
          category: "map_page",
          action: "click_reset_filter",
        });
      }
    },
    [
      ga,
      resetFilterByPro,
      resetFilterByTickrate,
      resetFilterByFavorites,
      resetFilterByType,
      resetFilterByTeam,
    ]
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
    if (byTeam !== "both") {
      return true;
    }

    return false;
  }, [byTickrate, byFavorites, byType, byPro, byTeam]);

  return {
    resetFilter,
    canReset,
  };
};
