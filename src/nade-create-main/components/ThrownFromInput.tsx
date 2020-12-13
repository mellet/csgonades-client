import { FC } from "react";
import { CsgnInput } from "../../common/inputs/CsgnInput";

type Props = {
  defaultValue?: string;
  onChange: (value: string) => void;
};

export const ThrownFromInput: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <>
      <CsgnInput
        initialValue={defaultValue}
        label="Thrown from"
        onChange={onChange}
        placeholder="Example: T Spawn"
      />
    </>
  );
};
