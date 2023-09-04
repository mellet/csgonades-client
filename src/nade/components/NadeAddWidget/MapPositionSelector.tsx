import { FC, useEffect, useRef, useState } from "react";
import { CsMap } from "../../../map/models/CsGoMap";
import { useTheme } from "../../../core/settings/useTheme";
import { NadeType } from "../../models/NadeType";
import { Layer, Stage } from "react-konva";
import Konva from "konva";
import { MapImage } from "../../../map/components/mapview/MapViewImage";
import { useMapStartLocations } from "../../../map/data/useMapStartLocations";
import { useMapEndLocations } from "../../../map/data/useMapEndLocations";
import { EndLocations } from "../../../map/components/mapview/EndLocations";
import { StartLocations } from "../../../map/components/mapview/StartLocation";
import { GameMode } from "../../models/GameMode";
import { HintBox } from "./HintBox";

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

  const endLocationCallout =
    mapEndLocations.find((n) => n.id === selectedMapEndLocationId)
      ?.calloutName || "";
  const startLocationCallout =
    mapStartLocations.find((n) => n.id === selectedMapStartLocationId)
      ?.calloutName || "";

  return (
    <>
      <HintBox>
        <div className="hint">
          {mode === "start" && (
            <p>First select where you throw the nade from!</p>
          )}
          {mode === "end" && (
            <p>
              Now select where your nade lands.
              <br />
              If you can&apos;t find the exact location, select the closest.
            </p>
          )}
        </div>
      </HintBox>
      <div className="toolbar">
        <div className="toolbar-actions">
          <button
            className={mode === "start" ? "selected" : undefined}
            onClick={() => setMode("start")}
          >
            Start Location
          </button>
          <button
            className={mode === "end" ? "selected" : undefined}
            onClick={() => setMode("end")}
          >
            End Location
          </button>
        </div>
        <div className="callout-name">
          {startLocationCallout && <span>From {startLocationCallout}</span>}
          {endLocationCallout && <span> to {endLocationCallout}</span>}
        </div>
      </div>

      <div className="position-selector">
        <Stage ref={konvaRef} width={600} height={600}>
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
          width: 600px;
          margin: 0 auto;
        }

        .toolbar {
          background: ${colors.DP02};
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          padding: 6px;
          margin-top: 10px;
        }

        .toolbar-actions {
          display: flex;
        }

        .toolbar button {
          background: ${colors.DP03};
          border: 1px solid ${colors.BORDER};
          border-radius: 5px;
          padding: 4px 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toolbar button:first-child {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-right: none;
        }

        .toolbar button:last-child {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        .selected {
          background: ${colors.SUCCESS} !important;
        }

        .hint {
          min-height: 50px;
        }

        .map-wrapper {
          border: 1px solid ${colors.BORDER};
        }

        .callout-name {
          color: ${colors.GREY};
        }
      `}</style>
    </>
  );
};
