import { FC } from "react";
import { CsgoMap } from "../../../map/models/CsGoMap";
import { MapCoordinates } from "../../models/Nade";
import { MapPositionSelector } from "../MapPositionSelector";

type Props = {
  map: CsgoMap;
  currentEndCoords?: MapCoordinates;
  setEndCoords: (endCoords: MapCoordinates) => void;
};

export const NadeEditMapPosition: FC<Props> = ({
  currentEndCoords,
  map,
  setEndCoords,
}) => {
  return (
    <>
      <div>
        <MapPositionSelector
          selectedMap={map}
          selectedMapPosition={currentEndCoords}
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
