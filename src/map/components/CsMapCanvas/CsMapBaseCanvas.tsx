import React, { useRef, useEffect } from "react";
import { MapCoordinates } from "../../../nade/models/Nade";
import { CsgoMap } from "../../models/CsGoMap";
import {
  CanvasCircle,
  convertRealCoordsToDomCoords,
  covertToSavedCoordinates,
  drawCircles,
  drawDirectionalArrow,
  drawLine,
  getCanvasCenter,
  isInsideCircle,
} from "./csMapCanvasHelpers";

type Props = {
  csMap: CsgoMap;
  canvasSize: number;
  defaultStartPosition?: MapCoordinates;
  defaultEndPosition?: MapCoordinates;
  onPostionChange: (
    startPosition: MapCoordinates,
    endPosition: MapCoordinates
  ) => void;
};

const CanvasComponent: React.FC<Props> = ({
  csMap,
  canvasSize,
  defaultStartPosition,
  defaultEndPosition,
  onPostionChange,
}) => {
  const startPos = convertRealCoordsToDomCoords(
    canvasSize,
    defaultStartPosition
  );
  const endPos = convertRealCoordsToDomCoords(canvasSize, defaultEndPosition);
  const canvasCenter = getCanvasCenter(canvasSize);
  const opacity = useRef(0.75);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const smallCircleRef = useRef<CanvasCircle>({
    x: startPos?.x || canvasCenter.x,
    y: startPos?.y || canvasCenter.y + 50,
    color: "rgba(255, 145, 0, 0.75)",
    radius: 6,
    isDragging: false,
  });
  const bigCircleRef = useRef<CanvasCircle>({
    x: endPos?.x || canvasCenter.x,
    y: endPos?.y || canvasCenter.y - 50,
    color: "rgba(255, 255, 255, 0.5)",
    radius: 12,
    isDragging: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const handleMouseDown = (e: MouseEvent) => {
      const { offsetX, offsetY } = e;
      const smallCircle = smallCircleRef.current;
      const bigCircle = bigCircleRef.current;

      if (isInsideCircle(offsetX, offsetY, smallCircle)) {
        smallCircle.isDragging = true;
        opacity.current = 0.4;
        smallCircle.color = "rgba(255, 145, 0, 0.15)";
      } else if (isInsideCircle(offsetX, offsetY, bigCircle)) {
        bigCircle.isDragging = true;
        opacity.current = 0.4;
        bigCircle.color = "rgba(255, 255, 255, 0.15)";
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { offsetX, offsetY } = e;
      const smallCircle = smallCircleRef.current;
      const bigCircle = bigCircleRef.current;

      if (smallCircle.isDragging) {
        smallCircle.x = offsetX;
        smallCircle.y = offsetY;
      } else if (bigCircle.isDragging) {
        bigCircle.x = offsetX;
        bigCircle.y = offsetY;
      }

      draw();
    };

    const handleMouseUp = () => {
      const smallCircle = smallCircleRef.current;
      const bigCircle = bigCircleRef.current;

      const startPosition = covertToSavedCoordinates(canvasSize, {
        x: smallCircle.x,
        y: smallCircle.y,
      });
      const endPostion = covertToSavedCoordinates(canvasSize, {
        x: bigCircle.x,
        y: bigCircle.y,
      });

      onPostionChange(startPosition, endPostion);

      smallCircle.isDragging = false;
      bigCircle.isDragging = false;
      smallCircle.color = "rgba(255, 145, 0, 0.5)";
      bigCircle.color = "rgba(255, 255, 255, 0.5)";
      opacity.current = 0.75;
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      canvas.width = canvasSize;
      canvas.height = canvasSize;

      const width = canvas.width;

      ctx.clearRect(0, 0, width, width);

      const smallCircle = smallCircleRef.current;
      const bigCircle = bigCircleRef.current;

      drawLine(ctx, smallCircle, bigCircle, opacity.current);
      drawCircles(ctx, smallCircle, bigCircle);

      drawDirectionalArrow(ctx, smallCircle, bigCircle);
    };

    if (canvas) {
      draw();
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseOver = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) {
      return;
    }
    const smallCircle = smallCircleRef.current;
    const bigCircle = bigCircleRef.current;

    const { offsetX, offsetY } = e.nativeEvent;
    if (
      isInsideCircle(offsetX, offsetY, smallCircle) ||
      isInsideCircle(offsetX, offsetY, bigCircle)
    ) {
      canvasRef.current.style.cursor = "move";
    } else {
      canvasRef.current.style.cursor = "default";
    }
  };

  const handleMouseOut = () => {
    if (!canvasRef.current) {
      return;
    }
    canvasRef.current.style.cursor = "default";
  };

  return (
    <>
      <div className="stuff">
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          onMouseMove={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      </div>
      <style jsx>{`
        .stuff {
          position: relative;
        }

        canvas {
          display: block;
          cursor: default;
          background: url(${`/mapsoverlays/${csMap}.jpg`});
          background-size: cover;
          border: none;
        }
      `}</style>
    </>
  );
};

export default CanvasComponent;
