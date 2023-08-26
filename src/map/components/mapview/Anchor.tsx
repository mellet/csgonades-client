import { FC } from "react";
import { CsCanvasCoordinate } from "../../../nade/models/MapCoordinates";
import { Circle } from "react-konva";

type Props = {
  position: CsCanvasCoordinate;
};

export const Anchor: FC<Props> = ({ position }) => {
  return (
    <>
      <Circle
        draggable
        x={position.x}
        y={position.y}
        radius={5}
        fill="rgba(255,255,255,0.5)"
      />
    </>
  );
};
