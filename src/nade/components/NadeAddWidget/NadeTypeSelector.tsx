import { FC } from "react";
import { SquareButton } from "../../../shared-components/buttons/IconButton/SquareButton";
import { ButtonGroup } from "../../../shared-components/buttons/IconButtonGroup/IconButtonGroup";
import { NadeIcon } from "../../../shared-components/nade-icons";
import { NadeType } from "../../models/NadeType";
import { MiniLabel } from "../NadeLabels/MiniLabel";

type Props = {
  onTypeSelect: (type: NadeType) => void;
  selectedType?: NadeType;
};

export const NadeTypeSelector: FC<Props> = ({ onTypeSelect, selectedType }) => {
  return (
    <div className="type-selector-container">
      <MiniLabel value="Type" />
      <ButtonGroup>
        <SquareButton
          inGroup
          icon={<NadeIcon nadeType={"smoke"} size={25} />}
          onClick={() => onTypeSelect("smoke")}
          active={selectedType === "smoke"}
        />
        <SquareButton
          inGroup
          icon={<NadeIcon nadeType={"flash"} size={26} />}
          onClick={() => onTypeSelect("flash")}
          active={selectedType === "flash"}
        />
        <SquareButton
          inGroup
          icon={<NadeIcon nadeType={"molotov"} size={26} />}
          onClick={() => onTypeSelect("molotov")}
          active={selectedType === "molotov"}
        />
        <SquareButton
          inGroup
          icon={<NadeIcon nadeType={"hegrenade"} size={26} />}
          onClick={() => onTypeSelect("hegrenade")}
          active={selectedType === "hegrenade"}
        />
      </ButtonGroup>
    </div>
  );
};
