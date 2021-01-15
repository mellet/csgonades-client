import { FC } from "react";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { CsgoMap, nadeMapOptions } from "../../../map/models/CsGoMap";
import { CsgnDropdown } from "../../../shared-components/inputs/CsgnDropdown";

type Props = {
  defaultValue?: CsgoMap;
  onChange: (value: CsgoMap) => void;
};

export const MapSelector: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <>
      <MiniLabel value="Map" />
      <CsgnDropdown<CsgoMap>
        defaultValue={defaultValue}
        onChange={onChange}
        options={nadeMapOptions()}
      />
    </>
  );
};
