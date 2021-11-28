import { FC } from "react";
import { useFilterByType } from "../../../data/hooks/useFilterByType";
import { FilterLabel } from "./FilterLabel";
import { IconButtonGroup } from "../../../../shared-components/buttons/IconButtonGroup.tsx/IconButtonGroup";
import { SquareButton } from "../../../../shared-components/buttons/IconButton";
import { NadeIcon } from "../../../../shared-components/nade-icons";
import { NadeCounts } from "../../../data/hooks/useNadeCount";

type Props = {
  nadeCounts: NadeCounts;
};

export const TypeFilter: FC<Props> = ({ nadeCounts }) => {
  const { byType, filterByType } = useFilterByType();

  const showSmokeButton = nadeCounts.numSmokes > 0;
  const showMolotovButton = nadeCounts.numMolotovs > 0;
  const showFlashButton = nadeCounts.numFlashed > 0;
  const showGrenadeButton = nadeCounts.numGrenades > 0;

  return (
    <>
      <>
        <FilterLabel value="TYPE" />
        <IconButtonGroup vertical>
          {showSmokeButton && (
            <SquareButton
              inGroup
              icon={<NadeIcon nadeType="smoke" size={26} />}
              active={byType === "smoke"}
              onClick={() => filterByType("smoke")}
            />
          )}
          {showMolotovButton && (
            <SquareButton
              inGroup
              icon={<NadeIcon nadeType="molotov" size={26} />}
              active={byType === "molotov"}
              onClick={() => filterByType("molotov")}
            />
          )}
          {showFlashButton && (
            <SquareButton
              inGroup
              icon={<NadeIcon nadeType="flash" size={26} />}
              active={byType === "flash"}
              onClick={() => filterByType("flash")}
            />
          )}
          {showGrenadeButton && (
            <SquareButton
              inGroup
              icon={<NadeIcon nadeType="hegrenade" size={26} />}
              active={byType === "hegrenade"}
              onClick={() => filterByType("hegrenade")}
            />
          )}
        </IconButtonGroup>
      </>
    </>
  );
};
