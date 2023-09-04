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
import { GameMode } from "../models/GameMode";
import { FaCheck } from "react-icons/fa";

type Props = {
  gameMode: GameMode;
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
  gameMode,
}) => {
  const { colors } = useTheme();
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

  const infoString =
    mode === "start"
      ? "First select where you throw the nade from!"
      : "Now select where your nade lands. If you can't find the exact location, select the closest";

  return (
    <>
      <div className="info">{infoString}</div>
      <div className="toolbar">
        <button onClick={() => setMode("start")}>
          <FaCheck
            style={{
              marginRight: 4,
              color: selectedMapStartLocationId ? "green" : "#bbb",
            }}
          />
          Start Location
        </button>
        <button onClick={() => setMode("end")}>
          <FaCheck
            style={{
              marginRight: 4,
              color: selectedMapEndLocationId ? "green" : "#bbb",
            }}
          />
          End Location
        </button>
      </div>
      <div className="position-selector">
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
      </div>
      <style jsx>{`
        .position-selector {
          position: relative;
        }

        .toolbar {
          display: flex;
          gap: 4px;
          justify-content: center;
        }

        .toolbar button {
          border: 1px solid #ccc;
          background: white;
          border-radius: 5px;
          padding: 4px 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .info {
          background: ${colors.DP02};
          padding: 4px 8px;
          color: ${colors.TEXT};
          border-radius: ${Dimensions.BORDER_RADIUS};
          border: 1px solid ${colors.BORDER};
          margin-bottom: 10px;
          text-align: center;
        }

        .map-wrapper {
          border: 1px solid ${colors.BORDER};
        }
      `}</style>
    </>
  );
};
