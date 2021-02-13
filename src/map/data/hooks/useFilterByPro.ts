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
      category: "map_page",
      action: `click_filter_pro`,
    });
  }, [dispatch, ga]);

  return {
    byPro,
    toggleFilterByPro,
  };
};
