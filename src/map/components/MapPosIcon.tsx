import { FC, memo, useMemo } from "react";
import { useTheme } from "../../core/settings/SettingsHooks";
import { NadeLight } from "../../nade/models/Nade";
import { NadeType } from "../../nade/models/NadeType";
import { NadeIcon } from "../../shared-components/nade-icons";
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
    const { colors } = useTheme();
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
    const iconBaseSize = Math.round(52 * scaleFactor);

    if (!nade.type) {
      return null;
    }

    return (
      <>
        <button
          className="point"
          style={{
            position: "absolute",
            top: position.y - iconBaseSize / 2,
            left: position.x - iconBaseSize / 2,
          }}
          onClick={onClick}
        >
          <div className="nade-icon">
            <NadeIcon
              nadeType={nade.type}
              count={numNades > 1 ? numNades : undefined}
              isNew={hasNew}
              animated={true}
            />
          </div>
        </button>
        <style jsx>{`
          .point {
            width: ${iconBaseSize}px;
            height: ${iconBaseSize}px;
            cursor: pointer;
            pointer-events: all;
            z-index: ${zIndexByType(nade.type)};
            z-index: 499;
            overflow: hidden;
            background: transparent;
            padding: 0;
            border: none;
            outline: none;
          }

          .nade-icon {
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

          .point:focus-visible {
            outline: 1px auto ${colors.focusOutline};
          }

          .point:focus-visible .nade-icon {
            opacity: 1;
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
