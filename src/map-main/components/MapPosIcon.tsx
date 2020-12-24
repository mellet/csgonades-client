import { FC, memo, useEffect, useMemo, useState } from "react";
import { NadeLight } from "../../nade-data/Nade/Nade";
import { NadeType } from "../../nade-data/Nade/NadeType";
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
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      setVisible(true);
    }, []);

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
    const iconScale = scaleFactor * 0.65;
    const iconBaseSize = 100;

    return (
      <>
        <div
          className={visible ? "point visible" : "point"}
          style={{
            top: position.y - iconBaseSize / 2,
            left: position.x - iconBaseSize / 2,
          }}
          onClick={onClick}
        >
          <img src={`/icons/grenades/${nade.type}.png`} />
          <div className="num">
            {numNades > 1 && <span className="num-count">{numNades}</span>}
            {hasNew && <span className="new">NEW</span>}
          </div>
        </div>
        <style jsx>{`
          .point {
            position: absolute;
            width: ${iconBaseSize}px;
            height: ${iconBaseSize}px;
            transform: scale(0);
            cursor: pointer;
            pointer-events: all;
            z-index: ${zIndexByType(nade.type)};
            font-size: 18px;
            z-index: 499;
            transition: transform 0.15s;
          }

          .visible {
            transform: scale(${iconScale});
          }

          .num {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: ${iconBaseSize}px;
            height: ${iconBaseSize}px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transform: scale(1);
            transition: transform 0.15s;
          }

          .num .num-count {
            color: rgba(196, 245, 227, 1);
            font-size: 54px;
            font-weight: 400;
            text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.9);
            font-family: "Changa One", cursive;
          }

          .new {
            position: absolute;
            bottom: 12px;
            display: inline-block;
            font-size: 18px;
            color: rgba(224, 245, 66, 0.9);
            text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.9);
            font-weight: 800;
            text-align: center;
          }

          .point img {
            width: 100%;
            display: block;
            opacity: 0.85;
            transition: transform 0.15s;
          }

          .point:hover > img {
            transform: scale(1.05);
            opacity: 1;
          }

          .point:hover {
            z-index: 500;
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
