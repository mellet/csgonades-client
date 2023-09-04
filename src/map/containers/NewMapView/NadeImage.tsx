import { FC, useRef } from "react";
import { Circle, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import { MapImageProps, nadeScale } from "./GrenadeView";

export const NadeImage: FC<MapImageProps> = ({
  csMap,
  nadeType,
  x,
  y,
  onNadeClick,
  onUnselect,
  hide,
  isSelected,
  count,
  hasNew,
}) => {
  const size = 55;
  const scale = nadeScale(csMap);
  const groupRef = useRef<Konva.Group>(null);
  const [image] = useImage(`/icons/grenades/${nadeType}.svg`);

  const zoomIn = () => {
    groupRef.current?.to({
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 0.1,
    });
    return;
  };

  const zoomOut = () => {
    groupRef.current?.to({
      scaleX: 1,
      scaleY: 1,
      duration: 0.1,
    });
  };

  function onClick() {
    if (isSelected) {
      onUnselect();
    } else {
      onNadeClick();
    }
  }

  if (hide) {
    return null;
  }

  return (
    <>
      <Group ref={groupRef} x={x} y={y}>
        {isSelected && (
          <Circle
            onClick={onClick}
            radius={size / 2.3}
            fill="rgba(184, 13, 13, 0.9)"
            onMouseEnter={(evt) => {
              const container = evt.target.getStage()?.container();
              if (container) {
                container.style.cursor = "pointer";
              }
              zoomIn();
            }}
            onMouseLeave={(evt) => {
              const container = evt.target.getStage()?.container();
              if (container) {
                container.style.cursor = "default";
              }
              zoomOut();
            }}
          />
        )}
        {!isSelected && (
          <Image
            scale={scale}
            opacity={0.95}
            onClick={onClick}
            offset={{ x: size / 2, y: size / 2 }}
            image={image}
            width={size}
            height={size}
            onMouseEnter={(evt) => {
              const container = evt.target.getStage()?.container();
              if (container) {
                container.style.cursor = "pointer";
              }
              zoomIn();
            }}
            onMouseLeave={(evt) => {
              const container = evt.target.getStage()?.container();
              if (container) {
                container.style.cursor = "default";
              }
              zoomOut();
            }}
          />
        )}

        <Text
          x={0}
          y={0}
          scale={scale}
          listening={false}
          text={isSelected ? "X" : count.toString()}
          fontSize={28}
          fontStyle="bold"
          fontFamily="Helvetica Neue, Helvetica, Verdana"
          width={100}
          height={100}
          offsetX={100 / 2}
          offsetY={100 / 2 - 3}
          fill={"white"}
          strokeWidth={isSelected ? 0 : 2}
          stroke="rgba(0,0,0,1)"
          fillAfterStrokeEnabled
          align="center"
          verticalAlign="middle"
        />
        {hasNew && !isSelected && (
          <Text
            listening={false}
            text="New"
            x={0}
            y={0}
            width={size}
            fontSize={10}
            fill="#c3ff00"
            fontFamily="Helvetica Neue, Helvetica, Verdana"
            fontStyle="bold"
            strokeWidth={1}
            stroke="#123301"
            fillAfterStrokeEnabled
            height={size}
            offsetX={55 / 2}
            offsetY={-10}
            align="center"
          />
        )}
      </Group>
    </>
  );
};
