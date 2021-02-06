import { FC } from "react";
import { useFilterByType } from "../../../data/hooks/useFilterByType";
import { FilterLabel } from "./FilterLabel";
import { IconButtonGroup } from "../../../../shared-components/buttons/IconButtonGroup.tsx/IconButtonGroup";
import { IconButton } from "../../../../shared-components/buttons/IconButton";
import { TypeIcon } from "./TypeIcon";

export const TypeFilter: FC = () => {
  const { byType, filterByType } = useFilterByType();

  return (
    <>
      <>
        <FilterLabel value="TYPE" />
        <IconButtonGroup>
          <IconButton
            inGroup
            icon={<TypeIcon type="smoke" />}
            active={byType === "smoke"}
            onClick={() => filterByType("smoke")}
          />
          <IconButton
            inGroup
            icon={<TypeIcon type="flash" />}
            active={byType === "flash"}
            onClick={() => filterByType("flash")}
          />
          <IconButton
            inGroup
            icon={<TypeIcon type="molotov" />}
            active={byType === "molotov"}
            onClick={() => filterByType("molotov")}
          />
          <IconButton
            inGroup
            icon={<TypeIcon type="hegrenade" />}
            active={byType === "hegrenade"}
            onClick={() => filterByType("hegrenade")}
          />
        </IconButtonGroup>
      </>
    </>
  );
};
