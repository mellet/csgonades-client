import { FC } from "react";
import { CsgnInput } from "../../../shared-components/inputs/TextInput/CsgnInput";
import { MiniLabel } from "../NadeLabels/MiniLabel";

type Props = {
  defaultValue?: string;
  onChange: (value: string) => void;
};

export const ThrownFromInput: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <div>
      <MiniLabel value="Start position" />
      <CsgnInput
        initialValue={defaultValue}
        onChange={onChange}
        placeholder="Example: T Spawn"
      />
    </div>
  );
};
