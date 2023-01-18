import { FC } from "react";
import { CsgnInput } from "../../../shared-components/inputs/TextInput/CsgnInput";
import { MiniLabel } from "../NadeLabels/MiniLabel";

type Props = {
  defaultValue?: string;
  onChange: (value: string) => void;
};

export const SetPosInput: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <>
      <MiniLabel value="Set position command" optional />
      <CsgnInput
        initialValue={defaultValue}
        onChange={onChange}
        placeholder="Example: setpos_exact -2185.968750 1059.031250 39.801247;setang -25.482918 67.462006 0.000000;"
      />
    </>
  );
};
