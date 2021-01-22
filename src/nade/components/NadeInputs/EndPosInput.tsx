import { FC } from "react";
import { CsgnInput } from "../../../shared-components/inputs/TextInput/CsgnInput";

type Props = {
  defaultValue?: string;
  onChange: (value: string) => void;
};

export const EndPosInput: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <>
      <CsgnInput
        initialValue={defaultValue}
        label="Nade end location"
        onChange={onChange}
        placeholder="Example: XBox"
      />
    </>
  );
};
