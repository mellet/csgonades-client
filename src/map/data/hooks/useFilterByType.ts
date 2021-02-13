import { useCallback } from "react";
import { NadeType } from "../../../nade/models/NadeType";
import { useDispatch, useSelector } from "react-redux";
import { filterByTypeSelector } from "../selectors";
import { filterByTypeAction } from "../slice";
import { useGa } from "../../../utils/Analytics";

export const useFilterByType = () => {
  const ga = useGa();

  const byType = useSelector(filterByTypeSelector);
  const dispatch = useDispatch();

  const filterByType = useCallback(
    (nadeType: NadeType) => {
      dispatch(filterByTypeAction(nadeType));
      ga.event({
        category: "map-page",
        action: `Filter Nade Type ${nadeType}`,
      });
    },
    [dispatch, ga]
  );

  return {
    byType,
    filterByType,
  };
};
