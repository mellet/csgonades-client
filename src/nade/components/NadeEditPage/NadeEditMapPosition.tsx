import { FC } from "react";
import { CsMap } from "../../../map/models/CsGoMap";
import { MapPositionSelector } from "../MapPositionSelector";
import { NadeType } from "../../models/NadeType";

type Props = {
  map: CsMap;
  nadeType: NadeType;
  selectedMapStartLocationId?: string;
  selectedMapEndLocationId?: string;
  onSetMapStartLocation: (mapStartLocationId: string) => void;
  onSetMapEndLocation: (mapEndLocationString: string) => void;
};

export const NadeEditMapPosition: FC<Props> = ({
  map,
  nadeType,
  onSetMapEndLocation,
  onSetMapStartLocation,
  selectedMapEndLocationId,
  selectedMapStartLocationId,
}) => {
  return (
    <>
      <div>
        <MapPositionSelector
          selectedMap={map}
          selectedType={nadeType}
          onSetMapEndLocation={onSetMapEndLocation}
          onSetMapStartLocation={onSetMapStartLocation}
          selectedMapEndLocationId={selectedMapEndLocationId}
          selectedMapStartLocationId={selectedMapStartLocationId}
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
