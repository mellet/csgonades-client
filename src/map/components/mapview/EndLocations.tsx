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
  const REST_OPACITY = 0.3;
  const HOVER_OPACITY = 0.7;
  const [shapeOpacity, setShapeOpacity] = useState(REST_OPACITY);

  return (
    <Circle
      onClick={() => onEndLocationSelected(endLocation)}
      onMouseEnter={() => {
        if (!hightlight) {
          setShapeOpacity(HOVER_OPACITY);
        }
      }}
      onMouseLeave={() => {
        setShapeOpacity(REST_OPACITY);
      }}
      x={endLocation.position.x}
      y={endLocation.position.y}
      radius={24}
      fill={hightlight ? `green` : `rgba(235, 158, 52, ${shapeOpacity})`}
      stroke={hightlight ? `#33ff00` : `rgba(0, 0, 0, 0.75)`}
      strokeWidth={2}
    />
  );
};
