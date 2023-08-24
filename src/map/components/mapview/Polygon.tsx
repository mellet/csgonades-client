import { FC, useState } from "react";
import { Shape, Circle } from "react-konva";

type Point = {
  x: number;
  y: number;
  angle?: number;
};

type Props = {
  isEditing?: boolean;
  points: Point[];
};

export const Polygon: FC<Props> = ({ points, isEditing }) => {
  const [shapeOpacity, setShapeOpacity] = useState(0.1);
  const [start, ...rest] = points;

  if (!start) {
    return null;
  }

  return (
    <>
      <Shape
        onMouseEnter={() => setShapeOpacity(0.3)}
        onMouseLeave={() => setShapeOpacity(0.1)}
        fill={`rgba(140, 255, 0, ${shapeOpacity})`}
        stroke="rgba(140, 255, 0, 1)"
        strokeWidth={1}
        sceneFunc={function (ctx) {
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          for (const point of rest) {
            ctx.lineTo(point.x, point.y);
          }
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }}
      />

      {isEditing &&
        points.map((point) => {
          return (
            <Circle
              key={`${point.x}${point.y}`}
              x={point.x}
              y={point.y}
              radius={3}
              fill="rgba(255,255,255,0.5)"
            />
          );
        })}
      <style jsx>{``}</style>
    </>
  );
};
