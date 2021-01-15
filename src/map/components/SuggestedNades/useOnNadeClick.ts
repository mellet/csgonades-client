import Router from "next/router";
import { useState } from "react";
import { NadeLight } from "../../../nade/models/Nade";

export const useOnNadeClusterClick = () => {
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
  }

  return {
    suggestedNades,
    onNadeClusterClick,
    dismissSuggested,
  };
};
