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
  const textRef = useRef<Konva.Text>(null);
  const [shapeOpacity, setShapeOpacity] = useState(0.1);
  const [strongOpacity, setStrokeOpacity] = useState(0.5);

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
            setShapeOpacity(0.3);
            setStrokeOpacity(1);
            zoomInText();
          }
        }}
        onMouseLeave={(evt) => {
          const container = evt.target.getStage()?.container();
          if (container) {
            container.style.cursor = "defualt";
          }
          setShapeOpacity(0.1);
          setStrokeOpacity(0.7);
          zoomOutText();
        }}
        closed
        points={pointsAsArray}
        fill={
          highlight
            ? "rgba(0, 167, 250, 0.5)"
            : `rgba(0, 167, 250, ${shapeOpacity})`
        }
        stroke={"#00a7fa"}
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
          fontFamily="Changa One"
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
