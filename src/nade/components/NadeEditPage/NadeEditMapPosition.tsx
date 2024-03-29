import { FC } from "react";
import { CsMap } from "../../../map/models/CsGoMap";
import { NadeType } from "../../models/NadeType";
import { GameMode } from "../../models/GameMode";
import dynamic from "next/dynamic";

const MapPositionSelector = dynamic(
  () =>
    import("../NadeAddWidget/MapPositionSelector").then(
      (m) => m.MapPositionSelector
    ),
  {
    ssr: false,
  }
);

type Props = {
  map: CsMap;
  gameMode: GameMode;
  nadeType: NadeType;
  selectedMapStartLocationId?: string;
  selectedMapEndLocationId?: string;
  onSetMapStartLocation: (mapStartLocationId: string) => void;
  onSetMapEndLocation: (mapEndLocationString: string) => void;
};

export const NadeEditMapPosition: FC<Props> = ({
  map,
  gameMode,
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
          gameMode={gameMode}
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
