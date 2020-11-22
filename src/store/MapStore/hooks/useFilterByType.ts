import { useCallback } from "react";
import { NadeType } from "../../../nade-data/Nade/NadeType";
import { useSelector } from "react-redux";
import { filterByTypeSelector } from "../selectors";
import { useMapStoreDispatch } from "./helpers";

export const useFilterByType = () => {
  const byType = useSelector(filterByTypeSelector);
  const dispatch = useMapStoreDispatch();

  const filterByType = useCallback(
    (nadeType: NadeType) =>
      dispatch({ type: "MapStore/FilterByType", payload: nadeType }),
    [dispatch]
  );

  return {
    byType,
    filterByType,
  };
};
