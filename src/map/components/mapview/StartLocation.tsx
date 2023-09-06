import { FC, useEffect, useRef } from "react";
import { MapStartLocation } from "../../models/NadeStartLocation";
import { Group, Line, Text } from "react-konva";
import {
  MapNadeLocations,
  MapNadeStartLocation,
} from "../../models/MapNadeLocations";
import Konva from "konva";
import { CloseButton } from "../../containers/NewMapView/CloseButton";

type Props = {
  selectedLocation?: MapNadeLocations;
  startLocations: (MapStartLocation | MapNadeStartLocation)[];
  onStartLocationSelected: (
    startLocation: MapStartLocation | MapNadeStartLocation
  ) => void;
  hideLocationId?: string;
  highlightLocationId?: string;
  onUnselect?: () => void;
};

export const StartLocations: FC<Props> = ({
  startLocations,
  onStartLocationSelected,
  hideLocationId,
  highlightLocationId,
  selectedLocation,
  onUnselect,
}) => {
  return (
    <>
      {onUnselect && (
        <CloseButton
          visible={Boolean(selectedLocation)}
          x={selectedLocation?.endLocation.position.x || 0}
          y={selectedLocation?.endLocation.position.y || 0}
          onClick={onUnselect}
        />
      )}

      {startLocations.map((sL) => {
        if (sL.id === hideLocationId) {
          return null;
        }

        return (
          <StartLocation
            // @ts-ignore
            count={sL.count}
            // @ts-ignore
            hasNew={sL.hasNew}
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
  hasNew?: boolean;
  highlight?: boolean;
  startLocation: MapStartLocation | MapNadeStartLocation;
  onStartLocationSelected: (
    startLocation: MapStartLocation | MapNadeStartLocation
  ) => void;
};

const StartLocation: FC<StartLocationProp> = ({
  hasNew,
  highlight,
  startLocation,
  onStartLocationSelected,
  count,
}) => {
  const REST_OPACITY = 0.3;
  const HOVER_OPACITY = 0.75;
  const textRef = useRef<Konva.Text>(null);
  const groupRef = useRef<Konva.Group>(null);

  useEffect(() => {
    showZone();
  }, []);

  const showZone = () => {
    groupRef.current?.to({
      opacity: 1,
      duration: 0.3,
    });
  };

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
      <Group ref={groupRef} opacity={0}>
        <Line
          opacity={REST_OPACITY}
          onTap={(e) => {
            e.cancelBubble = true;
            const container = e.target.getStage()?.container();
            if (container) {
              container.style.cursor = "default";
            }
            onStartLocationSelected(startLocation);
          }}
          onClick={(e) => {
            e.cancelBubble = true;
            const container = e.target.getStage()?.container();
            if (container) {
              container.style.cursor = "default";
            }
            onStartLocationSelected(startLocation);
          }}
          onMouseEnter={(evt) => {
            if (!highlight) {
              const container = evt.target.getStage()?.container();
              if (container) {
                container.style.cursor = "pointer";
              }
              evt.target.to({
                opacity: HOVER_OPACITY,
                duration: 0.2,
              });
              zoomInText();
            }
          }}
          onMouseLeave={(evt) => {
            const container = evt.target.getStage()?.container();
            if (container) {
              container.style.cursor = "default";
            }
            evt.target.to({
              opacity: REST_OPACITY,
              duration: 0.2,
            });
            zoomOutText();
          }}
          closed
          points={pointsAsArray}
          fill={highlight ? "green" : `rgba(235, 158, 52, 1)`}
        />
        <Line
          listening={false}
          points={pointsAsArray}
          stroke={highlight ? "#33ff00" : "white"}
          strokeWidth={2}
          closed
          fill="transparent"
        />

        {hasNew && (
          <Text
            listening={false}
            text="New"
            x={startLocation.labelPosition?.x || 0}
            y={startLocation.labelPosition?.y || 0}
            width={55}
            fontSize={10}
            fill="#c3ff00"
            fontFamily="Helvetica Neue, Helvetica, Verdana"
            fontStyle="bold"
            strokeWidth={1}
            stroke="#123301"
            fillAfterStrokeEnabled
            height={55}
            offsetX={55 / 2}
            offsetY={-13}
            align="center"
          />
        )}

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
      </Group>
    </>
  );
};
