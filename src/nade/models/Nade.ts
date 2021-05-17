import { UserLight } from "../../users/models/User";
import { GfycatData } from "./GfycatData";
import { Movement } from "./NadeMovement";
import { Tickrate } from "./NadeTickrate";
import { NadeType } from "./NadeType";
import { Technique } from "./Technique";
import { Status } from "./Status";
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
  isPro?: boolean;
  map?: CsgoMap;
  mapEndCoord?: MapCoordinates;
  movement?: Movement;
  oneWay?: boolean;
  score: number;
  setPos?: string;
  slug?: string;
  startPosition?: string;
  status: Status;
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
  movement?: Movement;
  oneWay?: boolean;
  score: number;
  slug?: string;
  startPosition?: string;
  status: Status;
  teamSide?: TeamSide;
  technique?: Technique;
  tickrate?: Tickrate;
  type?: NadeType;
  upVoteCount?: number;
  user: UserLight;
  viewCount: number;
}

export type NadeCreateBody = {
  description: string;
  endPosition: string;
  gfycat: GfycatData;
  imageBase64: string;
  isPro?: boolean;
  lineUpImageBase64?: string;
  map: CsgoMap;
  mapEndCoord: MapCoordinates;
  movement: Movement;
  oneWay?: boolean;
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
  movement?: Movement;
  oneWay?: boolean;
  setPos?: string;
  slug?: string;
  startPosition?: string;
  status?: Status;
  teamSide?: TeamSide;
  technique?: Technique;
  tickrate?: Tickrate;
  type?: NadeType;
};

export type NadeStatusDTO = {
  status: Status;
  statusInfo?: StatusInfo;
};

export const NewNade = (data: Nade): Nade => {
  return data;
};
