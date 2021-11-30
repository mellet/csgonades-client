import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useGa } from "../../../utils/Analytics";

export const useFilterByFavorites = () => {
  const ga = useGa();
  const [byFavorites, setFilterByFavorites] = useLocalStorage(
    "filterByFavorite",
    false
  );

  const toggleFilterByFavorites = useCallback(() => {
    setFilterByFavorites(!byFavorites);
    ga.event({
      category: "map_page",
      action: "click_filter_favorite",
    });
  }, [byFavorites, ga, setFilterByFavorites]);

  const resetFilterByFavorites = useCallback(() => {
    setFilterByFavorites(false);
  }, [setFilterByFavorites]);

  return {
    toggleFilterByFavorites,
    resetFilterByFavorites,
    byFavorites,
  };
};
