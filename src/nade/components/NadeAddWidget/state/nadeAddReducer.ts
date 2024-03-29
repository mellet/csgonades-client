import { Reducer } from "react";
import { assertNever } from "../../../../utils/Common";
import { NadeAddActions } from "./nadeAddActions";
import { NadeAddState } from "./NadeAddState";

export const nadeAddReducer: Reducer<NadeAddState, NadeAddActions> = (
  state,
  action
) => {
  switch (action.type) {
    case "CreateNade/SetCurrentStep": {
      return {
        ...state,
        currentStep: action.step,
      };
    }
    case "CreateNade/SetDescription": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          description: action.description,
        },
      };
    }
    case "CreateNade/SetEndPosition": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          endPosition: action.endPosition,
        },
      };
    }
    case "CreateNade/SetImage": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          imageBase64: action.image,
        },
      };
    }
    case "CreateNade/SetYouTubeId": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          youTubeId: action.youTubeId,
        },
      };
    }
    case "CreateNade/SetLineUpImage": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          lineUpImageBase64: action.img,
        },
      };
    }
    case "CreateNade/SetMap":
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          map: action.map,
          mapEndLocationId: undefined,
          mapStartLocationId: undefined,
        },
      };
    case "CreateNade/SetMovement": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          movement: action.movement,
        },
      };
    }
    case "CreateNade/SetNadeType":
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          type: action.nadeType,
          mapEndLocationId: undefined,
          mapStartLocationId: undefined,
        },
      };
    case "CreateNade/SetOneWay": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          oneWay: action.oneWay,
        },
      };
    }
    case "CreateNade/SetStartPosition": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          startPosition: action.startPosition,
        },
      };
    }
    case "CreateNade/SetTeamSide": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          teamSide: action.side,
        },
      };
    }
    case "CreateNade/SetTechnique": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          technique: action.technique,
        },
      };
    }
    case "CreateNade/SetTeleportCoordinates": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          setPos: action.setPos,
        },
      };
    }
    case "CreateNade/SetTickrate": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          tickrate: action.tick,
        },
      };
    }
    case "CreateNade/SetProUrl": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          proUrl: action.proUrl,
        },
      };
    }
    case "CreateNade/SetMapEndLocation": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          mapEndLocationId: action.mapEndLocationId,
        },
      };
    }
    case "CreateNade/SetMapStartLocation": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          mapStartLocationId: action.mapStartLocationId,
        },
      };
    }
    case "CreateNade/SetGameMode": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          gameMode: action.gameMode,
          mapEndLocationId: undefined,
          mapStartLocationId: undefined,
        },
      };
    }
    default:
      assertNever(action);
      return state;
  }
};
