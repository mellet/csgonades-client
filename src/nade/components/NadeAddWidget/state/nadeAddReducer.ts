import { Reducer } from "react";
import { NadeAddActions } from "./nadeAddActions";
import { NadeAddState } from "./NadeAddState";

export const nadeAddReducer: Reducer<NadeAddState, NadeAddActions> = (
  state,
  action
) => {
  switch (action.type) {
    case "CreateNade/SetNadeType":
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          type: action.nadeType,
        },
      };
    case "CreateNade/SetMap":
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          map: action.map,
        },
      };
    case "CreateNade/SetEndPosCoords": {
      return {
        ...state,
        currentStep: "videoStep",
        nadeData: {
          ...state.nadeData,
          mapEndCoord: action.coords,
        },
      };
    }
    case "CreateNade/SetGfyData": {
      return {
        ...state,
        nadeData: {
          ...state.nadeData,
          gfycat: action.data,
        },
      };
    }
    case "CreateNade/SetCurrentStep": {
      return {
        ...state,
        currentStep: action.step,
      };
    }
    default:
      return state;
  }
};
