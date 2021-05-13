import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTickrateSelector } from "../selectors";
import { Tickrate } from "../../../nade/models/NadeTickrate";
import { filterByTickrateAction } from "../slice";
import { useGa } from "../../../utils/Analytics";

export const useFilterByTickrate = () => {
  const ga = useGa();
  const dispatch = useDispatch();

  const byTickrate = useSelector(filterByTickrateSelector);
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
      dispatch(filterByTickrateAction(tick));
    },
    [dispatch]
  );

  return {
    byTickrate,
    filterByTickrate,
  };
};
