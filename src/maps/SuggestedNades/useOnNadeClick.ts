import Router from "next/router";
import { useState } from "react";
import { NadeLight } from "../../nade-data/Nade/Nade";
import { useAnalytics } from "../../utils/Analytics";

export const useOnNadeClusterClick = () => {
  const { event } = useAnalytics();
  const [suggestedNades, setSuggestedNades] = useState<NadeLight[] | null>(
    null
  );

  function dismissSuggested() {
    setSuggestedNades(null);
  }

  function onNadeClusterClick(cluster: NadeLight[]) {
    if (cluster.length === 1) {
      const nade = cluster[0];
      return Router.push("/nades/[nade]", `/nades/${nade.slug || nade.id}`);
    }

    setSuggestedNades(cluster);
    event({
      category: "MapOverview",
      action: "Icon Click",
    });
  }

  return {
    suggestedNades,
    onNadeClusterClick,
    dismissSuggested,
  };
};
