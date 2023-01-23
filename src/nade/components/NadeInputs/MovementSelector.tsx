import { FC } from "react";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { CsgnDropdown } from "../../../shared-components/inputs/CsgnDropdown";
import { NadeMovement, nadeMovementOptions } from "../../models/NadeMovement";

type Props = {
  defaultValue?: NadeMovement;
  onChange: (movement: NadeMovement) => void;
};

export const MovementSelector: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <div>
      <MiniLabel value="Movement" />
      <CsgnDropdown<NadeMovement>
        defaultValue={defaultValue}
        hintText={"Select movement"}
        onChange={onChange}
        options={nadeMovementOptions()}
      />
    </div>
  );
};
