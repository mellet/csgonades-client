import { useCallback } from "react";
import { NadeType } from "../../nade/models/NadeType";
import { useGa } from "../../utils/Analytics";
import { useLocalStorage } from "../../utils/useLocalStorage";

export const useFilterByType = () => {
  const ga = useGa();

  const defaultType: NadeType = "smoke";
  const [byType, setByType] = useLocalStorage<NadeType>(
    "filterByType",
    defaultType
  );

  const filterByType = useCallback(
    (nadeType: NadeType) => {
      setByType(nadeType);
      ga.event({
        category: "map_page",
        action: `click_filter_type_${nadeType}`,
      });
    },
    [ga, setByType]
  );

  const resetFilterByType = useCallback(() => {
    setByType(defaultType);
  }, [setByType]);

  return {
    byType,
    filterByType,
    resetFilterByType,
  };
};
