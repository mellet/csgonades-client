import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { Dimensions } from "../../constants/Constants";
import { CsgoMap } from "../../map/models/CsGoMap";
import { MapCoordinates } from "../models/Nade";

type Props = {
  selectedMapPosition?: MapCoordinates;
  selectedMap: CsgoMap;
  onPositionChange: (position: MapCoordinates) => void;
};

const CIRCLE_SIZE = 25;
const CIRCLE_RADIUS = CIRCLE_SIZE / 2;

export const MapPositionSelector: FC<Props> = ({
  onPositionChange,
  selectedMap,
  selectedMapPosition,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [point, setPoint] = useState<MapCoordinates | undefined>(
    selectedMapPosition
  );
  const [coords, setCoords] = useState<MapCoordinates | null>(null);

  useEffect(() => {
    if (point) {
      const sizeRatio = 1024 / (ref.current?.clientWidth || 0);
      const x = point.x / sizeRatio;
      const y = point.y / sizeRatio;
      setCoords({ x, y });
    }
  }, [point, ref]);

  function onMapClick(event: MouseEvent<HTMLDivElement>) {
    const offsetX = ref.current?.offsetLeft || 0;
    const offsetY = ref.current?.offsetTop || 0;

    const x = event.clientX - offsetX;
    const y = event.clientY - offsetY + window.scrollY;

    const sizeRatio = 1024 / (ref.current?.clientWidth || 0);

    const realX = Math.round(x * sizeRatio);
    const realY = Math.round(y * sizeRatio);

    setPoint({ x: realX, y: realY });
    onPositionChange({ x: realX, y: realY });
  }

  return (
    <>
      <div className="map-wrapper">
        <div className="map-container" ref={ref}>
          <div className="map-image" onClick={onMapClick}>
            {coords && (
              <div
                className="point"
                style={{
                  left: coords.x - CIRCLE_RADIUS,
                  top: coords.y - CIRCLE_RADIUS,
                }}
              >
                <div className="point-inner" />
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .map-wrapper {
          overflow: hidden;
          background: #4679bd;
          border-radius: ${Dimensions.BORDER_RADIUS};
        }

        .map-container {
          position: relative;
        }

        .map-container:before {
          content: "";
          display: block;
          padding-top: 100%;
        }

        .map-image {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: url(${`/mapsoverlays/${selectedMap}.jpg`});
          background-size: cover;
        }

        .point {
          pointer-events: none;
          position: absolute;
          width: ${CIRCLE_SIZE}px;
          height: ${CIRCLE_SIZE}px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .point-inner {
          width: 25%;
          height: 25%;
          background: #bdeb34;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
};
