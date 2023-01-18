import { FC, memo } from "react";
import { useFilterByType } from "../../../logic/useFilterByType";
import { FilterLabel } from "./FilterLabel";
import { ButtonGroup } from "../../../../shared-components/buttons/IconButtonGroup/IconButtonGroup";
import { SquareButton } from "../../../../shared-components/buttons/IconButton/IconButton";
import { NadeIcon } from "../../../../shared-components/nade-icons";

type Props = {
  vertical?: boolean;
};

export const TypeFilter: FC<Props> = memo(({ vertical }) => {
  const { byType, filterByType } = useFilterByType();

  return (
    <>
      <>
        <FilterLabel value="TYPE" center={vertical} />
        <ButtonGroup vertical={vertical}>
          <SquareButton
            inGroup
            icon={<NadeIcon nadeType="smoke" size={26} />}
            active={byType === "smoke"}
            onClick={() => filterByType("smoke")}
          />
          <SquareButton
            inGroup
            icon={<NadeIcon nadeType="molotov" size={26} />}
            active={byType === "molotov"}
            onClick={() => filterByType("molotov")}
          />
          <SquareButton
            inGroup
            icon={<NadeIcon nadeType="flash" size={26} />}
            active={byType === "flash"}
            onClick={() => filterByType("flash")}
          />
          <SquareButton
            inGroup
            last
            icon={<NadeIcon nadeType="hegrenade" size={26} />}
            active={byType === "hegrenade"}
            onClick={() => filterByType("hegrenade")}
          />
        </ButtonGroup>
      </>
    </>
  );
});
