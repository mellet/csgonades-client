import { FC, MouseEvent, useMemo, useRef, useState } from "react";
import { Button } from "semantic-ui-react";
import { LayerPosition } from "../../constants/Constants";
import { CsgoMap } from "../../nade-data/Nade/CsGoMap";
import { MapCoordinates } from "../../nade-data/Nade/Nade";

type Props = {
  map: CsgoMap;
  mapEndCoord?: MapCoordinates;
  visible: boolean;
  onDismiss: () => void;
  onSave: (coords: MapCoordinates) => void;
};

export const MapPositionModal: FC<Props> = ({
  visible,
  onDismiss,
  map,
  mapEndCoord,
  onSave,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [elementOffset, setElementOffset] = useState({ left: 0, top: 0 });
  const [mapWidth, setMapWidth] = useState(0);
  const [point, setPoint] = useState<MapCoordinates | undefined>(mapEndCoord);

  const coords = useMemo(() => {
    const sizeRatio = 1024 / mapWidth;

    if (!point) {
      return;
    }

    return {
      x: point.x / sizeRatio,
      y: point.y / sizeRatio,
    };
  }, [point, mapWidth]);

  if (!visible) {
    return null;
  }

  function onMapClick(event: MouseEvent<HTMLImageElement>) {
    const { left, top } = elementOffset;
    const x = event.clientX - left;
    const y = event.clientY - top;

    const sizeRatio = 1024 / mapWidth;

    const realX = Math.round(x * sizeRatio);
    const realY = Math.round(y * sizeRatio);

    setPoint({ x: realX, y: realY });
  }

  function onPosSave() {
    if (point) {
      onSave(point);
    }
  }

  function onImageLoad() {
    if (ref.current) {
      setElementOffset({
        top: ref.current.offsetTop,
        left: ref.current.offsetLeft,
      });
      setMapWidth(ref.current.offsetWidth);
    }
  }

  return (
    <>
      <div className="position-modal">
        <div className="position-content">
          <div className="position-title">
            Click on the map where the nade lands
          </div>
          <div className="map-image" ref={ref}>
            {coords && (
              <div
                className="point"
                style={{ left: coords.x - 5, top: coords.y - 5 }}
              />
            )}
            <img
              src={`/mapsoverlays/${map}.jpg`}
              alt="CSGO Nades logo"
              onClick={onMapClick}
              onLoad={onImageLoad}
            />
          </div>

          <div className="btns">
            <Button onClick={onDismiss}>Cancel</Button>
            <Button disabled={!point} positive onClick={onPosSave}>
              Save
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .position-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          background: rgba(0, 0, 0, 0.8);
          z-index: ${LayerPosition.MODAL};
          align-items: center;
          justify-content: space-around;
        }

        .position-content {
          background: white;
          border-radius: 4px;
        }

        .position-title {
          padding: 12px;
          font-size: 1.3em;
          text-align: center;
        }

        .map-image {
          position: relative;
        }

        .point {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #bdeb34;
          border: 1px solid black;
        }

        .position-content img {
          max-height: 70vh;
          max-width: 1024px;
        }

        .btns {
          display: flex;
        }
      `}</style>
    </>
  );
};
