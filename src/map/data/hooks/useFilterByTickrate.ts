import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTickrateSelector } from "../selectors";
import { Tickrate } from "../../../nade/models/NadeTickrate";
import { filterByTickrateAction } from "../slice";
import { useGaEvent } from "../../../utils/Analytics";

export const useFilterByTickrate = () => {
  const event = useGaEvent();

  const byTickrate = useSelector(filterByTickrateSelector);
  const dispatch = useDispatch();

  const filterByTickrate = useCallback(
    (tick: Tickrate) => {
      dispatch(filterByTickrateAction(tick));
      event({
        category: "Filter",
        action: `By tick ${tick}`,
      });
    },
    [dispatch, event]
  );

  return {
    byTickrate,
    filterByTickrate,
  };
};
