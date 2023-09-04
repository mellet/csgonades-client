import { MapEndLocation } from "./NadeEndLocation";
import { MapStartLocation } from "./NadeStartLocation";

export type MapNadeStartLocation = MapStartLocation & {
  count: number;
  hasNew?: boolean;
};

export type MapNadeLocations = {
  endLocation: MapEndLocation & { count: number; hasNew?: boolean };
  startPositions: MapNadeStartLocation[];
};
