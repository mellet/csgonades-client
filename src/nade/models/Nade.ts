import { UserLight } from "../../users/models/User";
import { GfycatData } from "./GfycatData";
import { NadeMovement } from "./NadeMovement";
import { Tickrate } from "./NadeTickrate";
import { NadeType } from "./NadeType";
import { Technique } from "./Technique";
import { NadeStatus } from "./Status";
import { CsgoMap } from "../../map/models/CsGoMap";
import { TeamSide } from "./TeamSide";

export type StatusInfo = string;

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
  endPosition?: string;
  favoriteCount: number;
  gfycat: GfycatData;
  id: string;
  imageLineup?: NadeImageData;
  imageLineupThumb?: NadeImageData;
  imageMain: NadeImageData;
  isFavorited?: boolean;
  proUrl?: string;
  isPro?: boolean;
  map?: CsgoMap;
  mapEndCoord?: MapCoordinates;
  movement?: NadeMovement;
  oneWay?: boolean;
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
}

export interface NadeLight {
  commentCount: number;
  createdAt: Date | string;
  downVoteCount?: number;
  endPosition?: string;
  favoriteCount: number;
  gfycat: GfycatData;
  id: string;
  imageLineup?: NadeImageData;
  imageLineupThumb?: NadeImageData;
  imageLineupThumbUrl?: string;
  imageMain: NadeImageData;
  isFavorited?: boolean;
  isPro?: boolean;
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
}

export type NadeLightSort = keyof Pick<
  NadeLight,
  "score" | "viewCount" | "favoriteCount" | "createdAt"
>;

export type NadeCreateBody = {
  description: string;
  endPosition: string;
  gfycat: GfycatData;
  imageBase64: string;
  isPro?: boolean;
  lineUpImageBase64?: string;
  map: CsgoMap;
  mapEndCoord: MapCoordinates;
  movement: NadeMovement;
  oneWay?: boolean;
  proUrl?: string;
  setPos?: string;
  startPosition: string;
  teamSide?: TeamSide;
  technique: Technique;
  tickrate?: Tickrate;
  type: NadeType;
};

export type NadeUpdateBody = {
  description?: string;
  endPosition?: string;
  gfycat?: GfycatData;
  imageBase64?: string;
  isPro?: boolean;
  lineUpImageBase64?: string;
  map?: CsgoMap;
  mapEndCoord?: MapCoordinates;
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
};

export type NadeStatusDTO = {
  status: NadeStatus;
  statusInfo?: StatusInfo;
};
