import { FC } from "react";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { CsgnDropdown } from "../../../shared-components/inputs/CsgnDropdown";
import { GameMode, nadeGameModeOptions } from "../../models/GameMode";

type Props = {
  defaultValue?: GameMode;
  onChange: (value: GameMode) => void;
};

export const NadeGameModeSelector: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <div>
      <MiniLabel value="Game" />
      <CsgnDropdown<GameMode>
        defaultValue={defaultValue}
        hintText={"Select game"}
        onChange={onChange}
        options={nadeGameModeOptions()}
      />
    </div>
  );
};
