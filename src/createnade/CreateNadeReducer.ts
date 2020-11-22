import { Reducer, useReducer, useMemo } from "react";
import { CsgoMap } from "../nade-data/Nade/CsGoMap";
import { GfycatData } from "../nade-data/Nade/GfycatData";
import { NadeCreateBody, MapCoordinates } from "../nade-data/Nade/Nade";
import { NadeType } from "../nade-data/Nade/NadeType";
import { Movement } from "../nade-data/Nade/NadeMovement";
import { Technique } from "../nade-data/Nade/Technique";
import { assertNever } from "../utils/Common";
import { Tickrate } from "../nade-data/Nade/NadeTickrate";

interface CreateNadeState extends Partial<NadeCreateBody> {
  showImageAdder: boolean;
  showLineUpAdder: boolean;
  loading: boolean;
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
  | SetMap
  | SetGfyData
  | SetEndPosition
  | SetStartPosition
  | SetDescription
  | SetNadeType
  | SetMovement
  | SetImage
  | ToggleImageSelector
  | ToggleLineupImageAdder
  | SetEndPosCoords
  | SetTechnique
  | SetLoading
  | SetNotLoading
  | SetTickrate
  | SetLineUpImage;

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
      !state.map ||
      !state.description ||
      !state.endPosition ||
      !state.gfycat ||
      !state.imageBase64 ||
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

  return {
    state,
    dispatch,
    disableSubmit,
  };
};

export const validateState = (
  state: CreateNadeState
): NadeCreateBody | false => {
  const {
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
  } = state;
  if (
    !map ||
    !description ||
    !endPosition ||
    !gfycat ||
    !imageBase64 ||
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
