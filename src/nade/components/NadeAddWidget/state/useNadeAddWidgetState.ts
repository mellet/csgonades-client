import { Dispatch, useReducer } from "react";
import { CsgoMap } from "../../../../map/models/CsGoMap";
import { GfycatData } from "../../../models/GfycatData";
import { MapCoordinates } from "../../../models/Nade";
import { Movement } from "../../../models/NadeMovement";
import { Tickrate } from "../../../models/NadeTickrate";
import { NadeType } from "../../../models/NadeType";
import { TeamSide } from "../../../models/TeamSide";
import { Technique } from "../../../models/Technique";
import { NadeAddActions } from "./nadeAddActions";
import { nadeAddReducer } from "./nadeAddReducer";
import { initialNadeAddState, NadeCreateSteps } from "./NadeAddState";

export type NadeAddCallbacks = ReturnType<typeof useNadeAddActions>;

export const useNadeAddActions = (dispatch: Dispatch<NadeAddActions>) => {
  function setCurrentStep(step: NadeCreateSteps) {
    dispatch({ type: "CreateNade/SetCurrentStep", step });
  }

  function setNadeMap(map: CsgoMap) {
    dispatch({ type: "CreateNade/SetMap", map });
  }

  function setDescription(description: string) {
    dispatch({ type: "CreateNade/SetDescription", description });
  }

  function setMapPosition(position: MapCoordinates) {
    dispatch({ type: "CreateNade/SetEndPosCoords", coords: position });
  }

  function setEndPosition(endPosition: string) {
    dispatch({ type: "CreateNade/SetEndPosition", endPosition });
  }

  function setVideo(gfycat: GfycatData) {
    dispatch({ type: "CreateNade/SetGfyData", data: gfycat });
  }

  function setResultImage(imageSrc: string) {
    dispatch({ type: "CreateNade/SetImage", image: imageSrc });
  }

  function setLineUpImage(img: string) {
    dispatch({ type: "CreateNade/SetLineUpImage", img });
  }

  function setMap(map: CsgoMap) {
    dispatch({ type: "CreateNade/SetMap", map });
  }

  function setMovement(movement: Movement) {
    dispatch({ type: "CreateNade/SetMovement", movement });
  }

  function setNadeType(nadeType: NadeType) {
    dispatch({
      type: "CreateNade/SetNadeType",
      nadeType,
    });
  }

  function setOneWay(oneWay: boolean) {
    dispatch({ type: "CreateNade/SetOneWay", oneWay });
  }

  function setStartPosition(startPosition: string) {
    dispatch({ type: "CreateNade/SetStartPosition", startPosition });
  }

  function setTeamSide(side: TeamSide) {
    dispatch({ type: "CreateNade/SetTeamSide", side });
  }

  function setTechnique(technique: Technique) {
    dispatch({ type: "CreateNade/SetTechnique", technique });
  }

  function setTeleportCoordinates(setPos: string) {
    dispatch({ type: "CreateNade/SetTeleportCoordinates", setPos });
  }

  function setTickrate(tick: Tickrate) {
    dispatch({ type: "CreateNade/SetTickrate", tick });
  }

  return {
    setCurrentStep,
    setDescription,
    setEndPosition,
    setLineUpImage,
    setMap,
    setMapPosition,
    setMovement,
    setNadeMap,
    setNadeType,
    setOneWay,
    setResultImage,
    setStartPosition,
    setTeamSide,
    setTechnique,
    setTeleportCoordinates,
    setTickrate,
    setVideo,
  };
};

export const useNadeAddWidgetState = () => {
  const [state, dispatch] = useReducer(nadeAddReducer, initialNadeAddState);

  function setNadeType(nadeType: NadeType) {
    dispatch({
      type: "CreateNade/SetNadeType",
      nadeType,
    });
  }

  function setNadeMap(map: CsgoMap) {
    dispatch({ type: "CreateNade/SetMap", map });
  }

  function setMapPosition(position: MapCoordinates) {
    dispatch({ type: "CreateNade/SetEndPosCoords", coords: position });
  }

  function setVideo(gfycat: GfycatData) {
    dispatch({ type: "CreateNade/SetGfyData", data: gfycat });
  }

  function setCurrentStep(step: NadeCreateSteps) {
    dispatch({ type: "CreateNade/SetCurrentStep", step });
  }

  function setResultImage(imageSrc: string) {
    dispatch({ type: "CreateNade/SetImage", image: imageSrc });
  }

  return {
    nadeAddState: state,
    setNadeType,
    setNadeMap,
    setMapPosition,
    setVideo,
    setCurrentStep,
    setResultImage,
  };
};
