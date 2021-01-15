import { FC } from "react";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { CsgnDropdown } from "../../../shared-components/inputs/CsgnDropdown";
import { Tickrate, nadeTickrateOptions } from "../../models/NadeTickrate";

type Props = {
  defaultValue?: Tickrate;
  onChange: (tech: Tickrate) => void;
};

export const TickrateSelector: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <>
      <MiniLabel value="Tickrate" />

      <CsgnDropdown<Tickrate>
        defaultValue={defaultValue}
        onChange={onChange}
        options={nadeTickrateOptions()}
      />
      <em>Jumpthrow bind, please specify tickrate.</em>

      <style jsx>{`
        em {
          margin-top: 5px;
          font-size: 12px;
        }
      `}</style>
    </>
  );
};
