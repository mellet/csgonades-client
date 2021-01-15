import { Reducer, useReducer, useMemo } from "react";
import { CsgoMap } from "../../map/models/CsGoMap";
import { GfycatData } from "../models/GfycatData";
import { NadeCreateBody, MapCoordinates } from "../models/Nade";
import { NadeType } from "../models/NadeType";
import { Movement } from "../models/NadeMovement";
import { Technique } from "../models/Technique";
import { assertNever } from "../../utils/Common";
import { Tickrate } from "../models/NadeTickrate";

interface CreateNadeState extends Partial<NadeCreateBody> {
  loading: boolean;
  showImageAdder: boolean;
  showLineUpAdder: boolean;
}

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

type Actions =
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
  | SetTechnique
  | SetTickrate
  | ToggleImageSelector
  | ToggleLineupImageAdder;

const reducer: Reducer<CreateNadeState, Actions> = (state, action) => {
  switch (action.type) {
    case "CreateNade/SetMap":
      return {
        ...state,
        map: action.map,
      };
    case "CreateNade/SetGfyData":
      return {
        ...state,
        gfycat: action.data,
      };
    case "CreateNade/SetEndPosition":
      return {
        ...state,
        endPosition: action.endPosition,
      };
    case "CreateNade/SetStartPosition":
      return {
        ...state,
        startPosition: action.startPosition,
      };
    case "CreateNade/SetDescription":
      return {
        ...state,
        description: action.description,
      };
    case "CreateNade/SetNadeType":
      return {
        ...state,
        type: action.nadeType,
      };
    case "CreateNade/SetMovement":
      return {
        ...state,
        movement: action.movement,
      };
    case "CreateNade/SetImage":
      return {
        ...state,
        imageBase64: action.image,
        showImageAdder: false,
      };
    case "CreateNade/ShowImageSelector":
      return {
        ...state,
        showImageAdder: !state.showImageAdder,
      };
    case "CreateNade/SetEndPosCoords":
      return {
        ...state,
        mapEndCoord: action.coords,
      };
    case "CreateNade/SetTechnique":
      return {
        ...state,
        technique: action.technique,
      };
    case "CreateNade/SetLoading":
      return {
        ...state,
        loading: true,
      };
    case "CreateNade/SetNotLoading":
      return {
        ...state,
        loading: false,
      };
    case "CreateNade/SetTickrate":
      return {
        ...state,
        tickrate: action.tick,
      };
    case "CreateNade/ToggleLineupImageAdder":
      return {
        ...state,
        showLineUpAdder: !state.showLineUpAdder,
      };
    case "CreateNade/SetLineUpImage":
      return {
        ...state,
        lineUpImageBase64: action.img,
        showLineUpAdder: false,
      };
    default:
      assertNever(action);
      return state;
  }
};

export const useCreateNadeState = () => {
  const [state, dispatch] = useReducer(reducer, {
    showImageAdder: false,
    showLineUpAdder: false,
    loading: false,
  });

  const disableSubmit = useMemo(() => {
    if (
      !state.description ||
      !state.endPosition ||
      !state.gfycat ||
      !state.imageBase64 ||
      !state.lineUpImageBase64 ||
      !state.map ||
      !state.mapEndCoord ||
      !state.movement ||
      !state.startPosition ||
      !state.technique ||
      !state.type
    ) {
      return true;
    }
    return false;
  }, [state]);

  const missingFields = useMemo(() => {
    const missing: string[] = [
      ...insertIfNot(state.description, "Description"),
      ...insertIfNot(state.endPosition, "Nade end location"),
      ...insertIfNot(state.gfycat, "Gfycat Url"),
      ...insertIfNot(state.imageBase64, "Result Image"),
      ...insertIfNot(state.lineUpImageBase64, "Lineup Image"),
      ...insertIfNot(state.map, "Map"),
      ...insertIfNot(state.mapEndCoord, "Overview Position"),
      ...insertIfNot(state.movement, "Movement"),
      ...insertIfNot(state.startPosition, "Thrown From"),
      ...insertIfNot(state.technique, "Technique"),
      ...insertIfNot(state.type, "Type"),
    ];

    return missing;
  }, [state]);

  return {
    state,
    dispatch,
    disableSubmit,
    missingFields,
  };
};

function insertIfNot(condition, ...elements) {
  return condition ? [] : elements;
}

export const validateState = (
  state: CreateNadeState
): NadeCreateBody | false => {
  const {
    description,
    endPosition,
    gfycat,
    imageBase64,
    lineUpImageBase64,
    map,
    mapEndCoord,
    movement,
    oneWay,
    startPosition,
    technique,
    tickrate,
    type,
  } = state;
  if (
    !description ||
    !endPosition ||
    !gfycat ||
    !imageBase64 ||
    !lineUpImageBase64 ||
    !map ||
    !mapEndCoord ||
    !movement ||
    !startPosition ||
    !technique ||
    !type
  ) {
    return false;
  }
  return {
    map,
    description,
    endPosition,
    gfycat,
    imageBase64,
    mapEndCoord,
    movement,
    startPosition,
    technique,
    type,
    tickrate,
    lineUpImageBase64,
    oneWay,
  };
};
