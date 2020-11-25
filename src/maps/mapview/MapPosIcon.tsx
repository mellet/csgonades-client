import { FC, useMemo } from "react";
import { NadeLight } from "../../nade-data/Nade/Nade";
import { NadeType } from "../../nade-data/Nade/NadeType";

type Props = {
  cluster: NadeLight[];
  nade: NadeLight;
  mapWidth: number;
  onPress: (pos: { x: number; y: number }) => void;
  numNades: number;
};

export const MapPosIcon: FC<Props> = ({
  nade,
  mapWidth,
  onPress,
  numNades,
  cluster,
}) => {
  const position = useMemo(() => {
    const averageX =
      cluster.reduce((acc, cur) => acc + (cur.mapEndCoord?.x || 0), 0) /
      cluster.length;

    const averageY =
      cluster.reduce((acc, cur) => acc + (cur.mapEndCoord?.y || 0), 0) /
      cluster.length;

    const sizeRatio = 1024 / mapWidth;
    return {
      x: averageX / sizeRatio,
      y: averageY / sizeRatio,
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

  const scaledIconSize = mapWidth / 19;

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
            <span>{numNades}</span>
          </div>
        )}
      </div>
      <style jsx>{`
        .point {
          position: absolute;
          width: ${scaledIconSize}px;
          height: ${scaledIconSize}px;
          pointer-events: none;
          opacity: 0.8;
          transform: scale(1);
          cursor: pointer;
          pointer-events: all;
          z-index: ${zIndexByType(nade.type)};
          transition: all 0.2s;
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
          align-items: center;
          justify-content: center;
        }

        .num span {
          color: rgba(218, 196, 245, 1);
          font-size: ${scaledIconSize * 0.45}px;
          font-weight: 400;
          text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.9);
          font-family: "Changa One", cursive;
        }

        .point img {
          width: 100%;
          display: block;
        }

        .point:hover {
          transform: scale(1.1);
          opacity: 1;
          z-index: 500;
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
