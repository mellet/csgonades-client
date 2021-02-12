import { useCallback } from "react";
import { NadeType } from "../../../nade/models/NadeType";
import { useDispatch, useSelector } from "react-redux";
import { filterByTypeSelector } from "../selectors";
import { filterByTypeAction } from "../slice";
import { useGaEvent } from "../../../utils/Analytics";

export const useFilterByType = () => {
  const event = useGaEvent();

  const byType = useSelector(filterByTypeSelector);
  const dispatch = useDispatch();

  const filterByType = useCallback(
    (nadeType: NadeType) => {
      dispatch(filterByTypeAction(nadeType));
      event({
        category: "Filter",
        action: `By type ${nadeType}`,
      });
    },
    [dispatch, event]
  );

  return {
    byType,
    filterByType,
  };
};
