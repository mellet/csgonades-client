import { FC } from "react";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { CsgnDropdown } from "../../../shared-components/inputs/CsgnDropdown";
import { Movement, nadeMovementOptions } from "../../models/NadeMovement";

type Props = {
  defaultValue?: Movement;
  onChange: (movement: Movement) => void;
};

export const MovementSelector: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <>
      <MiniLabel value="Movement" />
      <CsgnDropdown<Movement>
        defaultValue={defaultValue}
        onChange={onChange}
        options={nadeMovementOptions()}
      />
    </>
  );
};
