import { FC, useEffect, useRef, useState } from "react";
import { CsMap } from "../../map/models/CsGoMap";
import { useTheme } from "../../core/settings/useTheme";
import { Dimensions } from "../../constants/Constants";
import { NadeType } from "../models/NadeType";
import { Layer, Stage } from "react-konva";
import Konva from "konva";
import { MapImage } from "../../map/components/mapview/MapViewImage";
import { useMapStartLocations } from "../../map/data/useMapStartLocations";
import { useMapEndLocations } from "../../map/data/useMapEndLocations";
import { EndLocations } from "../../map/components/mapview/EndLocations";
import { StartLocations } from "../../map/components/mapview/StartLocation";
import { useGameMode } from "../../core/useGameMode";

type Props = {
  selectedMapStartLocationId?: string;
  selectedMapEndLocationId?: string;
  selectedMap: CsMap;
  selectedType: NadeType;
  onSetMapStartLocation: (mapStartLocationId: string) => void;
  onSetMapEndLocation: (mapEndLocationString: string) => void;
};

export const MapPositionSelector: FC<Props> = ({
  selectedMap,
  selectedType,
  selectedMapStartLocationId,
  selectedMapEndLocationId,
  onSetMapStartLocation,
  onSetMapEndLocation,
}) => {
  const { colors } = useTheme();
  const { gameMode } = useGameMode();
  const [mode, setMode] = useState<"start" | "end">("start");
  const konvaRef = useRef<Konva.Stage>(null);

  const { mapStartLocations } = useMapStartLocations(selectedMap, gameMode);
  const { mapEndLocations } = useMapEndLocations(
    selectedMap,
    selectedType,
    gameMode
  );

  useEffect(() => {
    if (!konvaRef || !konvaRef.current) {
      return;
    }

    const stage = konvaRef.current;

    const scaleFactor = stage.width() / 1024;

    stage.scaleX(scaleFactor);
    stage.scaleY(scaleFactor);
  }, []);

  return (
    <>
      <div className="toolbar">
        <button onClick={() => setMode("start")}>Start position</button>
        <button onClick={() => setMode("end")}>End position</button>
      </div>
      <Stage ref={konvaRef} width={650} height={650}>
        <Layer>
          <MapImage csMap={selectedMap} />
          {mode === "end" && mapEndLocations && (
            <EndLocations
              endLocations={mapEndLocations}
              onEndLocationSelected={(endLocation) => {
                onSetMapEndLocation(endLocation.id);
              }}
              highlightEndLocationId={selectedMapEndLocationId}
            />
          )}

          {mode === "start" && mapStartLocations && (
            <StartLocations
              highlightLocationId={selectedMapStartLocationId}
              startLocations={mapStartLocations}
              onStartLocationSelected={(startLocation) => {
                onSetMapStartLocation(startLocation.id);
                setMode("end");
              }}
            />
          )}
        </Layer>
      </Stage>
      <style jsx>{`
        .info {
          background: ${colors.DP02};
          padding: 4px 8px;
          color: ${colors.TEXT};
          border-top-left-radius: ${Dimensions.BORDER_RADIUS};
          border-top-right-radius: ${Dimensions.BORDER_RADIUS};
          border: 1px solid ${colors.BORDER};
          border-bottom: none;
        }

        .map-wrapper {
          border: 1px solid ${colors.BORDER};
        }
      `}</style>
    </>
  );
};
