import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByMethodSelector } from "../selectors";
import { NadeSortingMethod, setSortingMethodAction } from "../slice";

export const useFilterByMethod = () => {
  const byMethod = useSelector(filterByMethodSelector);
  const dispatch = useDispatch();

  const filterBySortingMethod = useCallback(
    (sortingMethod: NadeSortingMethod) =>
      dispatch(setSortingMethodAction(sortingMethod)),
    [dispatch]
  );

  return {
    byMethod,
    filterBySortingMethod,
  };
};
