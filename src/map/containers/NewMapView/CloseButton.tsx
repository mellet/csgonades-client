import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { FC, useRef } from "react";
import { Image } from "react-konva";
import useImage from "use-image";

type Props = {
  x: number;
  y: number;
  onClick: () => void;
  visible?: boolean;
};

export const CloseButton: FC<Props> = ({ x, y, onClick, visible }) => {
  const size = 48;
  const [image] = useImage(`/icons/close.svg`);
  const imageRef = useRef<Konva.Image>(null);

  function handleClick(event: KonvaEventObject<Event>) {
    const container = event.target.getStage()?.container();
    if (container) {
      container.style.cursor = "default";
    }
    onClick();
  }

  function handleMouseEnter(event: KonvaEventObject<Event>) {
    const container = event.target.getStage()?.container();
    if (container) {
      container.style.cursor = "pointer";
    }
    imageRef.current?.to({
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 0.1,
    });
  }

  function handleMouseLeave(event: KonvaEventObject<Event>) {
    const container = event.target.getStage()?.container();
    if (container) {
      container.style.cursor = "default";
    }
    imageRef.current?.to({
      scaleX: 1,
      scaleY: 1,
      duration: 0.1,
    });
  }

  return (
    <>
      <Image
        listening={visible}
        visible={visible}
        ref={imageRef}
        x={x}
        y={y}
        image={image}
        width={size}
        height={size}
        offset={{ x: size / 2, y: size / 2 }}
        onMouseOver={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTap={handleClick}
      />
    </>
  );
};
