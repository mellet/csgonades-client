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
        <p>Select the type of nade you want to add</p>
        <div className="nade-type-selector">
          <TypeSelectButton
            nadeType="smoke"
            onTypeSelect={onTypeSelect}
            selectedNadeType={nadeType}
          />
          <TypeSelectButton
            nadeType="flash"
            onTypeSelect={onTypeSelect}
            selectedNadeType={nadeType}
          />
          <TypeSelectButton
            nadeType="molotov"
            onTypeSelect={onTypeSelect}
            selectedNadeType={nadeType}
          />
          <TypeSelectButton
            nadeType="hegrenade"
            onTypeSelect={onTypeSelect}
            selectedNadeType={nadeType}
          />
        </div>
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

type TypeSelectButtonProps = {
  selectedNadeType?: NadeType;
  nadeType: NadeType;
  onTypeSelect: (nadeType: NadeType) => void;
};

const TypeSelectButton: FC<TypeSelectButtonProps> = ({
  nadeType,
  onTypeSelect,
  selectedNadeType,
}) => {
  const { colors } = useTheme();

  function onClick() {
    onTypeSelect(nadeType);
  }

  const isSelected = nadeType === selectedNadeType;

  return (
    <>
      <button
        className={isSelected ? "type-btn selected" : "type-btn"}
        onClick={onClick}
      >
        <NadeIcon nadeType={nadeType} size={40} />
      </button>
      <style jsx>{`
        .type-btn {
          border: 1px solid ${colors.BORDER};
          margin: 0;
          padding: 5px;
          margin-right: 5px;
          border-radius: ${Dimensions.BORDER_RADIUS};
        }

        .selected {
          border: 1px solid red;
        }
      `}</style>
    </>
  );
};
