import { CsgoMap } from "../../../map/models/CsGoMap";
import { GameMode } from "../../models/GameMode";
import { MapCoordinates } from "../../models/MapCoordinates";
import { NadeMovement } from "../../models/NadeMovement";
import { Tickrate } from "../../models/NadeTickrate";
import { NadeType } from "../../models/NadeType";
import { NadeStatus } from "../../models/Status";
import { TeamSide } from "../../models/TeamSide";
import { Technique } from "../../models/Technique";

type SetMap = {
  type: "EditNade/SetMap";
  map: CsgoMap;
};

type SetYouTubeId = {
  type: "EditNade/SetYouTubeId";
  youTubeId: string;
};

type SetEndPosition = {
  type: "EditNade/SetEndPosition";
  endPosition: string;
};

type SetStartPosition = {
  type: "EditNade/SetStartPosition";
  startPosition: string;
};

type SetDescription = {
  type: "EditNade/SetDescription";
  description: string;
};

type SetNadeType = {
  type: "EditNade/SetNadeType";
  nadeType: NadeType;
};

type SetMovement = {
  type: "EditNade/SetMovement";
  movement: NadeMovement;
};

type SetImage = {
  type: "EditNade/SetImage";
  image: string;
};

type SetLineUpImage = {
  type: "EditNade/SetLineUpImage";
  image: string;
};

type SetNadeCoords = {
  type: "EditNade/SetEndPosCoords";
  data: {
    mapStartCoord: MapCoordinates;
    mapEndCoord: MapCoordinates;
  };
};

type SetTechnique = {
  type: "EditNade/SetTechnique";
  technique: Technique;
};

type SetOneWay = {
  type: "EditNade/SetOneWay";
  oneWay: boolean;
};

type SetTeamSide = {
  type: "EditNade/SetTeamSide";
  side: TeamSide;
};

type SetNadeStatus = {
  type: "EditNade/SetNadeStatus";
  status: NadeStatus;
};

type SetTickrate = {
  type: "EditNade/SetTickrate";
  tick: Tickrate;
};

type SetSlug = {
  type: "EditNade/SetSlug";
  slug: string;
};

type SetIsPro = {
  type: "EditNade/SetIsPro";
};

type UnSetIsPro = {
  type: "EditNade/UnSetIsPro";
};

type SetSetPosition = {
  type: "EditNade/SetSetPosition";
  setPos: string;
};

type SetProUrl = {
  type: "EditNade/SetProUrl";
  proUrl: string;
};

type SetGameMode = {
  type: "EditNade/SetGameMode";
  gameMode: GameMode;
};

export type NadeEditAction =
  | SetDescription
  | SetNadeCoords
  | SetEndPosition
  | SetGameMode
  | SetImage
  | SetIsPro
  | SetLineUpImage
  | SetMap
  | SetMovement
  | SetNadeStatus
  | SetNadeType
  | SetOneWay
  | SetProUrl
  | SetSetPosition
  | SetSlug
  | SetStartPosition
  | SetTeamSide
  | SetTechnique
  | SetTickrate
  | SetYouTubeId
  | UnSetIsPro;
