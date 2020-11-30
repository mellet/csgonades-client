import { FC, useMemo } from "react";
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

export const MapPosIcon: FC<Props> = ({
  cluster,
  mapWidth,
  nade,
  numNades,
  onPress,
}) => {
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

  const scaledIconSize = mapWidth / 17;

  return (
    <>
      <div
        className="point"
        style={{
          top: position.y - scaledIconSize / 2,
          left: position.x - scaledIconSize / 2,
        }}
        onClick={onClick}
      >
        <img src={`/icons/grenades/${nade.type}.png`} />
        {numNades > 1 && (
          <div className="num">
            <span className="num-count">{numNades}</span>
            {hasNew && <span className="new">NEW</span>}
          </div>
        )}
      </div>
      <style jsx>{`
        .point {
          position: absolute;
          width: ${scaledIconSize}px;
          height: ${scaledIconSize}px;
          transform: scale(1);
          cursor: pointer;
          pointer-events: all;
          z-index: ${zIndexByType(nade.type)};
          transition: transform 0.15s, opacity 0.15s;
          font-size: 18px;
        }

        .num {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: ${scaledIconSize}px;
          height: ${scaledIconSize}px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: scale(1);
          transition: transform 0.15s;
        }

        .num .num-count {
          color: rgba(196, 245, 227, 1);
          font-size: ${scaledIconSize * 0.5}px;
          font-weight: 400;
          text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.9);
          font-family: "Changa One", cursive;
        }

        .new {
          position: absolute;
          bottom: 4%;
          display: inline-block;
          font-size: ${scaledIconSize * 0.15}px;
          color: rgba(224, 245, 66, 0.9);
          text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.9);
          font-weight: 800;
        }

        .point img {
          width: 100%;
          display: block;
          opacity: 0.85;
        }

        .point:hover {
          transform: scale(1.1);
          z-index: 500;
        }

        .point:hover > img {
          opacity: 1;
        }

        .point:hover > .num {
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
};

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
