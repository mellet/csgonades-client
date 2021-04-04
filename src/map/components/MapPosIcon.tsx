import { FC, memo, useMemo } from "react";
import { NadeLight } from "../../nade/models/Nade";
import { NadeType } from "../../nade/models/NadeType";
import { NadeIcon } from "../../shared-components/nade-icons/NadeIcon";
import { isNewNade } from "../../utils/Common";

type Props = {
  cluster: NadeLight[];
  mapWidth: number;
  nade: NadeLight;
  numNades: number;
  onPress: (pos: { x: number; y: number }) => void;
};

export const MapPosIcon: FC<Props> = memo(
  ({ cluster, mapWidth, nade, numNades, onPress }) => {
    const { hasNew, position } = useMemo(() => {
      const hasNew = cluster.find((n) => isNewNade(n.createdAt));
      const averageX =
        cluster.reduce((acc, cur) => acc + (cur.mapEndCoord?.x || 0), 0) /
        cluster.length;

      const averageY =
        cluster.reduce((acc, cur) => acc + (cur.mapEndCoord?.y || 0), 0) /
        cluster.length;

      const sizeRatio = 1024 / mapWidth;
      return {
        position: {
          x: averageX / sizeRatio,
          y: averageY / sizeRatio,
        },

        hasNew: !!hasNew,
      };
    }, [mapWidth, cluster]);

    function onClick() {
      if (nade.mapEndCoord) {
        onPress({
          x: nade.mapEndCoord.x,
          y: nade.mapEndCoord.y,
        });
      }
    }

    const scaleFactor = mapWidth / 1024;
    const iconBaseSize = Math.round(60 * scaleFactor);
    const countFontSize = Math.floor(iconBaseSize / 1.75);
    const newFontSisze = Math.floor(iconBaseSize / 4.2);

    if (!nade.type) {
      return null;
    }

    return (
      <>
        <div
          className="point"
          style={{
            position: "absolute",
            top: position.y - iconBaseSize / 2,
            left: position.x - iconBaseSize / 2,
          }}
          onClick={onClick}
        >
          <div className="nade-icon">
            <NadeIcon nadeType={nade.type} />
          </div>
          <div className="num">
            {numNades > 1 && <span className="num-count">{numNades}</span>}
            {hasNew && <span className="new">NEW</span>}
          </div>
        </div>
        <style jsx>{`
          .point {
            width: ${iconBaseSize}px;
            height: ${iconBaseSize}px;
            cursor: pointer;
            pointer-events: all;
            z-index: ${zIndexByType(nade.type)};
            z-index: 499;
            overflow: hidden;
          }

          .num {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            opacity: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            animation: show 0.2s 0.2s forwards;
          }

          .num .num-count {
            color: rgba(196, 245, 227, 1);
            font-size: ${countFontSize}px;
            line-height: ${countFontSize}px;
            font-weight: 400;
            text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.9);
            font-family: "Changa One", cursive;
          }

          .new {
            position: absolute;
            top: 10%;
            display: inline-block;
            font-size: ${newFontSisze}px;
            line-height: ${newFontSisze}px;
            color: rgba(224, 245, 66, 0.9);
            text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.9);
            font-weight: 800;
            text-align: center;
          }

          .nade-icon {
            top: 0;
            left: 0;
            width: ${iconBaseSize}px;
            display: block;
            opacity: 0.85;
            transition: transform 0.15s;
            height: ${iconBaseSize}px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .point:hover > .nade-icon {
            opacity: 1;
          }

          .point:hover {
            z-index: 500;
          }

          @keyframes show {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </>
    );
  }
);

function zIndexByType(type?: NadeType) {
  switch (type) {
    case "smoke":
      return 499;
    case "molotov":
      return 498;
    case "flash":
      return 497;
    default:
      return 496;
  }
}
