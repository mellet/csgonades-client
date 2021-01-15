import { FC } from "react";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { CsgnDropdown } from "../../../shared-components/inputs/CsgnDropdown";
import { Technique, nadeTechniqueOptions } from "../../models/Technique";

type Props = {
  defaultValue?: Technique;
  onChange: (tech: Technique) => void;
};

export const TechniqueSelector: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <>
      <MiniLabel value="Technique" />
      <CsgnDropdown<Technique>
        defaultValue={defaultValue}
        onChange={onChange}
        options={nadeTechniqueOptions()}
      />
    </>
  );
};
