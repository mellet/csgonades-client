import { FC } from "react";
import { FilterLabel } from "./FilterLabel";
import { IconButtonGroup } from "../../../../shared-components/buttons/IconButtonGroup.tsx/IconButtonGroup";
import { IconButton } from "../../../../shared-components/buttons/IconButton";
import { useFilterByTeam } from "../../../data/hooks/useFilterByTeam";

export const TeamSelector: FC = () => {
  const { byTeam, filterByTeam } = useFilterByTeam();

  function filterByTerrorist() {
    filterByTeam("terrorist");
  }

  function filterByTickrate128() {
    filterByTeam("counterTerrorist");
  }

  return (
    <>
      <div className="tick-filter-wrap">
        <FilterLabel value="TEAM" />
        <IconButtonGroup>
          <IconButton
            inGroup
            icon={<span style={{ fontSize: 14 }}>T</span>}
            active={byTeam === "terrorist"}
            onClick={filterByTerrorist}
          />
          <IconButton
            inGroup
            icon={<span style={{ fontSize: 14 }}>CT</span>}
            active={byTeam === "counterTerrorist"}
            onClick={filterByTickrate128}
          />
        </IconButtonGroup>
      </div>
    </>
  );
};
