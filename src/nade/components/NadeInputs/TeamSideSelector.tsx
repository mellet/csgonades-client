import { FC } from "react";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { TeamSide } from "../../models/TeamSide";
import { ButtonGroup } from "../../../shared-components/buttons/IconButtonGroup/IconButtonGroup";
import { SquareButton } from "../../../shared-components/buttons/IconButton/SquareButton";

type Props = {
  defaultValue?: TeamSide;
  onChange: (teamSide: TeamSide) => void;
};

export const TeamSideSelector: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <div>
      <MiniLabel value="Team" />
      <ButtonGroup>
        <SquareButton
          inGroup
          icon={<TeamSideIcon side="both" />}
          onClick={() => onChange("both")}
          active={defaultValue === "both"}
        />
        <SquareButton
          inGroup
          icon={<TeamSideIcon side="terrorist" />}
          onClick={() => onChange("terrorist")}
          active={defaultValue === "terrorist"}
        />
        <SquareButton
          inGroup
          icon={<TeamSideIcon side="counterTerrorist" />}
          onClick={() => onChange("counterTerrorist")}
          active={defaultValue === "counterTerrorist"}
        />
      </ButtonGroup>
    </div>
  );
};

type TeamSideIconProps = {
  side: TeamSide;
};

const TeamSideIcon: FC<TeamSideIconProps> = ({ side }) => {
  return <img src={`/icons/${side}.webp`} width={24} height={24} />;
};
