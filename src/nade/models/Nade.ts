import { UserLight } from "../../users/models/User";
import { GfycatData } from "./GfycatData";
import { NadeMovement } from "./NadeMovement";
import { Tickrate } from "./NadeTickrate";
import { NadeType } from "./NadeType";
import { Technique } from "./Technique";
import { NadeStatus } from "./Status";
import { CsgoMap } from "../../map/models/CsGoMap";
import { TeamSide } from "./TeamSide";
import { GameMode } from "./GameMode";

type StatusInfo = string;

export type MapCoordinates = {
  x: number;
  y: number;
};

type NadeImageData = {
  id: string;
  collection: string;
  url: string;
};

export interface Nade {
  commentCount: number;
  createdAt: Date | string;
  description?: string;
  eloScore: number;
  endPosition?: string;
  favoriteCount: number;
  gameMode?: GameMode;
  gfycat?: GfycatData;
  id: string;
  imageLineup?: NadeImageData;
  imageLineupThumb?: NadeImageData;
  imageMain: NadeImageData;
  imageMainThumb?: NadeImageData;
  isFavorited?: boolean;
  isPro?: boolean;
  map?: CsgoMap;
  mapEndCoord?: MapCoordinates;
  mapStartCoord?: MapCoordinates;
  movement?: NadeMovement;
  oneWay?: boolean;
  proUrl?: string;
  score: number;
  setPos?: string;
  slug?: string;
  startPosition?: string;
  status: NadeStatus;
  statusInfo?: StatusInfo;
  steamId: string;
  teamSide?: TeamSide;
  technique?: Technique;
  tickrate?: Tickrate;
  type?: NadeType;
  updatedAt: string;
  user: UserLight;
  viewCount: number;
  youTubeId?: string;
}

export interface NadeLight {
  commentCount: number;
  createdAt: Date | string;
  downVoteCount?: number;
  eloScore: number;
  endPosition?: string;
  favoriteCount: number;
  gameMode?: GameMode;
  gfycat?: GfycatData;
  id: string;
  imageLineup?: NadeImageData;
  imageLineupThumb?: NadeImageData;
  imageLineupThumbUrl?: string;
  imageMain: NadeImageData;
  imageMainThumb?: NadeImageData;
  isFavorited?: boolean;
  isNew?: boolean;
  isPro?: boolean;
  map?: CsgoMap;
  mapEndCoord?: MapCoordinates;
  movement?: NadeMovement;
  oneWay?: boolean;
  proUrl?: string;
  score: number;
  slug?: string;
  startPosition?: string;
  status: NadeStatus;
  teamSide?: TeamSide;
  technique?: Technique;
  tickrate?: Tickrate;
  type?: NadeType;
  upVoteCount?: number;
  user: UserLight;
  viewCount: number;
  youTubeId?: string;
}

export type NadeLightSort = keyof Pick<
  NadeLight,
  "score" | "viewCount" | "favoriteCount" | "createdAt"
>;

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

export type NadeUpdateBody = {
  description?: string;
  endPosition?: string;
  gameMode?: GameMode;
  gfycat?: GfycatData;
  imageBase64?: string;
  isPro?: boolean;
  lineUpImageBase64?: string;
  map?: CsgoMap;
  mapEndCoord?: MapCoordinates;
  mapStartCoord?: MapCoordinates;
  movement?: NadeMovement;
  oneWay?: boolean;
  proUrl?: string;
  setPos?: string;
  slug?: string;
  startPosition?: string;
  status?: NadeStatus;
  teamSide?: TeamSide;
  technique?: Technique;
  tickrate?: Tickrate;
  type?: NadeType;
  youTubeId?: string;
};
