import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTeamSelector } from "../selectors";
import { filterByTeamAction } from "../slice";
import { useGa } from "../../../utils/Analytics";
import { TeamSide } from "../../../nade/models/TeamSide";

export const useFilterByTeam = () => {
  const ga = useGa();

  const byTeam = useSelector(filterByTeamSelector);
  const dispatch = useDispatch();

  const filterByTeam = useCallback(
    (team: TeamSide) => {
      dispatch(filterByTeamAction(team));
      ga.event({
        category: "map_page",
        action: `click_filter_${team}`,
      });
    },
    [dispatch, ga]
  );

  return {
    byTeam,
    filterByTeam,
  };
};
