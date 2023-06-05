import { Reducer } from "react";
import { assertNever } from "../../../utils/Common";
import { NadeEditAction } from "./NadeEditActions";
import { EditNadeState } from "./NadeEditState";

export const nadeEditReducer: Reducer<EditNadeState, NadeEditAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "EditNade/SetMap":
      return {
        ...state,
        map: action.map,
      };
    case "EditNade/SetEndPosition":
      return {
        ...state,
        endPosition: action.endPosition,
      };
    case "EditNade/SetStartPosition":
      return {
        ...state,
        startPosition: action.startPosition,
      };
    case "EditNade/SetDescription":
      return {
        ...state,
        description: action.description,
      };
    case "EditNade/SetNadeType":
      return {
        ...state,
        type: action.nadeType,
      };
    case "EditNade/SetMovement":
      return {
        ...state,
        movement: action.movement,
      };
    case "EditNade/SetImage":
      return {
        ...state,
        imageBase64: action.image,
      };

    case "EditNade/SetEndPosCoords":
      return {
        ...state,
        mapEndCoord: action.coords,
      };
    case "EditNade/SetTechnique":
      return {
        ...state,
        technique: action.technique,
      };
    case "EditNade/SetOneWay":
      return {
        ...state,
        oneWay: action.oneWay,
      };
    case "EditNade/SetNadeStatus":
      return {
        ...state,
        status: action.status,
      };
    case "EditNade/SetLineUpImage":
      return {
        ...state,
        lineUpImageBase64: action.image,
      };
    case "EditNade/SetTickrate":
      return {
        ...state,
        tickrate: action.tick,
      };
    case "EditNade/SetSlug":
      return {
        ...state,
        slug: action.slug,
      };
    case "EditNade/SetIsPro":
      return {
        ...state,
        isPro: true,
      };
    case "EditNade/UnSetIsPro":
      return {
        ...state,
        isPro: false,
      };
    case "EditNade/SetTeamSide":
      return {
        ...state,
        teamSide: action.side,
      };
    case "EditNade/SetSetPosition":
      return {
        ...state,
        setPos: action.setPos,
      };
    case "EditNade/SetProUrl":
      return {
        ...state,
        proUrl: action.proUrl,
      };
    case "EditNade/SetYouTubeId":
      return {
        ...state,
        youTubeId: action.youTubeId,
      };
    case "EditNade/SetGameMode":
      return {
        ...state,
        gameMode: action.gameMode,
      };
    default:
      assertNever(action);
      return state;
  }
};
