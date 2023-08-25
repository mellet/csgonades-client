import { FC } from "react";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { CsMap, nadeMapOptions } from "../../../map/models/CsGoMap";
import { CsgnDropdown } from "../../../shared-components/inputs/CsgnDropdown";

type Props = {
  defaultValue?: CsMap;
  onChange: (value: CsMap) => void;
};

export const MapSelector: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <div>
      <MiniLabel value="Map" />
      <CsgnDropdown<CsMap>
        defaultValue={defaultValue}
        hintText={"Select map"}
        onChange={onChange}
        options={nadeMapOptions()}
      />
    </div>
  );
};
