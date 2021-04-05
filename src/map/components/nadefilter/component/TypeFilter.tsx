import { FC } from "react";
import { useFilterByType } from "../../../data/hooks/useFilterByType";
import { FilterLabel } from "./FilterLabel";
import { IconButtonGroup } from "../../../../shared-components/buttons/IconButtonGroup.tsx/IconButtonGroup";
import { IconButton } from "../../../../shared-components/buttons/IconButton";
import { NadeIcon } from "../../../../shared-components/nade-icons";

export const TypeFilter: FC = () => {
  const { byType, filterByType } = useFilterByType();

  return (
    <>
      <>
        <FilterLabel value="TYPE" />
        <IconButtonGroup>
          <IconButton
            inGroup
            icon={<NadeIcon nadeType="smoke" size={26} />}
            active={byType === "smoke"}
            onClick={() => filterByType("smoke")}
          />
          <IconButton
            inGroup
            icon={<NadeIcon nadeType="flash" size={26} />}
            active={byType === "flash"}
            onClick={() => filterByType("flash")}
          />
          <IconButton
            inGroup
            icon={<NadeIcon nadeType="molotov" size={26} />}
            active={byType === "molotov"}
            onClick={() => filterByType("molotov")}
          />
          <IconButton
            inGroup
            icon={<NadeIcon nadeType="hegrenade" size={26} />}
            active={byType === "hegrenade"}
            onClick={() => filterByType("hegrenade")}
          />
        </IconButtonGroup>
      </>
    </>
  );
};
