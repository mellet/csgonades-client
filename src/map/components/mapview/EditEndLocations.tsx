import { FC } from "react";
import { Circle } from "react-konva";
import { CsCanvasCoordinate } from "../../../nade/models/MapCoordinates";
import { MapEndLocation } from "../../models/NadeEndLocation";

type Props = {
  endLocation: MapEndLocation;
  onUpdateEndLocation: (position: CsCanvasCoordinate) => void;
};

export const EditEndLocation: FC<Props> = ({
  endLocation,
  onUpdateEndLocation,
}) => {
  return (
    <>
      <Circle
        draggable
        x={endLocation.position.x}
        y={endLocation.position.y}
        radius={22}
        fill={`rgba(140, 255, 0, 1`}
        stroke={`black`}
        strokeWidth={2}
        onDragMove={(evt) => {
          onUpdateEndLocation({
            x: evt.target.x(),
            y: evt.target.y(),
          });
        }}
      />
      <style jsx>{``}</style>
    </>
  );
};
