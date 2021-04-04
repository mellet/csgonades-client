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
    <>
      <MiniLabel value="Team" />
      <CsgnDropdown
        defaultValue={defaultValue}
        onChange={onChange}
        options={nadeTeamSideOptions()}
      />
    </>
  );
};
