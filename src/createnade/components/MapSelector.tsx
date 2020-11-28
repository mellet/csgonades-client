import { FC } from "react";
import { CsGnDropdown } from "./CsGnDropdown";
import { MiniLabel } from "./MiniLabel";
import { CsgoMap, nadeMapOptions } from "../../nade-data/Nade/CsGoMap";

type Props = {
  defaultValue?: CsgoMap;
  onChange: (value: CsgoMap) => void;
};

export const MapSelector: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <>
      <MiniLabel value="Map" />
      <CsGnDropdown<CsgoMap>
        defaultValue={defaultValue}
        onChange={onChange}
        options={nadeMapOptions()}
      />
    </>
  );
};
