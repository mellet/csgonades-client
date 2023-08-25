import { FC } from "react";
import { CsMap } from "../../../map/models/CsGoMap";
import { CsCanvasCoordinate } from "../../models/MapCoordinates";
import { MapPositionSelector } from "../MapPositionSelector";

type Props = {
  map: CsMap;
  currentEndCoords?: CsCanvasCoordinate;
  currentStartCoords?: CsCanvasCoordinate;
  setEndCoords: (
    startCoord: CsCanvasCoordinate,
    endCoord: CsCanvasCoordinate
  ) => void;
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
