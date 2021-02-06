import { FC } from "react";
import { useFilterByTickrate } from "../../../data/hooks/useFilterByTickrate";
import { FilterLabel } from "./FilterLabel";
import { IconButtonGroup } from "../../../../shared-components/buttons/IconButtonGroup.tsx/IconButtonGroup";
import { IconButton } from "../../../../shared-components/buttons/IconButton";

export const TickrateSelector: FC = () => {
  const { byTickrate, filterByTickrate } = useFilterByTickrate();

  function filterBy64tick() {
    filterByTickrate("tick64");
  }

  function filterByTickrate128() {
    filterByTickrate("tick128");
  }

  return (
    <>
      <div className="tick-filter-wrap">
        <FilterLabel value="TICK" />
        <IconButtonGroup>
          <IconButton
            inGroup
            icon={<span style={{ fontSize: 14 }}>64</span>}
            active={byTickrate === "tick64"}
            onClick={filterBy64tick}
          />
          <IconButton
            inGroup
            icon={<span style={{ fontSize: 14 }}>128</span>}
            active={byTickrate === "tick128"}
            onClick={filterByTickrate128}
          />
        </IconButtonGroup>
      </div>
    </>
  );
};
