import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTeamSelector } from "../selectors";
import { filterByTeamAction } from "../slice";
import { TeamSide } from "../../../nade/models/TeamSide";
import { useGa } from "../../../utils/Analytics";

export const useFilterByTeam = () => {
  const byTeam = useSelector(filterByTeamSelector);
  const dispatch = useDispatch();
  const [hasChanged, setHasChanged] = useState(false);
  const ga = useGa();

  useEffect(() => {
    if (!hasChanged) {
      return;
    }
    const delay = setTimeout(() => {
      ga.event({
        category: "map_page",
        action: `click_filter_${byTeam}`,
      });
    }, 4000);
    return () => {
      if (delay) {
        clearTimeout(delay);
      }
    };
  }, [byTeam, hasChanged, ga]);

  const filterByTeam = useCallback(
    (team: TeamSide) => {
      setHasChanged(true);
      dispatch(filterByTeamAction(team));
    },
    [dispatch]
  );

  return {
    byTeam,
    filterByTeam,
  };
};
