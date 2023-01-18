import { FC } from "react";
import { CsgnInput } from "../../../shared-components/inputs/TextInput/CsgnInput";
import { MiniLabel } from "../NadeLabels/MiniLabel";

type Props = {
  defaultValue?: string;
  onChange: (value: string) => void;
};

export const NadeEndPosInput: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <div>
      <MiniLabel value="End position" />
      <CsgnInput
        initialValue={defaultValue}
        onChange={onChange}
        placeholder="Example: XBox"
      />
    </div>
  );
};
