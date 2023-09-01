import { FC, useRef } from "react";
import { Image, Text } from "react-konva";
import { MapNadeLocations } from "../../models/MapNadeLocations";
import useImage from "use-image";
import { NadeType } from "../../../nade/models/NadeType";
import Konva from "konva";
import { CsMap } from "../../models/CsGoMap";

type Props = {
  csMap: CsMap;
  mapNadeLocations: MapNadeLocations[];
  onNadeClick: (mapLocation: MapNadeLocations) => void;
  onUnselect: () => void;
  selectedLocationId?: string;
};

export const GrenadeView: FC<Props> = ({
  csMap,
  mapNadeLocations,
  onNadeClick,
  onUnselect,
  selectedLocationId,
}) => {
  return (
    <>
      {mapNadeLocations.map((loc) => (
        <NadeImage
          csMap={csMap}
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
  csMap: CsMap;
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
  csMap,
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
  const scale = nadeScale(csMap);
  const grenadeIconRef = useRef<Konva.Image>(null);
  const textRef = useRef<Konva.Text>(null);
  const [image] = useImage(`/icons/grenades/${nadeType}.svg`);

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
      <Image
        scale={scale}
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
        scale={scale}
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
        strokeWidth={2}
        stroke="rgba(0,0,0,0.8)"
        fillAfterStrokeEnabled
        align="center"
        verticalAlign="middle"
      />
    </>
  );
};

function nadeScale(csMap: CsMap): { x: number; y: number } {
  if (csMap === "mirage" || csMap === "inferno") {
    return { x: 0.9, y: 0.9 };
  }
  return { x: 1, y: 1 };
}
