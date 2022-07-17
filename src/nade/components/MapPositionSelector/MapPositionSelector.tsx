import { FC, MouseEvent, useMemo, useRef, useState } from "react";
import { CsgoMap } from "../../../map/models/CsGoMap";
import { MapCoordinates } from "../../models/Nade";
import { Button } from "semantic-ui-react";
import { MapMarker } from "./MapMarker";

export type MapPositionSelectorProps = {
  map: CsgoMap;
  mapStartCoords?: MapCoordinates;
  mapEndCoord?: MapCoordinates;
  onSave: (coords: MapCoordinates) => void;
};

type PositionSelectorStates = "start" | "end" | "done";

export const MapPositionSelector: FC<MapPositionSelectorProps> = ({
  map,
  mapEndCoord,
  mapStartCoords,
  onSave,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mapWidth, setMapWidth] = useState(0);
  const [startPoint, setStarPoint] = useState<MapCoordinates | undefined>(
    mapStartCoords
  );
  const [endPoint, setEndPoint] = useState<MapCoordinates | undefined>(
    mapEndCoord
  );
  const [editState, setEditState] = useState<PositionSelectorStates>("start");

  const startCoords = useCanvasPoint(mapWidth, startPoint);
  const endCoords = useCanvasPoint(mapWidth, endPoint);

  function onReset() {
    setEditState("start");
    setStarPoint(undefined);
    setEndPoint(undefined);
  }

  function onMapClick(event: MouseEvent<HTMLImageElement>) {
    const top = ref.current?.offsetTop || 0;
    const left = ref.current?.offsetLeft || 0;
    const x = event.clientX - left + document.documentElement.scrollLeft;
    const y = event.clientY - top + document.documentElement.scrollTop;

    const sizeRatio = 1024 / mapWidth;

    const realX = Math.round(x * sizeRatio);
    const realY = Math.round(y * sizeRatio);

    if (editState === "start") {
      console.log("Setting start point", realX, realY);
      setStarPoint({
        x: realX,
        y: realY,
      });
      setEditState("end");
    } else if (editState === "end") {
      console.log("Setting end point", realX, realY);
      setEndPoint({
        x: realX,
        y: realY,
      });
      setEditState("done");
    }
  }

  function onPosSave() {
    if (endPoint) {
      onSave(endPoint);
    }
  }

  function onImageLoad() {
    if (ref.current) {
      setMapWidth(ref.current.offsetWidth);
    }
  }

  console.log("endCoords", endCoords);

  return (
    <>
      <div className="position-content">
        <div className="position-title">
          Click on the map where the nade lands
        </div>
        <div className="map-canvas" ref={ref}>
          {startCoords && (
            <MapMarker
              size={14}
              coords={startCoords}
              color="white"
              label="Start"
            />
          )}
          {endCoords && (
            <MapMarker
              size={14}
              coords={endCoords}
              color="#bdeb34"
              label="End"
            />
          )}
          <img
            className="map-bg"
            src={`/mapsoverlays/${map}.jpg`}
            alt="CSGO Nades logo"
            onLoad={onImageLoad}
            onMouseDown={onMapClick}
          />
        </div>

        <div className="btns">
          <Button onClick={onReset}>Reset</Button>
          <Button disabled={!endPoint} positive onClick={onPosSave}>
            Save
          </Button>
        </div>
      </div>

      <style jsx>{`
        .position-content {
          background: white;
          border-radius: 4px;
          max-width: 600px;
        }

        .position-title {
          padding: 12px;
          font-size: 1.3em;
          text-align: center;
        }

        .map-canvas {
          position: relative;
          border: 1px solid red;
        }

        .map-bg {
          width: 100%;
          display: block;
        }

        .btns {
          display: flex;
        }
      `}</style>
    </>
  );
};

function convertCoordsToCanvasSize(
  canvasWidth: number,
  coords?: MapCoordinates
): MapCoordinates | null {
  if (!coords) {
    return null;
  }
  const sizeRatio = 1024 / canvasWidth;

  return {
    x: coords.x / sizeRatio,
    y: coords.y / sizeRatio,
  };
}

function convertCanvasPointToCoords(
  canvasWidth: number,
  coords: MapCoordinates
): MapCoordinates {
  const sizeRatio = 1024 / canvasWidth;

  return {
    x: coords.x * sizeRatio,
    y: coords.y * sizeRatio,
  };
}

function useCanvasPoint(canvasWidth: number, ordiginalCoords?: MapCoordinates) {
  const startCoords = useMemo(
    () => convertCoordsToCanvasSize(canvasWidth, ordiginalCoords),
    [ordiginalCoords, canvasWidth]
  );
  return startCoords;
}
