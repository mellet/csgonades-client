import { FC, memo } from "react";
import { NadeLight } from "../../nade/models/Nade";
import { MapPosIcon } from "./MapPosIcon";

type Props = {
  visible: boolean;
  clusters: NadeLight[][];
  canvasSize: number;
  onClusterClick: (cluster: NadeLight[]) => void;
};

export const MapIcons: FC<Props> = memo(
  ({ clusters, visible, canvasSize, onClusterClick }) => {
    if (!visible) {
      return null;
    }

    return (
      <>
        {clusters.map((cluster) => {
          const nade = cluster[0];
          if (!nade) {
            return null;
          }
          return (
            <MapPosIcon
              key={nade.id}
              nade={nade}
              cluster={cluster}
              mapWidth={canvasSize}
              numNades={cluster.length}
              onPress={() => onClusterClick(cluster)}
            />
          );
        })}
      </>
    );
  }
);
