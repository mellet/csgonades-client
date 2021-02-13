import { filterByProSelector } from "../selectors";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { toggleProNadesAction } from "../slice";
import { useGa } from "../../../utils/Analytics";

export const useFilterByPro = () => {
  const ga = useGa();

  const byPro = useSelector(filterByProSelector);
  const dispatch = useDispatch();

  const toggleFilterByPro = useCallback(() => {
    dispatch(toggleProNadesAction());
    ga.event({
      category: "map-page",
      action: `Filter Pro`,
    });
  }, [dispatch, ga]);

  return {
    byPro,
    toggleFilterByPro,
  };
};
