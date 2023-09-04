import { Dispatch } from "react";
import { CsMap } from "../../../../map/models/CsGoMap";
import { NadeMovement } from "../../../models/NadeMovement";
import { Tickrate } from "../../../models/NadeTickrate";
import { NadeType } from "../../../models/NadeType";
import { TeamSide } from "../../../models/TeamSide";
import { Technique } from "../../../models/Technique";
import { NadeAddActions } from "./nadeAddActions";
import { NadeCreateSteps } from "./NadeAddState";
import { GameMode } from "../../../models/GameMode";

export type NadeAddCallbacks = ReturnType<typeof useNadeAddActions>;

export const useNadeAddActions = (dispatch: Dispatch<NadeAddActions>) => {
  function setCurrentStep(step: NadeCreateSteps) {
    dispatch({ type: "CreateNade/SetCurrentStep", step });
  }

  function setNadeMap(map: CsMap) {
    dispatch({ type: "CreateNade/SetMap", map });
  }

  function setDescription(description: string) {
    dispatch({ type: "CreateNade/SetDescription", description });
  }

  function setEndPosition(endPosition: string) {
    dispatch({ type: "CreateNade/SetEndPosition", endPosition });
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

  function setMap(map: CsMap) {
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

  function setMapEndLocation(mapEndLocationId: string) {
    dispatch({ type: "CreateNade/SetMapEndLocation", mapEndLocationId });
  }

  function setMapStartLocation(mapStartLocationId: string) {
    dispatch({ type: "CreateNade/SetMapStartLocation", mapStartLocationId });
  }

  function setGameMode(gameMode: GameMode) {
    dispatch({ type: "CreateNade/SetGameMode", gameMode });
  }

  return {
    setCurrentStep,
    setDescription,
    setEndPosition,
    setLineUpImage,
    setMap,
    setMapEndLocation,
    setMapStartLocation,
    setGameMode,
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
    setYouTubeId,
  };
};
