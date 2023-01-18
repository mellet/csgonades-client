import { FC } from "react";
import { CsgnInput } from "../../../shared-components/inputs/TextInput/CsgnInput";
import { MiniLabel } from "../NadeLabels/MiniLabel";

type Props = {
  currentProLink?: string;
  onChange: (proLink: string) => void;
};

export const ProLinkInput: FC<Props> = ({ onChange, currentProLink }) => {
  return (
    <>
      <MiniLabel
        value="Pro Link"
        optional
        hint="Add link to video of a pro throwing this nade to get pro badge on nade."
      />
      <CsgnInput
        initialValue={currentProLink}
        onChange={onChange}
        placeholder="Example: https://youtu.be/xyz?t=160"
      />
    </>
  );
};
