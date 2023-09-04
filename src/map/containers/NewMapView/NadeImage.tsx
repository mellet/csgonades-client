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
  const grenadeIconRef = useRef<Konva.Image>(null);
  const textRef = useRef<Konva.Text>(null);
  const closeBtnRef = useRef<Konva.Circle>(null);
  const [image] = useImage(`/icons/grenades/${nadeType}.svg`);

  const onCloseHover = () => {
    closeBtnRef.current?.to({
      scaleX: scale.x + 0.1,
      scaleY: scale.y + 0.1,
      opacity: 1,
      duration: 0.1,
    });
    textRef.current?.to({
      scaleX: scale.x + 0.1,
      scaleY: scale.y + 0.1,
      duration: 0.1,
    });
  };

  const onCloseLeave = () => {
    closeBtnRef.current?.to({
      scaleX: scale.x,
      scaleY: scale.y,
      opacity: 1,
      duration: 0.1,
    });
    textRef.current?.to({
      scaleX: scale.x,
      scaleY: scale.y,
      duration: 0.1,
    });
  };

  const zoomIn = () => {
    // to() is a method of `Konva.Node` instances
    grenadeIconRef.current?.to({
      scaleX: scale.x + 0.1,
      scaleY: scale.y + 0.1,
      opacity: 1,
      duration: 0.1,
    });
    textRef.current?.to({
      scaleX: scale.x + 0.1,
      scaleY: scale.y + 0.1,
      duration: 0.1,
    });
  };

  const zoomOut = () => {
    // to() is a method of `Konva.Node` instances
    grenadeIconRef.current?.to({
      scaleX: scale.x,
      scaleY: scale.y,
      opacity: 0.9,
      duration: 0.1,
    });
    textRef.current?.to({
      scaleX: scale.x,
      scaleY: scale.y,
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
      <Group x={x} y={y}>
        {isSelected && (
          <Circle
            ref={closeBtnRef}
            onClick={onClick}
            radius={size / 2.3}
            fill="rgba(184, 13, 13, 0.9)"
            onMouseEnter={(evt) => {
              const container = evt.target.getStage()?.container();
              if (container) {
                container.style.cursor = "pointer";
              }
              onCloseHover();
            }}
            onMouseLeave={(evt) => {
              const container = evt.target.getStage()?.container();
              if (container) {
                container.style.cursor = "default";
              }
              onCloseLeave();
            }}
          />
        )}
        {!isSelected && (
          <Image
            scale={scale}
            opacity={0.9}
            ref={grenadeIconRef}
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
          scale={scale}
          ref={textRef}
          listening={false}
          text={isSelected ? "X" : count.toString()}
          fontSize={28}
          fontStyle="bold"
          fontFamily="Helvetica Neue, Helvetica, Verdana"
          offset={{ x: 50, y: 12 }}
          width={100}
          fill={hasNew ? "green" : "white"}
          strokeWidth={isSelected ? 0 : 2}
          stroke="rgba(0,0,0,1)"
          fillAfterStrokeEnabled
          align="center"
          verticalAlign="middle"
        />
      </Group>
    </>
  );
};
