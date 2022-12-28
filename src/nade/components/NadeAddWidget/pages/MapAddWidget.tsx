import { FC } from "react";
import { CsgoMap } from "../../../../map/models/CsGoMap";
import { MapCoordinates } from "../../../models/Nade";
import { MapPositionSelector } from "../../MapPositionSelector";
import { NextNavigation } from "../NextNavigation";

type Props = {
  selectedMap: CsgoMap;
  onSetMapPosition: (position: MapCoordinates) => void;
  onNextStep: () => void;
};

export const MapAddWidget: FC<Props> = ({
  selectedMap,
  onSetMapPosition,
  onNextStep,
}) => {
  return (
    <>
      <div className="add-map-container">
        <div className="map-position-container">
          <MapPositionSelector
            selectedMap={selectedMap}
            onPositionChange={onSetMapPosition}
          />
        </div>
        <NextNavigation onNextStep={onNextStep} enabled={Boolean(true)} />
      </div>
      <style jsx>{`
        .add-map-container {
        }

        .map-position-container {
          max-width: 75vh;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};
