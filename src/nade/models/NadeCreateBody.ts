import { GfycatData } from "./GfycatData";
import { NadeMovement } from "./NadeMovement";
import { Tickrate } from "./NadeTickrate";
import { NadeType } from "./NadeType";
import { Technique } from "./Technique";
import { CsgoMap } from "../../map/models/CsGoMap";
import { TeamSide } from "./TeamSide";
import { GameMode } from "./GameMode";
import { MapCoordinates } from "./MapCoordinates";

export type NadeCreateBody = {
  description: string;
  endPosition: string;
  gameMode: GameMode;
  gfycat?: GfycatData;
  imageBase64: string;
  isPro?: boolean;
  lineUpImageBase64?: string;
  map: CsgoMap;
  mapEndCoord: MapCoordinates;
  mapStartCoord: MapCoordinates;
  movement: NadeMovement;
  oneWay?: boolean;
  proUrl?: string;
  setPos?: string;
  startPosition: string;
  teamSide?: TeamSide;
  technique: Technique;
  tickrate?: Tickrate;
  type: NadeType;
  youTubeId?: string;
};