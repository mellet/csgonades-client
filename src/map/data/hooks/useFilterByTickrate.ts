import { useCallback, useEffect, useState } from "react";
import { Tickrate } from "../../../nade/models/NadeTickrate";
import { useGa } from "../../../utils/Analytics";
import { useLocalStorage } from "usehooks-ts";

export const useFilterByTickrate = () => {
  const defaultTickrate: Tickrate = "any";
  const ga = useGa();

  const [byTickrate, setTicktrate] = useLocalStorage<Tickrate>(
    "filterByTickrate",
    defaultTickrate
  );

  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (!hasChanged) {
      return;
    }
    const delay = setTimeout(() => {
      ga.event({
        category: "map_page",
        action: `click_filter_${byTickrate}`,
      });
    }, 4000);
    return () => {
      if (delay) {
        clearTimeout(delay);
      }
    };
  }, [byTickrate, hasChanged, ga]);

  const filterByTickrate = useCallback(
    (tick: Tickrate) => {
      setHasChanged(true);
      setTicktrate(tick);
    },
    [setTicktrate]
  );

  const resetFilterByTickrate = useCallback(() => {
    setTicktrate(defaultTickrate);
  }, [setTicktrate]);

  return {
    byTickrate,
    filterByTickrate,
    resetFilterByTickrate,
  };
};
