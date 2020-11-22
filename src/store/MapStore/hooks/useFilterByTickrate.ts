import { useCallback } from "react";
import { useSelector } from "react-redux";
import { filterByTickrateSelector } from "../selectors";
import { useMapStoreDispatch } from "./helpers";
import { Tickrate } from "../../../nade-data/Nade/NadeTickrate";

export const useFilterByTickrate = () => {
  const byTickrate = useSelector(filterByTickrateSelector);
  const dispatch = useMapStoreDispatch();

  const filterByTickrate = useCallback(
    (tick: Tickrate) => {
      dispatch({
        type: "MapStore/FilterByTickrate",
        tick,
      });
    },
    [dispatch]
  );

  return {
    byTickrate,
    filterByTickrate,
  };
};
