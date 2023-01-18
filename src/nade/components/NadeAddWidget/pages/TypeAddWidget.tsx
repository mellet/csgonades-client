import { FC } from "react";
import { Dimensions } from "../../../../constants/Constants";
import { useTheme } from "../../../../core/settings/SettingsHooks";
import { CsgoMap } from "../../../../map/models/CsGoMap";
import { Box } from "../../../../shared-components/box/Box";
import { NadeIcon } from "../../../../shared-components/nade-icons";
import { NadeType } from "../../../models/NadeType";
import { MapSelector } from "../../NadeInputs/MapSelector";
import { NextNavigation } from "../NextNavigation";

type Props = {
  nadeType?: NadeType;
  onTypeSelect: (nadeType: NadeType) => void;
  onSetMap: (map: CsgoMap) => void;
  selectedMap?: CsgoMap;
  onNextStep: () => void;
};

export const TypeAddWidget: FC<Props> = ({
  onTypeSelect,
  onSetMap,
  nadeType,
  selectedMap,
  onNextStep,
}) => {
  return (
    <>
      <Box>
        <h2>Nade Details</h2>

        <div>Select your map</div>
        <MapSelector onChange={onSetMap} defaultValue={selectedMap} />
      </Box>
      <NextNavigation
        onNextStep={onNextStep}
        enabled={Boolean(nadeType && selectedMap)}
      />
    </>
  );
};
