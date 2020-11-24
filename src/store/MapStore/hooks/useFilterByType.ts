import { useCallback } from "react";
import { NadeType } from "../../../nade-data/Nade/NadeType";
import { useDispatch, useSelector } from "react-redux";
import { filterByTypeSelector } from "../selectors";
import { filterByTypeAction } from "../slice";

export const useFilterByType = () => {
  const byType = useSelector(filterByTypeSelector);
  const dispatch = useDispatch();

  const filterByType = useCallback(
    (nadeType: NadeType) => dispatch(filterByTypeAction(nadeType)),
    [dispatch]
  );

  return {
    byType,
    filterByType,
  };
};
