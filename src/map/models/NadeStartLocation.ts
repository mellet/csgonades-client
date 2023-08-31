import { CsCanvasCoordinate } from "../../nade/models/MapCoordinates";
import { CsMap } from "./CsGoMap";

export type MapStartLocation = {
  id: string;
  calloutName: string;
  map: CsMap;
  position: CsCanvasCoordinate[];
  labelPosition: CsCanvasCoordinate;
};

export type MapStartLocationCreate = {
  calloutName: string;
  map: CsMap;
  position: CsCanvasCoordinate[];
  labelPosition: CsCanvasCoordinate;
};

export type MapStartLocationUpdate = {
  id: string;
  calloutName?: string;
  map?: CsMap;
  position?: CsCanvasCoordinate[];
  labelPosition?: CsCanvasCoordinate;
};
