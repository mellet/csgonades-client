import { FC } from "react";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { CsgnDropdown } from "../../../shared-components/inputs/CsgnDropdown";
import { nadeTypeOptions, NadeType } from "../../models/NadeType";

type Props = {
  defaultValue?: NadeType;
  onChange: (nadeType: NadeType) => void;
};

export const TypeSelector: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <>
      <MiniLabel value="Type" />
      <CsgnDropdown
        defaultValue={defaultValue}
        onChange={onChange}
        options={nadeTypeOptions()}
      />
    </>
  );
};
