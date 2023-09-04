import { FC } from "react";
import { Circle, Line } from "react-konva";
import { CsCanvasCoordinate } from "../../../nade/models/MapCoordinates";

type Props = {
  coordinates: CsCanvasCoordinate[];
};

export const CreateStartLocation: FC<Props> = ({ coordinates }) => {
  const pointsAsArray = coordinates.reduce((res, cur) => {
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
      {coordinates.map((p) => {
        return (
          <Circle
            key=""
            x={p.x}
            y={p.y}
            radius={5}
            fill="rgba(140, 255, 0, 1)"
          />
        );
      })}
      <style jsx>{``}</style>
    </>
  );
};
