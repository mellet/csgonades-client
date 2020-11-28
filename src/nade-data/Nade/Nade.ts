import { UserLight } from "../../models/User";
import { CsgoMap } from "./CsGoMap";
import { GfycatData } from "./GfycatData";
import { NadeImages } from "./NadeImages";
import { Movement } from "./NadeMovement";
import { Tickrate } from "./NadeTickrate";
import { NadeType } from "./NadeType";
import { Technique } from "./Technique";
import { Status } from "./Status";

export type StatusInfo = string;

export type MapCoordinates = {
  x: number;
  y: number;
};

export type Nade = {
  id: string;
  title: string;
  startPosition?: string;
  endPosition?: string;
  slug?: string;
  description?: string;
  gfycat: GfycatData;
  images: NadeImages;
  map?: CsgoMap;
  movement?: Movement;
  technique?: Technique;
  tickrate?: Tickrate;
  type?: NadeType;
  steamId: string;
  user: UserLight;
  createdAt: Date | string;
  updatedAt: string;
  status: Status;
  statusInfo?: StatusInfo;
  viewCount: number;
  commentCount: number;
  favoriteCount: number;
  mapEndCoord?: MapCoordinates;
  score: number;
  isFavorited?: boolean;
  nextUpdateInHours: number;
  oneWay?: boolean;
  isPro?: boolean;
  upVoteCount?: number;
  downVoteCount?: number;
};

export type NadeLight = {
  id: string;
  commentCount: number;
  createdAt: Date | string;
  downVoteCount?: number;
  endPosition?: string;
  favoriteCount: number;
  gfycat: GfycatData;
  imageLineupThumbUrl?: string;
  images: NadeImages;
  isFavorited?: boolean;
  isPro?: boolean;
  mapEndCoord?: MapCoordinates;
  movement?: Movement;
  nextUpdateInHours: number;
  oneWay?: boolean;
  score: number;
  slug?: string;
  startPosition?: string;
  status: Status;
  technique?: Technique;
  tickrate?: Tickrate;
  title?: string;
  type?: NadeType;
  upVoteCount?: number;
  user: UserLight;
  viewCount: number;
};

export type NadeCreateBody = {
  gfycat: GfycatData;
  imageBase64: string;
  lineUpImageBase64?: string;
  startPosition: string;
  endPosition: string;
  description: string;
  map: CsgoMap;
  movement: Movement;
  technique: Technique;
  tickrate?: Tickrate;
  type: NadeType;
  mapEndCoord: MapCoordinates;
  oneWay?: boolean;
  isPro?: boolean;
};

export type NadeUpdateBody = {
  gfycat?: GfycatData;
  imageBase64?: string;
  lineUpImageBase64?: string;
  startPosition?: string;
  endPosition?: string;
  description?: string;
  map?: CsgoMap;
  movement?: Movement;
  technique?: Technique;
  tickrate?: Tickrate;
  type?: NadeType;
  mapEndCoord?: MapCoordinates;
  status?: Status;
  slug?: string;
  oneWay?: boolean;
  isPro?: boolean;
};

export type NadeStatusDTO = {
  status: Status;
  statusInfo?: StatusInfo;
};

export const NewNade = (data: Nade): Nade => {
  return data;
};
