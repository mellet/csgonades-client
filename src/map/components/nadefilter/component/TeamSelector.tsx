import { FC, useCallback, useMemo } from "react";
import { FilterLabel } from "./FilterLabel";
import { SquareButton } from "../../../../shared-components/buttons/IconButton/IconButton";
import { useFilterByTeam } from "../../../logic/useFilterByTeam";
import { TeamCarusel } from "./TeamCarusel";

type Props = {
  vertical?: boolean;
};

export const TeamSelector: FC<Props> = ({ vertical }) => {
  const { byTeam, filterByTeam } = useFilterByTeam();

  const selectedIndex = useMemo(() => {
    switch (byTeam) {
      case "terrorist":
        return 1;
      case "counterTerrorist":
        return 2;
      default:
        return 0;
    }
  }, [byTeam]);

  const onChange = useCallback(() => {
    if (byTeam === "both") {
      filterByTeam("terrorist");
    } else if (byTeam === "terrorist") {
      filterByTeam("counterTerrorist");
    } else {
      filterByTeam("both");
    }
  }, [byTeam, filterByTeam]);

  return (
    <>
      <div className="tick-filter-wrap">
        <FilterLabel value="TEAM" center={vertical} />
        <SquareButton
          onClick={onChange}
          icon={<TeamCarusel selectedIndex={selectedIndex} />}
        />
      </div>
    </>
  );
};
