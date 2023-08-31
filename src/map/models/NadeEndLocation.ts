import { CsCanvasCoordinate } from "../../nade/models/MapCoordinates";
import { NadeType } from "../../nade/models/NadeType";
import { CsMap } from "./CsGoMap";

export type MapEndLocation = {
  id: string;
  calloutName: string;
  map: CsMap;
  position: CsCanvasCoordinate;
  type: NadeType;
};

export type MapEndLocationCreate = {
  calloutName: string;
  map: CsMap;
  position: CsCanvasCoordinate;
  type: NadeType;
};

export type MapEndLocationUpdate = {
  id: string;
  calloutName?: string;
  map?: CsMap;
  position?: CsCanvasCoordinate;
  type?: NadeType;
};
