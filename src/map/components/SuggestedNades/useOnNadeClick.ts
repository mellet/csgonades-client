import { useMemo } from "react";
import { NadeLight } from "../../../nade/models/Nade";
import { useGa } from "../../../utils/Analytics";
import { useLocalStorage } from "usehooks-ts";
import { CsgoMap } from "../../models/CsGoMap";

export const useOnNadeClusterClick = (map: CsgoMap) => {
  const { event } = useGa();
  const [suggestedNades, setSuggestedNades] = useLocalStorage<
    NadeLight[] | null
  >(`${map}/suggestedNades`, null);

  function dismissSuggested() {
    setSuggestedNades(null);
  }

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
    dismissSuggested,
  };
};
