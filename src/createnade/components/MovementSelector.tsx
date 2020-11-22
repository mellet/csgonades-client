import { FC } from "react";
import { MiniLabel } from "./MiniLabel";
import { CsGnDropdown } from "./CsGnDropdown";
import {
  Movement,
  nadeMovementOptions,
} from "../../nade-data/Nade/NadeMovement";

type Props = {
  defaultValue?: Movement;
  onChange: (movement: Movement) => void;
};

export const MovementSelector: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <>
      <MiniLabel value="Movement" />
      <CsGnDropdown<Movement>
        defaultValue={defaultValue}
        options={nadeMovementOptions()}
        onChange={onChange}
      />
    </>
  );
};
