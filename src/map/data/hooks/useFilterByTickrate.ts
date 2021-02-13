import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTickrateSelector } from "../selectors";
import { Tickrate } from "../../../nade/models/NadeTickrate";
import { filterByTickrateAction } from "../slice";
import { useGa } from "../../../utils/Analytics";

export const useFilterByTickrate = () => {
  const ga = useGa();

  const byTickrate = useSelector(filterByTickrateSelector);
  const dispatch = useDispatch();

  const filterByTickrate = useCallback(
    (tick: Tickrate) => {
      dispatch(filterByTickrateAction(tick));
      ga.event({
        category: "map_page",
        action: `click_filter_${tick}`,
      });
    },
    [dispatch, ga]
  );

  return {
    byTickrate,
    filterByTickrate,
  };
};
