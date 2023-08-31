import { FC, useState } from "react";
import { Circle } from "react-konva";
import { MapEndLocation } from "../../models/NadeEndLocation";

type Props = {
  endLocations: MapEndLocation[];
  onEndLocationSelected: (endLocation: MapEndLocation) => void;
  hideEndLocationId?: string;
  highlightEndLocationId?: string;
};

export const EndLocations: FC<Props> = ({
  endLocations,
  onEndLocationSelected,
  hideEndLocationId,
  highlightEndLocationId,
}) => {
  console.log("Rendering end location");
  return (
    <>
      {endLocations.map((sL) => {
        if (hideEndLocationId === sL.id) {
          return null;
        }
        return (
          <EndLocation
            hightlight={sL.id === highlightEndLocationId}
            key={sL.id}
            endLocation={sL}
            onEndLocationSelected={onEndLocationSelected}
          />
        );
      })}

      <style jsx>{``}</style>
    </>
  );
};

type EndLocationProp = {
  hightlight?: boolean;
  endLocation: MapEndLocation;
  onEndLocationSelected: (endLocation: MapEndLocation) => void;
};

const EndLocation: FC<EndLocationProp> = ({
  endLocation,
  onEndLocationSelected,
  hightlight,
}) => {
  const [shapeOpacity, setShapeOpacity] = useState(0.1);
  const [strongOpacity, setStrokeOpacity] = useState(0.5);

  return (
    <Circle
      onClick={() => onEndLocationSelected(endLocation)}
      onMouseEnter={() => {
        if (!hightlight) {
          setShapeOpacity(0.3);
          setStrokeOpacity(1);
        }
      }}
      onMouseLeave={() => {
        setShapeOpacity(0.1);
        setStrokeOpacity(0.7);
      }}
      x={endLocation.position.x}
      y={endLocation.position.y}
      radius={24}
      fill={
        hightlight
          ? `rgba(140, 255, 0, 0.7`
          : `rgba(140, 255, 0, ${shapeOpacity})`
      }
      stroke={hightlight ? `white` : `rgba(255, 255, 255, ${strongOpacity}`}
      strokeWidth={hightlight ? 2 : 1}
    />
  );
};
