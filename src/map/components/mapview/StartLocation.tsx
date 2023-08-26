import { FC, useState } from "react";
import { NadeStartLocation } from "../../models/NadeStartLocation";
import { Line } from "react-konva";

type Props = {
  startLocations: NadeStartLocation[];
  onStartLocationSelected: (startLocation: NadeStartLocation) => void;
};

export const StartLocations: FC<Props> = ({
  startLocations,
  onStartLocationSelected,
}) => {
  return (
    <>
      {startLocations.map((sL) => {
        return (
          <StartLocation
            key={sL.id}
            startLocation={sL}
            onStartLocationSelected={onStartLocationSelected}
          />
        );
      })}

      <style jsx>{``}</style>
    </>
  );
};

type StartLocationProp = {
  startLocation: NadeStartLocation;
  onStartLocationSelected: (startLocation: NadeStartLocation) => void;
};

const StartLocation: FC<StartLocationProp> = ({
  startLocation,
  onStartLocationSelected,
}) => {
  const [shapeOpacity, setShapeOpacity] = useState(0.1);

  const pointsAsArray = startLocation.position.reduce((res, cur) => {
    return [...res, cur.x, cur.y];
  }, []);

  return (
    <Line
      onClick={() => onStartLocationSelected(startLocation)}
      onMouseEnter={() => setShapeOpacity(0.3)}
      onMouseLeave={() => setShapeOpacity(0.1)}
      closed
      points={pointsAsArray}
      fill={`rgba(140, 255, 0, ${shapeOpacity})`}
      stroke="rgba(140, 255, 0, 1)"
    />
  );
};
