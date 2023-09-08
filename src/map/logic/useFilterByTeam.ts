import { useCallback, useMemo } from "react";
import { TeamSide } from "../../nade/models/TeamSide";
import { useRouter } from "next/router";
import { setQueryParameter } from "./helpers";

export const useFilterByTeam = () => {
  const teamSide = useQueryNadeTeam();
  const router = useRouter();

  const byTeamSide: TeamSide = useMemo(() => {
    return teamSide || "both";
  }, [teamSide]);

  const filterByTeam = useCallback(
    (selectedTeam: TeamSide) => {
      setQueryParameter(
        router,
        "team",
        convertTeamSideToQueryString(selectedTeam)
      );
    },
    [router]
  );

  return {
    byTeam: byTeamSide,
    filterByTeam,
  };
};

const useQueryNadeTeam = (): TeamSide | undefined => {
  const { query } = useRouter();

  if (!query.team) {
    return;
  }

  switch (query.team) {
    case "ct":
      return "counterTerrorist";
    case "t":
      return "terrorist";
    default:
      return "both";
  }
};

const convertTeamSideToQueryString = (teamSide: TeamSide): string => {
  if (teamSide === "counterTerrorist") {
    return "ct";
  } else if (teamSide === "terrorist") {
    return "t";
  } else {
    return "both";
  }
};
