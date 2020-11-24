import Router from "next/router";
import { useState } from "react";
import { MapCoordinates, NadeLight } from "../../nade-data/Nade/Nade";
import { filterByCoords } from "../../store/MapStore/hooks/helpers";

export const useOnNadeClick = (filteredNades: NadeLight[]) => {
  const [suggestedNades, setSuggestedNades] = useState<NadeLight[] | null>(
    null
  );

  function dismissSuggested() {
    setSuggestedNades(null);
  }

  function onNadeClick(pos: MapCoordinates) {
    const suggested = filterByCoords(filteredNades, pos);

    if (suggested.length === 1) {
      const nade = suggested[0];
      return Router.push("/nades/[nade]", `/nades/${nade.slug || nade.id}`);
    }

    setSuggestedNades(suggested);
  }

  return {
    suggestedNades,
    onNadeClick,
    dismissSuggested,
  };
};
