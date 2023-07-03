import { useCallback, useEffect, useMemo } from "react";
import { TeamSide } from "../../nade/models/TeamSide";
import { useGa } from "../../utils/Analytics";
import { useRouter } from "next/router";
import { setQueryParameter } from "./helpers";

export const useFilterByTeam = () => {
  const teamSide = useQueryNadeTeam();
  const router = useRouter();
  const ga = useGa();

  useEffect(() => {
    if (!teamSide) {
      return;
    }
    const delay = setTimeout(() => {
      ga.event({
        category: "map_page",
        action: `click_filter_${teamSide}`,
      });
    }, 4000);
    return () => {
      if (delay) {
        clearTimeout(delay);
      }
    };
  }, [teamSide, ga]);

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
