import { useState } from "react";
import { NadeLight } from "../../../nade/models/Nade";
import { useGa } from "../../../utils/Analytics";

export const useOnNadeClusterClick = () => {
  const { event } = useGa();
  const [suggestedNades, setSuggestedNades] = useState<NadeLight[] | null>(
    null
  );

  function dismissSuggested() {
    setSuggestedNades(null);
  }

  function onNadeClusterClick(cluster: NadeLight[]) {
    /*
    if (cluster.length === 1) {
      const nade = cluster[0];

      if (!nade) {
        return;
      }

      return Router.push("/nades/[nade]", `/nades/${nade.slug || nade.id}`);
    }*/

    setSuggestedNades(cluster);
    event({
      category: "nade_page",
      action: "click_nade_cluster",
    });
  }

  return {
    suggestedNades,
    onNadeClusterClick,
    dismissSuggested,
  };
};
