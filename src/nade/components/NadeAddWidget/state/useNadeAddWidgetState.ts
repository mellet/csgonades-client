import { Dispatch, useReducer } from "react";
import { CsgoMap } from "../../../../map/models/CsGoMap";
import { GfycatData } from "../../../models/GfycatData";
import { MapCoordinates } from "../../../models/Nade";
import { NadeMovement } from "../../../models/NadeMovement";
import { Tickrate } from "../../../models/NadeTickrate";
import { NadeType } from "../../../models/NadeType";
import { TeamSide } from "../../../models/TeamSide";
import { Technique } from "../../../models/Technique";
import { NadeAddActions } from "./nadeAddActions";
import { nadeAddReducer } from "./nadeAddReducer";
import { initialNadeAddState, NadeCreateSteps } from "./NadeAddState";
import { GameMode } from "../../../models/GameMode";

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

  function setYouTubeId(youTubeId: string) {
    dispatch({ type: "CreateNade/SetYouTubeId", youTubeId });
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

  function setMovement(movement: NadeMovement) {
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

  function setProLink(proUrl: string) {
    dispatch({ type: "CreateNade/SetProUrl", proUrl });
  }

  function setGameMode(gameMode: GameMode) {
    dispatch({ type: "CreateNade/SetGameMode", gameMode });
  }

  return {
    setCurrentStep,
    setDescription,
    setEndPosition,
    setGameMode,
    setLineUpImage,
    setMap,
    setMapPosition,
    setMovement,
    setNadeMap,
    setNadeType,
    setOneWay,
    setProLink,
    setResultImage,
    setStartPosition,
    setTeamSide,
    setTechnique,
    setTeleportCoordinates,
    setTickrate,
    setVideo,
    setYouTubeId,
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

  function setYouTubeId(youTubeId: string) {
    dispatch({ type: "CreateNade/SetYouTubeId", youTubeId });
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
    setYouTubeId,
    setResultImage,
  };
};
