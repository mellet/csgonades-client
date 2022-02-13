import { useCallback } from "react";
import { useGa } from "../../utils/Analytics";
import { useLocalStorage } from "usehooks-ts";

export const useFilterByPro = () => {
  const ga = useGa();

  const [filterByPro, setFilterByPro] = useLocalStorage("filterByPro", false);

  const toggleFilterByPro = useCallback(() => {
    setFilterByPro(!filterByPro);
    ga.event({
      category: "map_page",
      action: `click_filter_pro`,
    });
  }, [ga, setFilterByPro, filterByPro]);

  const resetFilterByPro = useCallback(() => {
    setFilterByPro(false);
  }, [setFilterByPro]);

  return {
    byPro: filterByPro,
    toggleFilterByPro,
    resetFilterByPro,
  };
};
