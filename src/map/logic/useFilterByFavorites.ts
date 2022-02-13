import { useCallback } from "react";
import { useGa } from "../../utils/Analytics";
import { useLocalStorage } from "usehooks-ts";

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
