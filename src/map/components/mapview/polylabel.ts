// @ts-nocheck
import { CsCanvasCoordinate } from "../../../nade/models/MapCoordinates";

export class LabelPoint {
  static find(points: CsCanvasCoordinate[], precision = 1): CsCanvasCoordinate {
    let x_min: number;
    let y_min: number;
    let x_max: number;
    let y_max: number;

    for (let i = 0; i < points.length; i++) {
      if (i == 0) {
        x_min = x_max = points[i].x;
        y_min = y_max = points[i].y;
      } else {
        x_min = Math.min(x_min, points[i].x);
        x_max = Math.max(x_max, points[i].x);
        y_min = Math.min(y_min, points[i].y);
        y_max = Math.max(y_max, points[i].y);
      }
    }
    let lp = this.poleScan(x_min, y_min, x_max, y_max, points);
    if (precision > 0) {
      let r = (x_max - x_min) * (y_max - y_min);
      let dx, dy;
      while (r > precision) {
        lp = this.poleScan(x_min, y_min, x_max, y_max, points);
        dx = (x_max - x_min) / 24;
        dy = (y_max - y_min) / 24;
        x_min = lp.x - dx;
        x_max = lp.x + dx;
        y_min = lp.y - dy;
        y_max = lp.y + dy;
        r = dx * dy;
      }
    }
    return lp;
  }

  static pointToLineDistance(
    x: number,
    y: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    if (len_sq != 0) {
      param = dot / len_sq;
    }
    let xx, yy;
    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }
    const dx = x - xx;
    const dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static pointToPerimeterDistance(
    x: number,
    y: number,
    points: CsCanvasCoordinate[]
  ) {
    let d: number,
      p1: CsCanvasCoordinate | undefined,
      p2: CsCanvasCoordinate | undefined,
      minDistance: number;
    for (let i = 0; i < points.length; i++) {
      p1 = points[i];
      if (i + 1 < points.length) {
        p2 = points[i + 1];
      } else {
        p2 = points[0];
      }
      d = this.pointToLineDistance(x, y, p1.x, p1.y, p2.x, p2.y);
      if (i == 0) {
        minDistance = d;
      } else {
        if (d < minDistance) {
          minDistance = d;
        }
      }
    }
    return minDistance;
  }

  static isInside(x: number, y: number, points) {
    // eslint-disable-next-line no-var
    for (var c = false, i = -1, l = points.length, j = l - 1; ++i < l; j = i)
      ((points[i].y <= y && y < points[j].y) ||
        (points[j].y <= y && y < points[i].y)) &&
        x <
          ((points[j].x - points[i].x) * (y - points[i].y)) /
            (points[j].y - points[i].y) +
            points[i].x &&
        (c = !c);
    return c;
  }

  static poleScan(x_min, y_min, x_max, y_max, points) {
    let px,
      py,
      pd,
      maxDistance = 0;
    for (let y = y_min; y < y_max; y += (y_max - y_min) / 24) {
      for (let x = x_min; x < x_max; x += (x_max - x_min) / 24) {
        if (this.isInside(x, y, points)) {
          pd = this.pointToPerimeterDistance(x, y, points);
          if (pd > maxDistance) {
            maxDistance = pd;
            px = x;
            py = y;
          }
        }
      }
    }
    return {
      x: px,
      y: py,
    };
  }
}
