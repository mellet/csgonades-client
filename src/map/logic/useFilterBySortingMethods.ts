import { useCallback } from "react";
import { useGa } from "../../utils/Analytics";
import { NadeLightSort } from "../../nade/models/Nade";
import { useLocalStorage } from "usehooks-ts";

export const useFilterBySortingMethod = () => {
  const ga = useGa();

  const [sortBy, setSortBy] = useLocalStorage<NadeLightSort>(
    "filterBySortingMethod",
    "eloScore"
  );

  const setSortingMethod = useCallback(
    (sortBy: NadeLightSort) => {
      setSortBy(sortBy);
      ga.event({
        category: "map_page",
        action: `click_filter_sort_${sortBy}`,
      });
    },
    [ga, setSortBy]
  );

  const resetSortingMethod = useCallback(() => {
    setSortBy("eloScore");
  }, [setSortBy]);

  return {
    bySortingMethod: sortBy,
    setSortingMethod,
    resetSortingMethod,
  };
};
