import { FC } from "react";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { CsgnDropdown } from "../../../shared-components/inputs/CsgnDropdown";
import { nadeTeamSideOptions, TeamSide } from "../../models/TeamSide";

type Props = {
  defaultValue?: TeamSide;
  onChange: (teamSide: TeamSide) => void;
};

export const TeamSideSelector: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <div>
      <MiniLabel value="Team" />
      <CsgnDropdown
        hintText="Select team"
        defaultValue={defaultValue}
        onChange={onChange}
        options={nadeTeamSideOptions()}
      />
    </div>
  );
};
