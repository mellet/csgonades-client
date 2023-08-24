import { FC, useCallback, useEffect, useRef, useState } from "react";
import Konva from "konva";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import { Polygon } from "./Polygon";
import { Shape } from "./Shape";

export const CsMapView: FC = () => {
  const konvaRef = useRef<Konva.Stage>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [shape, setShape] = useState<Shape>([]);
  const [isCreating, setIsCreating] = useState(false);

  const onStageClick = useCallback(
    (evt: Konva.KonvaEventObject<MouseEvent>) => {
      if (isCreating) {
        const stage = evt.target.getStage();
        const position = stage?.getPointerPosition();
        const zoom = stage?.scaleX();

        if (!position || !zoom) return;

        const realX = position.x / zoom;
        const realY = position.y / zoom;
        setShape((curShape) => {
          return [...curShape, { x: realX, y: realY }];
        });
      }
    },
    [isCreating]
  );

  const onFinishShape = useCallback(() => {
    setIsCreating(false);
    if (shape.length) {
      setShapes((curShapes) => [...curShapes, shape]);
    }
    setShape([]);
  }, [shape]);

  useEffect(() => {
    if (!konvaRef || !konvaRef.current) {
      return;
    }

    const stage = konvaRef.current;

    const scaleFactor = stage.width() / 1024;

    stage.scaleX(scaleFactor);
    stage.scaleY(scaleFactor);
  }, []);

  return (
    <>
      <div className="konva-stage">
        <div>
          <button onClick={() => setIsCreating(true)}>
            New Start Location
          </button>
          <button onClick={onFinishShape}>Save Location</button>
        </div>
        <Stage ref={konvaRef} width={650} height={650} onClick={onStageClick}>
          <Layer>
            <MapImage />
          </Layer>

          <Layer>
            <Polygon isEditing={isCreating} points={shape} />
            {shapes.map((shape, idx) => (
              <Polygon key={idx + "shape"} points={shape} />
            ))}
          </Layer>
        </Stage>
      </div>
      <style jsx>{`
        .konva-stage {
          border: 1px solid red;
          width: 650px;
          height: 650px;
        }
      `}</style>
    </>
  );
};

const MapImage = () => {
  const [image] = useImage("/mapsoverlays/mirage.jpg");
  return <Image image={image} width={1024} height={1024} />;
};
