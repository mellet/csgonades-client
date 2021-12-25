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
    <>
      <MiniLabel value={label || "Tickrate"} />

      <CsgnDropdown<Tickrate>
        defaultValue={defaultValue}
        onChange={onChange}
        options={nadeTickrateOptions()}
      />
      <em>{hintText || defualtHintString}</em>

      <style jsx>{`
        em {
          margin-top: 5px;
          font-size: 12px;
        }
      `}</style>
    </>
  );
};
