import { FC, useCallback, useMemo } from "react";
import { FilterLabel } from "./FilterLabel";
import { IconButtonGroup } from "../../../../shared-components/buttons/IconButtonGroup.tsx/IconButtonGroup";
import { SquareButton } from "../../../../shared-components/buttons/IconButton";
import { useFilterByTeam } from "../../../data/hooks/useFilterByTeam";
import { OptionCarusel } from "./OptionCarusel";

export const TeamSelector: FC = () => {
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
        <FilterLabel value="TEAM" />
        <IconButtonGroup>
          <SquareButton
            onClick={onChange}
            icon={
              <OptionCarusel
                values={["Any", "T", "CT"]}
                selectedIndex={selectedIndex}
              />
            }
          />
        </IconButtonGroup>
      </div>
    </>
  );
};
