import { NadeMovement } from "./NadeMovement";
import { Tickrate } from "./NadeTickrate";
import { NadeType } from "./NadeType";
import { Technique } from "./Technique";
import { CsMap } from "../../map/models/CsGoMap";
import { TeamSide } from "./TeamSide";
import { GameMode } from "./GameMode";

export type NadeCreateBody = {
  description: string;
  gameMode: GameMode;
  imageBase64: string;
  isPro?: boolean;
  lineUpImageBase64: string;
  map: CsMap;
  mapStartLocationId: string;
  mapEndLocationId: string;
  movement: NadeMovement;
  oneWay?: boolean;
  proUrl?: string;
  setPos?: string;
  teamSide: TeamSide;
  technique: Technique;
  tickrate?: Tickrate;
  type: NadeType;
  youTubeId: string;
};
