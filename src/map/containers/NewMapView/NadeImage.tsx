import { FC, useEffect, useRef } from "react";
import { Circle, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { CsMap } from "../../models/CsGoMap";
import { NadeType } from "../../../nade/models/NadeType";

type MapImageProps = {
  csMap: CsMap;
  nadeType: NadeType;
  x: number;
  y: number;
  onNadeClick: () => void;
  count: number;
  hasNew?: boolean;
};

export const NadeImage: FC<MapImageProps> = ({
  csMap,
  nadeType,
  x,
  y,
  onNadeClick,
  count,
  hasNew,
}) => {
  const scale = nadeScale(csMap);
  const groupRef = useRef<Konva.Group>(null);
  const nadeCircleRef = useRef<Konva.Circle>(null);
  const [image] = useImage(`/icons/grenades/${nadeType}.svg`);

  useEffect(() => {
    showImage();
  }, []);

  const showImage = () => {
    return;
  };

  const zoomIn = () => {
    groupRef.current?.to({
      scaleX: scale.x + 0.1,
      scaleY: scale.y + 0.1,
      duration: 0.1,
    });
    nadeCircleRef.current?.to({
      opacity: 1,
      duration: 0.2,
    });
    return;
  };

  const zoomOut = () => {
    groupRef.current?.to({
      scaleX: scale.x,
      scaleY: scale.x,
      duration: 0.1,
    });
    nadeCircleRef.current?.to({
      opacity: 0.4,
      duration: 0.2,
    });
  };

  function onClick() {
    onNadeClick();
  }

  function handleNadeClick(event: KonvaEventObject<Event>) {
    event.cancelBubble = true;
    const container = event.target.getStage()?.container();
    if (container) {
      container.style.cursor = "default";
    }
    onClick();
  }

  function onMouseEnter(event: KonvaEventObject<Event>) {
    const container = event.target.getStage()?.container();
    if (container) {
      container.style.cursor = "pointer";
    }
    zoomIn();
  }

  function onMouseLeave(event: KonvaEventObject<Event>) {
    const container = event.target.getStage()?.container();
    if (container) {
      container.style.cursor = "default";
    }
    zoomOut();
  }

  const iconSize = 32;

  return (
    <>
      <Group
        ref={groupRef}
        x={x}
        y={y}
        onMouseOver={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={handleNadeClick}
        onTap={handleNadeClick}
        scale={scale}
      >
        <Circle radius={22} stroke="black" strokeWidth={1} />
        <Circle ref={nadeCircleRef} radius={22} fill="black" opacity={0.4} />
        <Image
          listening={false}
          offsetX={iconSize / 2}
          offsetY={iconSize / 2}
          image={image}
          width={iconSize}
          height={iconSize}
        />
        {count > 1 && (
          <Group x={16} y={-16}>
            <Circle radius={12} fill="rgba(0, 0, 0, 1)" />
            <Text
              listening={false}
              x={0}
              y={0}
              offsetX={14}
              offsetY={13}
              text={count.toString()}
              fontSize={16}
              fontStyle="bold"
              fontFamily="Helvetica Neue, Helvetica, Verdana"
              fill={"white"}
              strokeWidth={2}
              stroke="rgba(0,0,0,1)"
              fillAfterStrokeEnabled
              width={28}
              height={28}
              align="center"
              verticalAlign="middle"
            />
          </Group>
        )}

        {hasNew && (
          <Circle
            listening={false}
            fill="#aeff00"
            radius={4}
            offsetX={-22}
            offsetY={0}
            stroke={"black"}
            strokeWidth={1}
          />
        )}
      </Group>
    </>
  );
};

function nadeScale(csMap: CsMap): { x: number; y: number } {
  if (csMap === "nuke") {
    return { x: 0.9, y: 0.9 };
  }
  if (csMap === "vertigo") {
    return { x: 1.2, y: 1.2 };
  }
  if (csMap === "dust2") {
    return { x: 1.1, y: 1.1 };
  }
  return { x: 1, y: 1 };
}
