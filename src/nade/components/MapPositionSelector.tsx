import { FC, MouseEvent, useMemo, useRef, useState } from "react";
import { useTheme } from "../../core/settings/SettingsHooks";
import { CsgoMap } from "../../map/models/CsGoMap";
import { Button } from "../../shared-components/buttons/Button";
import { MapCoordinates } from "../models/Nade";

type Props = {
  selectedMap: CsgoMap;
  onPositionChange: (position: MapCoordinates) => void;
};

const CIRCLE_SIZE = 25;
const CIRCLE_RADIUS = CIRCLE_SIZE / 2;

export const MapPositionSelector: FC<Props> = ({
  onPositionChange,
  selectedMap,
}) => {
  const { colors } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [point, setPoint] = useState<MapCoordinates | undefined>();

  const coords = useMemo(() => {
    const sizeRatio = 1024 / (ref.current?.clientWidth || 0);

    if (!point) {
      return null;
    }

    return {
      x: point.x / sizeRatio,
      y: point.y / sizeRatio,
    };
  }, [point]);

  function onMapClick(event: MouseEvent<HTMLDivElement>) {
    const offsetX = ref.current?.offsetLeft || 0;
    const offsetY = ref.current?.offsetTop || 0;

    const x = event.clientX - offsetX;
    const y = event.clientY - offsetY;

    const sizeRatio = 1024 / (ref.current?.clientWidth || 0);

    const realX = Math.round(x * sizeRatio);
    const realY = Math.round(y * sizeRatio);

    setPoint({ x: realX, y: realY });
  }

  function onPosSave() {
    if (point) {
      onPositionChange(point);
    }
  }

  return (
    <>
      <div>
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

          {coords && (
            <div className="confirm-btn-container">
              <Button onClick={onPosSave} title="Confirm" />
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .map-container {
          position: relative;
          overflow: hidden;
          background: #4679bd;
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

        .confirm-btn-container {
          position: absolute;
          bottom: 10px;
          right: 10px;
        }

        .confirm-btn {
          border: none;
          background: ${colors.SUCCESS};
          color: white;
          padding: 8px;
          border-radius: 3px;
          font-weight: 500;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};
