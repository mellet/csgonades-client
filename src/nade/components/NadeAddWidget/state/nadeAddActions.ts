import { CsgoMap } from "../../../../map/models/CsGoMap";
import { GfycatData } from "../../../models/GfycatData";
import { MapCoordinates } from "../../../models/Nade";
import { NadeMovement } from "../../../models/NadeMovement";
import { Tickrate } from "../../../models/NadeTickrate";
import { NadeType } from "../../../models/NadeType";
import { TeamSide } from "../../../models/TeamSide";
import { Technique } from "../../../models/Technique";
import { NadeCreateSteps } from "./NadeAddState";

type SetMap = {
  type: "CreateNade/SetMap";
  map: CsgoMap;
};

type SetGfyData = {
  type: "CreateNade/SetGfyData";
  data: GfycatData;
};

type SetEndPosition = {
  type: "CreateNade/SetEndPosition";
  endPosition: string;
};

type SetStartPosition = {
  type: "CreateNade/SetStartPosition";
  startPosition: string;
};

type SetDescription = {
  type: "CreateNade/SetDescription";
  description: string;
};

type SetNadeType = {
  type: "CreateNade/SetNadeType";
  nadeType: NadeType;
};

type SetMovement = {
  type: "CreateNade/SetMovement";
  movement: NadeMovement;
};

type SetImage = {
  type: "CreateNade/SetImage";
  image: string;
};

type SetEndPosCoords = {
  type: "CreateNade/SetEndPosCoords";
  coords: MapCoordinates;
};

type SetTechnique = {
  type: "CreateNade/SetTechnique";
  technique: Technique;
};

type SetTeleportCoordinates = {
  type: "CreateNade/SetTeleportCoordinates";
  setPos: string;
};

type SetTickrate = {
  type: "CreateNade/SetTickrate";
  tick: Tickrate;
};

type SetLineUpImage = {
  type: "CreateNade/SetLineUpImage";
  img: string;
};

type SetTeamSide = {
  type: "CreateNade/SetTeamSide";
  side: TeamSide;
};

type SetOneWay = {
  type: "CreateNade/SetOneWay";
  oneWay: boolean;
};

type SetCurrentStep = {
  type: "CreateNade/SetCurrentStep";
  step: NadeCreateSteps;
};

type SetProLink = {
  type: "CreateNade/SetProUrl";
  proUrl?: string;
};

export type NadeAddActions =
  | SetCurrentStep
  | SetDescription
  | SetEndPosCoords
  | SetEndPosition
  | SetGfyData
  | SetImage
  | SetLineUpImage
  | SetMap
  | SetMovement
  | SetNadeType
  | SetOneWay
  | SetProLink
  | SetStartPosition
  | SetTeamSide
  | SetTechnique
  | SetTeleportCoordinates
  | SetTickrate;
