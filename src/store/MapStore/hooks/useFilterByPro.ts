import { filterByProSelector } from "../selectors";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { toggleProNadesAction } from "../slice";

export const useFilterByPro = () => {
  const byPro = useSelector(filterByProSelector);
  const dispatch = useDispatch();

  const toggleFilterByPro = useCallback(() => {
    dispatch(toggleProNadesAction());
  }, [dispatch]);

  return {
    byPro,
    toggleFilterByPro,
  };
};
