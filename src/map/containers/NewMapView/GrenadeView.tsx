import { FC, useRef } from "react";
import { Image, Text } from "react-konva";
import { MapNadeLocations } from "../../models/MapNadeLocations";
import useImage from "use-image";
import { NadeType } from "../../../nade/models/NadeType";
import Konva from "konva";

type Props = {
  mapNadeLocations: MapNadeLocations[];
  onNadeClick: (mapLocation: MapNadeLocations) => void;
  onUnselect: () => void;
  selectedLocationId?: string;
};

export const GrenadeView: FC<Props> = ({
  mapNadeLocations,
  onNadeClick,
  onUnselect,
  selectedLocationId,
}) => {
  return (
    <>
      {mapNadeLocations.map((loc) => (
        <NadeImage
          count={loc.endLocation.count}
          hide={
            selectedLocationId
              ? selectedLocationId !== loc.endLocation.id
              : false
          }
          key={loc.endLocation.id}
          nadeType={loc.endLocation.type}
          x={loc.endLocation.position.x}
          y={loc.endLocation.position.y}
          onNadeClick={() => onNadeClick(loc)}
          onUnselect={onUnselect}
          isSelected={loc.endLocation.id === selectedLocationId}
        />
      ))}
      <style jsx>{``}</style>
    </>
  );
};

type MapImageProps = {
  nadeType: NadeType;
  x: number;
  y: number;
  onNadeClick: () => void;
  onUnselect: () => void;
  hide?: boolean;
  isSelected?: boolean;
  count: number;
};

export const NadeImage: FC<MapImageProps> = ({
  nadeType,
  x,
  y,
  onNadeClick,
  onUnselect,
  hide,
  isSelected,
  count,
}) => {
  const size = 55;
  const grenadeIconRef = useRef<Konva.Image>(null);
  const textRef = useRef<Konva.Text>(null);
  const [image] = useImage(`/icons/grenades/${nadeType}.svg`);

  const zoomIn = () => {
    // to() is a method of `Konva.Node` instances
    grenadeIconRef.current?.to({
      scaleX: 1.1,
      scaleY: 1.1,
      opacity: 1,
      duration: 0.1,
    });
    textRef.current?.to({
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 0.1,
    });
  };

  const zoomOut = () => {
    // to() is a method of `Konva.Node` instances
    grenadeIconRef.current?.to({
      scaleX: 1,
      scaleY: 1,
      opacity: 0.9,
      duration: 0.1,
    });
    textRef.current?.to({
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
      <Image
        opacity={0.9}
        ref={grenadeIconRef}
        onClick={onClick}
        x={x}
        y={y}
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
      <Text
        ref={textRef}
        listening={false}
        x={x}
        y={y}
        text={isSelected ? "X" : count.toString()}
        fontSize={32}
        fontStyle="bold"
        fontFamily="Changa One"
        offset={{ x: 50, y: 15 }}
        width={100}
        fill={isSelected ? "white" : "white"}
        shadowColor="black"
        shadowBlur={4}
        shadowOffset={{ x: 1, y: 1 }}
        shadowOpacity={0.4}
        align="center"
        verticalAlign="middle"
      />
    </>
  );
};
