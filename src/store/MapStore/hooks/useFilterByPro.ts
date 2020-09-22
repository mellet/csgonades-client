import { filterByProSelector } from "../selectors";
import { useSelector } from "react-redux";
import { useMapStoreDispatch } from "./helpers";
import { useCallback } from "react";

export const useFilterByPro = () => {
  const byPro = useSelector(filterByProSelector);
  const dispatch = useMapStoreDispatch();

  const toggleFilterByPro = useCallback(() => {
    dispatch({
      type: "MapStore/FilterToggleByPro",
    });
  }, [dispatch]);

  return {
    byPro,
    toggleFilterByPro,
  };
};
