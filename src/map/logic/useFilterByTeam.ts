import { useCallback, useEffect, useState } from "react";
import { TeamSide } from "../../nade/models/TeamSide";
import { useGa } from "../../utils/Analytics";
import { useLocalStorage } from "../../utils/useLocalStorage";

export const useFilterByTeam = () => {
  const defaultTeam: TeamSide = "both";
  const [byTeam, setByTeam] = useLocalStorage<TeamSide>(
    "filterByTeam",
    defaultTeam
  );
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
      setByTeam(team);
    },
    [setByTeam]
  );

  const resetFilterByTeam = useCallback(() => {
    setByTeam(defaultTeam);
  }, [setByTeam]);

  return {
    byTeam,
    filterByTeam,
    resetFilterByTeam,
  };
};
