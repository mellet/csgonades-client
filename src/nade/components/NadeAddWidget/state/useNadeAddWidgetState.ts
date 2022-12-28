import { useReducer } from "react";
import { CsgoMap } from "../../../../map/models/CsGoMap";
import { GfycatData } from "../../../models/GfycatData";
import { MapCoordinates } from "../../../models/Nade";
import { NadeType } from "../../../models/NadeType";
import { nadeAddReducer } from "./nadeAddReducer";
import { initialNadeAddState, NadeCreateSteps } from "./NadeAddState";

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

  return {
    nadeAddState: state,
    setNadeType,
    setNadeMap,
    setMapPosition,
    setVideo,
    setCurrentStep,
  };
};
