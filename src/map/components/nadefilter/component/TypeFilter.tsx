import { FC } from "react";
import { useFilterByType } from "../../../data/hooks/useFilterByType";
import { FilterLabel } from "./FilterLabel";
import { IconButtonGroup } from "../../../../shared-components/buttons/IconButtonGroup/IconButtonGroup";
import { SquareButton } from "../../../../shared-components/buttons/IconButton/IconButton";
import { NadeIcon } from "../../../../shared-components/nade-icons";
import { NadeCounts } from "../../../data/hooks/useNadeCount";

type Props = {
  nadeCounts: NadeCounts;
  vertical?: boolean;
};

export const TypeFilter: FC<Props> = ({ nadeCounts, vertical }) => {
  const { byType, filterByType } = useFilterByType();

  const showSmokeButton = nadeCounts.numSmokes > 0;
  const showMolotovButton = nadeCounts.numMolotovs > 0;
  const showFlashButton = nadeCounts.numFlashed > 0;
  const showGrenadeButton = nadeCounts.numGrenades > 0;

  return (
    <>
      <>
        <FilterLabel value="TYPE" center={vertical} />
        <IconButtonGroup vertical={vertical}>
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
              last
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
