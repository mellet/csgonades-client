import { useCallback, useMemo } from "react";
import { NadeLight } from "../../../nade/models/Nade";
import { useGa } from "../../../utils/Analytics";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import { CsgoMap } from "../../models/CsGoMap";

function useSuggestedNadesLocal(map: CsgoMap) {
  const [suggestedNades, setSuggestedNadesForMap] = useLocalStorage<
    NadeLight[] | null
  >(`${map}/suggestedNades`, null);

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

export const useOnNadeClusterClick = (map: CsgoMap) => {
  const { event } = useGa();
  const { suggestedNades, setSuggestedNades, clearSuggestedNades } =
    useSuggestedNadesLocal(map);

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
