import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTickrateSelector } from "../selectors";
import { Tickrate } from "../../../nade-data/Nade/NadeTickrate";
import { filterByTickrateAction } from "../slice";

export const useFilterByTickrate = () => {
  const byTickrate = useSelector(filterByTickrateSelector);
  const dispatch = useDispatch();

  const filterByTickrate = useCallback(
    (tick: Tickrate) => {
      dispatch(filterByTickrateAction(tick));
    },
    [dispatch]
  );

  return {
    byTickrate,
    filterByTickrate,
  };
};
