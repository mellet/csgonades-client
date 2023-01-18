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
    <div>
      <MiniLabel value="Map" />
      <CsgnDropdown<CsgoMap>
        defaultValue={defaultValue}
        hintText={"Select map"}
        onChange={onChange}
        options={nadeMapOptions()}
      />
    </div>
  );
};
