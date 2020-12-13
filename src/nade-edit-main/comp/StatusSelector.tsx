import { FC } from "react";
import { MiniLabel } from "../../nade-create-main/components/MiniLabel";
import { CsGnDropdown } from "../../nade-create-main/components/CsGnDropdown";
import { nadeStatusOptions, Status } from "../../nade-data/Nade/Status";

type Props = {
  initValue: Status;
  onChange: (status: Status) => void;
};

export const StatusSelector: FC<Props> = ({ initValue, onChange }) => {
  return (
    <>
      <div>
        <MiniLabel value="Status" />
        <CsGnDropdown
          defaultValue={initValue}
          onChange={onChange}
          options={nadeStatusOptions()}
        />
      </div>
    </>
  );
};
