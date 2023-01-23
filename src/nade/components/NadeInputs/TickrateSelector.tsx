import { FC } from "react";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { CsgnDropdown } from "../../../shared-components/inputs/CsgnDropdown";
import { Tickrate, nadeTickrateOptions } from "../../models/NadeTickrate";

type Props = {
  label?: string;
  defaultValue?: Tickrate;
  hintText?: string;
  onChange: (tech: Tickrate) => void;
};

export const TickrateSelector: FC<Props> = ({
  onChange,
  defaultValue,
  hintText,
  label,
}) => {
  const defualtHintString = "Jumpthrow bind, please specify tickrate.";

  return (
    <div>
      <MiniLabel
        value={label || "Tickrate"}
        hint={hintText || defualtHintString}
      />
      <CsgnDropdown<Tickrate>
        defaultValue={defaultValue}
        onChange={onChange}
        options={nadeTickrateOptions()}
        hintText={"Select tickrate"}
      />
    </div>
  );
};
