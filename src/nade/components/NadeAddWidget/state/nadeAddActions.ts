import { CsgoMap } from "../../../../map/models/CsGoMap";
import { GfycatData } from "../../../models/GfycatData";
import { MapCoordinates } from "../../../models/Nade";
import { Movement } from "../../../models/NadeMovement";
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
  movement: Movement;
};

type SetImage = {
  type: "CreateNade/SetImage";
  image: string;
};

type ToggleImageSelector = {
  type: "CreateNade/ShowImageSelector";
};

type SetEndPosCoords = {
  type: "CreateNade/SetEndPosCoords";
  coords: MapCoordinates;
};

type SetTechnique = {
  type: "CreateNade/SetTechnique";
  technique: Technique;
};

type SetLoading = {
  type: "CreateNade/SetLoading";
};

type SetNotLoading = {
  type: "CreateNade/SetNotLoading";
};

type SetSetPosition = {
  type: "CreateNade/SetSetPosition";
  setPos: string;
};

type SetTickrate = {
  type: "CreateNade/SetTickrate";
  tick: Tickrate;
};

type ToggleLineupImageAdder = {
  type: "CreateNade/ToggleLineupImageAdder";
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

export type NadeAddActions =
  | SetDescription
  | SetEndPosCoords
  | SetEndPosition
  | SetGfyData
  | SetImage
  | SetLineUpImage
  | SetLoading
  | SetMap
  | SetMovement
  | SetNadeType
  | SetNotLoading
  | SetStartPosition
  | SetTeamSide
  | SetTechnique
  | SetSetPosition
  | SetTickrate
  | ToggleImageSelector
  | ToggleLineupImageAdder
  | SetOneWay
  | SetCurrentStep;
