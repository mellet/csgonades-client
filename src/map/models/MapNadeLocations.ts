import { MapEndLocation } from "./NadeEndLocation";
import { MapStartLocation } from "./NadeStartLocation";

export type MapNadeStartLocation = MapStartLocation & {
  count: number;
};

export type MapNadeLocations = {
  endLocation: MapEndLocation & { count: number };
  startPositions: MapNadeStartLocation[];
};
