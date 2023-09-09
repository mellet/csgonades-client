import { useCallback, useMemo, useState } from "react";
import { useGa } from "../../../utils/Analytics";
import { NadeLight } from "../../../nade/models/NadePartial";

function useSuggestedNades() {
  const [suggestedNades, setSuggestedNadesForMap] = useState<
    NadeLight[] | null
  >(null);

  const setSuggestedNades = useCallback(
    (nades: NadeLight[]) => {
      setSuggestedNadesForMap(nades);
    },
    [setSuggestedNadesForMap]
  );

  const clearSuggestedNades = useCallback(() => {
    setSuggestedNadesForMap(null);
  }, [setSuggestedNadesForMap]);

  return { suggestedNades, setSuggestedNades, clearSuggestedNades };
}

export const useOnNadeClusterClick = () => {
  const { event } = useGa();
  const { suggestedNades, setSuggestedNades, clearSuggestedNades } =
    useSuggestedNades();

  function onNadeClusterClick(cluster: NadeLight[]) {
    setSuggestedNades(cluster);
    event({
      category: "nade_page",
      action: "click_nade_cluster",
    });
  }

  const hasSuggestedNades = useMemo(() => {
    return Boolean(suggestedNades?.length);
  }, [suggestedNades]);

  return {
    suggestedNades,
    hasSuggestedNades,
    onNadeClusterClick,
    dismissSuggested: clearSuggestedNades,
  };
};
