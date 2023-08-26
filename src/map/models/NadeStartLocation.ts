import { CsCanvasCoordinate } from "../../nade/models/MapCoordinates";
import { CsMap } from "./CsGoMap";

export type NadeStartLocation = {
  id: string;
  calloutName: string;
  map: CsMap;
  position: CsCanvasCoordinate[];
};

export type NadeStartLocationCreate = {
  calloutName: string;
  map: CsMap;
  position: CsCanvasCoordinate[];
};

export type NadeStartLocationUpdate = {
  id: string;
  calloutName?: string;
  map?: CsMap;
  position?: CsCanvasCoordinate[];
};
