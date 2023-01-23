import { FC } from "react";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { nadeStatusOptions, NadeStatus } from "../../models/Status";
import { CsgnDropdown } from "../../../shared-components/inputs/CsgnDropdown";

type Props = {
  initValue: NadeStatus;
  onChange: (status: NadeStatus) => void;
};

export const StatusSelector: FC<Props> = ({ initValue, onChange }) => {
  return (
    <>
      <div>
        <MiniLabel value="Status" />
        <CsgnDropdown
          defaultValue={initValue}
          onChange={onChange}
          options={nadeStatusOptions()}
        />
      </div>
    </>
  );
};
