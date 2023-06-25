import { FC } from "react";
import { CsgoMap } from "../../../map/models/CsGoMap";
import { MapCoordinates } from "../../models/MapCoordinates";
import { MapPositionSelector } from "../MapPositionSelector";

type Props = {
  map: CsgoMap;
  currentEndCoords?: MapCoordinates;
  currentStartCoords?: MapCoordinates;
  setEndCoords: (startCoord: MapCoordinates, endCoord: MapCoordinates) => void;
};

export const NadeEditMapPosition: FC<Props> = ({
  currentEndCoords,
  currentStartCoords,
  map,
  setEndCoords,
}) => {
  return (
    <>
      <div>
        <MapPositionSelector
          selectedMap={map}
          selectedEndPosition={currentEndCoords}
          selectedStartPosition={currentStartCoords}
          onPositionChange={setEndCoords}
        />
      </div>
      <style jsx>{`
        div {
          max-width: 75vh;
        }
      `}</style>
    </>
  );
};
