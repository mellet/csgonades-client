import { FC } from "react";
import { MiniLabel } from "./MiniLabel";
import { CsGnDropdown } from "./CsGnDropdown";
import { nadeTypeOptions, NadeType } from "../../nade-data/Nade/NadeType";

type Props = {
  defaultValue?: NadeType;
  onChange: (nadeType: NadeType) => void;
};

export const TypeSelector: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <>
      <MiniLabel value="Type" />
      <CsGnDropdown
        defaultValue={defaultValue}
        options={nadeTypeOptions()}
        onChange={onChange}
      />
    </>
  );
};
