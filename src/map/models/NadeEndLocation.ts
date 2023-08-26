import { CsCanvasCoordinate } from "../../nade/models/MapCoordinates";
import { NadeType } from "../../nade/models/NadeType";
import { CsMap } from "./CsGoMap";

export type NadeEndLocation = {
  id: string;
  calloutName: string;
  map: CsMap;
  type: NadeType;
  position: CsCanvasCoordinate;
};

export type NadeEndLocationCreate = {
  calloutName: string;
  map: CsMap;
  type: NadeType;
  position: CsCanvasCoordinate;
};

export type NadeEndLocationUpdate = {
  id: string;
  calloutName?: string;
  position?: CsCanvasCoordinate;
};
