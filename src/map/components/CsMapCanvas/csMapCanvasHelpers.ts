import { MapCoordinates } from "../../../nade/models/Nade";

export interface CanvasCircle {
  x: number;
  y: number;
  radius: number;
  isDragging: boolean;
  color: string;
}

export function drawLine(
  ctx: CanvasRenderingContext2D,
  smallCircle: CanvasCircle,
  bigCircle: CanvasCircle,
  opacity: number
) {
  // Draw circles for maskinng
  ctx.beginPath();
  ctx.arc(
    smallCircle.x,
    smallCircle.y,
    smallCircle.radius + 14,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = "white";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(bigCircle.x, bigCircle.y, bigCircle.radius + 6, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();

  ctx.globalCompositeOperation = "source-out";

  // Draw dashed line between the circles
  ctx.beginPath();
  ctx.moveTo(bigCircle.x, bigCircle.y);
  ctx.lineTo(smallCircle.x, smallCircle.y);
  ctx.strokeStyle = `rgba(255,255,255, ${opacity})`;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.globalCompositeOperation = "screen";
}

export function drawCircles(
  ctx: CanvasRenderingContext2D,
  smallCircle: CanvasCircle,
  bigCircle: CanvasCircle
) {
  // Draw small circle
  ctx.save();
  ctx.beginPath();
  ctx.arc(smallCircle.x, smallCircle.y, smallCircle.radius, 0, Math.PI * 2);
  ctx.fillStyle = smallCircle.color;
  ctx.lineWidth = 1;
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.fill();

  // Draw big circle
  ctx.beginPath();
  ctx.arc(bigCircle.x, bigCircle.y, bigCircle.radius, 0, Math.PI * 2);
  ctx.fillStyle = bigCircle.color;
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fill();
}

export function drawDirectionalArrow(
  ctx: CanvasRenderingContext2D,
  smallCircle: CanvasCircle,
  bigCircle: CanvasCircle
) {
  // Calculate the angle between the circles
  const dx = bigCircle.x - smallCircle.x;
  const dy = bigCircle.y - smallCircle.y;
  const angle = Math.atan2(dy, dx);

  // Draw arrow
  const arrowSize = smallCircle.radius - 1;
  ctx.translate(smallCircle.x, smallCircle.y);
  ctx.rotate(angle + Math.PI); // Rotate by angle + Math.PI to flip it
  ctx.beginPath();
  ctx.moveTo(-smallCircle.radius - 8, 0);
  ctx.lineTo(-smallCircle.radius - 2, arrowSize);
  ctx.lineTo(-smallCircle.radius - 2, -arrowSize);
  ctx.closePath();
  ctx.fillStyle = "rgba(255, 145, 0, 0.75)";
  ctx.fill();
  ctx.restore();
}

export const isInsideCircle = (
  x: number,
  y: number,
  circle: CanvasCircle
): boolean => {
  return Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2) <= circle.radius;
};

export function convertRealCoordsToDomCoords(
  width: number,
  coords?: MapCoordinates
) {
  if (!coords) {
    return;
  }
  const sizeRatio = 1024 / width;
  const x = Math.round(coords.x / sizeRatio);
  const y = Math.round(coords.y / sizeRatio);
  return { x, y };
}

export function covertToSavedCoordinates(
  width: number,
  coords: MapCoordinates
) {
  const sizeRatio = 1024 / width;
  const x = Math.round(coords.x * sizeRatio);
  const y = Math.round(coords.y * sizeRatio);
  return { x, y };
}

export const getCanvasCenter = (size: number) => {
  return {
    x: size / 2,
    y: size / 2,
  };
};
