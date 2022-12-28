import { FC } from "react";
import { CsgnTextArea } from "../../../shared-components/inputs/CsgnTextArea";

type Props = {
  defaultValue?: string;
  onChange: (value: string) => void;
};

export const DescriptionInput: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <>
      <CsgnTextArea
        defaultValue={defaultValue}
        label="Description"
        onChange={onChange}
        placeholder="Write how to perform the throw. "
      />
    </>
  );
};
