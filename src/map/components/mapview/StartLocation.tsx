import { FC, useRef, useState } from "react";
import { MapStartLocation } from "../../models/NadeStartLocation";
import { Line, Text } from "react-konva";
import { MapNadeStartLocation } from "../../models/MapNadeLocations";
import Konva from "konva";

type Props = {
  startLocations: (MapStartLocation | MapNadeStartLocation)[];
  onStartLocationSelected: (
    startLocation: MapStartLocation | MapNadeStartLocation
  ) => void;
  hideLocationId?: string;
  highlightLocationId?: string;
};

export const StartLocations: FC<Props> = ({
  startLocations,
  onStartLocationSelected,
  hideLocationId,
  highlightLocationId,
}) => {
  return (
    <>
      {startLocations.map((sL) => {
        if (sL.id === hideLocationId) {
          return null;
        }
        return (
          <StartLocation
            // @ts-ignore
            count={sL.count}
            highlight={highlightLocationId === sL.id}
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
  count?: number;
  highlight?: boolean;
  startLocation: MapStartLocation | MapNadeStartLocation;
  onStartLocationSelected: (
    startLocation: MapStartLocation | MapNadeStartLocation
  ) => void;
};

const StartLocation: FC<StartLocationProp> = ({
  highlight,
  startLocation,
  onStartLocationSelected,
  count,
}) => {
  const REST_OPACITY = 0.2;
  const HOVER_OPACITY = 0.4;
  const textRef = useRef<Konva.Text>(null);
  const [shapeOpacity, setShapeOpacity] = useState(REST_OPACITY);

  const zoomInText = () => {
    // to() is a method of `Konva.Node` instances
    textRef.current?.to({
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 0.1,
    });
  };

  const zoomOutText = () => {
    // to() is a method of `Konva.Node` instances
    textRef.current?.to({
      scaleX: 1,
      scaleY: 1,
      duration: 0.1,
    });
  };

  if (!startLocation.position) {
    return null;
  }

  const pointsAsArray = startLocation.position.reduce((res, cur) => {
    return [...res, cur.x, cur.y];
  }, []);

  return (
    <>
      <Line
        onClick={() => onStartLocationSelected(startLocation)}
        onMouseEnter={(evt) => {
          if (!highlight) {
            const container = evt.target.getStage()?.container();
            if (container) {
              container.style.cursor = "pointer";
            }
            setShapeOpacity(HOVER_OPACITY);
            zoomInText();
          }
        }}
        onMouseLeave={(evt) => {
          const container = evt.target.getStage()?.container();
          if (container) {
            container.style.cursor = "defualt";
          }
          setShapeOpacity(REST_OPACITY);
          zoomOutText();
        }}
        closed
        points={pointsAsArray}
        fill={
          highlight
            ? "rgba(0, 167, 250, 0.5)"
            : `rgba(55, 178, 230, ${shapeOpacity})`
        }
        stroke={"white"}
      />
      {count && (
        <Text
          ref={textRef}
          x={startLocation.labelPosition?.x || 0}
          y={startLocation.labelPosition?.y || 0}
          listening={false}
          text={count.toString()}
          fontSize={32}
          fontStyle="bold"
          fontFamily="Helvetica Neue, Helvetica, Verdana"
          offset={{ x: 50, y: 15 }}
          width={100}
          fill={"white"}
          shadowColor="black"
          shadowBlur={4}
          shadowOffset={{ x: 1, y: 1 }}
          shadowOpacity={0.8}
          align="center"
          verticalAlign="middle"
        />
      )}
    </>
  );
};
