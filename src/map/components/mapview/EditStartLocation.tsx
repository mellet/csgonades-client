import { FC, useState } from "react";
import { Circle, Line } from "react-konva";
import { nanoid } from "nanoid";
import { MapStartLocation } from "../../models/NadeStartLocation";
import { CsCanvasCoordinate } from "../../../nade/models/MapCoordinates";

type Point = {
  id: string;
  x: number;
  y: number;
};

type Props = {
  startLocation: MapStartLocation;
  onUpdatePosition: (position: CsCanvasCoordinate[]) => void;
  onUpdateLabelPosition: (labelPosition: CsCanvasCoordinate) => void;
};

export const EditStartLocation: FC<Props> = ({
  startLocation,
  onUpdatePosition,
  onUpdateLabelPosition,
}) => {
  const [positions, setPositions] = useState<Point[]>(
    startLocation.position.map((p) => ({ ...p, id: nanoid() }))
  );

  const pointsAsArray = positions.reduce((res, cur) => {
    return [...res, cur.x, cur.y];
  }, []);

  return (
    <>
      <Line
        closed
        points={pointsAsArray}
        fill={`rgba(140, 255, 0, 0.5`}
        stroke="rgba(140, 255, 0, 1)"
      />
      <Circle
        draggable
        x={startLocation.labelPosition?.x || 100}
        y={startLocation.labelPosition?.y || 100}
        fill="red"
        radius={20}
        onDragEnd={(evt) => {
          onUpdateLabelPosition({
            x: evt.target.x(),
            y: evt.target.y(),
          });
        }}
      />
      {positions.map((p) => {
        return (
          <Circle
            key={p.id}
            draggable
            x={p.x}
            y={p.y}
            radius={5}
            fill="rgba(255,255,255,0.5)"
            onDragMove={(evt) =>
              setPositions((prev) => {
                const copy = [...prev];
                const idx = copy.findIndex((v) => v.id === p.id);
                const item = copy[idx];
                if (!item) return prev;
                item.x = evt.target.x();
                item.y = evt.target.y();
                onUpdatePosition(copy.map((p) => ({ x: p.x, y: p.y })));
                return copy;
              })
            }
          />
        );
      })}
      <style jsx>{``}</style>
    </>
  );
};
