import { FC, useCallback, useState } from "react";
import { CsgoMap } from "../../map/models/CsGoMap";
import { MapCoordinates } from "../models/Nade";
import CsMapBaseCanvas from "../../map/components/CsMapCanvas/CsMapBaseCanvas";
import { useTheme } from "../../core/settings/useTheme";
import { Dimensions } from "../../constants/Constants";

type Props = {
  selectedStartPosition?: MapCoordinates;
  selectedEndPosition?: MapCoordinates;
  selectedMap: CsgoMap;
  onPositionChange: (
    startPosition: MapCoordinates,
    endPosition: MapCoordinates
  ) => void;
};

export const MapPositionSelector: FC<Props> = ({
  onPositionChange,
  selectedMap,
  selectedEndPosition,
  selectedStartPosition,
}) => {
  const { colors } = useTheme();
  const [canvasSize, setCanvasSize] = useState<{
    offsetX: number;
    offsetY: number;
    width: number;
  } | null>(null);
  const onMapContainerRender = useCallback((e: HTMLDivElement | null) => {
    if (!e) {
      return;
    }
    const offsetX = e.offsetLeft;
    const offsetY = e.offsetTop;
    const width = e.clientWidth;
    setCanvasSize({
      offsetX,
      offsetY,
      width,
    });
  }, []);

  return (
    <>
      <div className="info">
        Drag to set your throw location and where your grenade ends up.
      </div>

      <div className="map-wrapper">
        <div className="map-container" ref={onMapContainerRender}>
          {canvasSize && (
            <CsMapBaseCanvas
              csMap={selectedMap}
              canvasSize={canvasSize.width}
              onPostionChange={onPositionChange}
              defaultStartPosition={selectedStartPosition}
              defaultEndPosition={selectedEndPosition}
            />
          )}
        </div>
      </div>
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
