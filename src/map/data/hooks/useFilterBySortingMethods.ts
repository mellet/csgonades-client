import { useCallback } from "react";
import { useGa } from "../../../utils/Analytics";
import { useLocalStorage } from "usehooks-ts";
import { NadeLightSort } from "../../../nade/models/Nade";

export const useFilterBySortingMethod = () => {
  const ga = useGa();

  const [sortBy, setSortBy] = useLocalStorage<NadeLightSort>(
    "filterBySortingMethod",
    "score"
  );

  const setSortingMethod = useCallback(
    (sortBy: NadeLightSort) => {
      setSortBy(sortBy);
      ga.event({
        category: "map_page",
        action: `click_click_filter_sort_${sortBy}`,
      });
    },
    [ga, setSortBy]
  );

  const resetSortingMethod = useCallback(() => {
    setSortBy("score");
  }, [setSortBy]);

  return {
    bySortingMethod: sortBy,
    setSortingMethod,
    resetSortingMethod,
  };
};
