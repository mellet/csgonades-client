import { Reducer, useReducer, useMemo, useCallback } from "react";
import {
  NadeCreateBody,
  Nade,
  MapCoordinates,
  NadeUpdateBody,
} from "../models/Nade";
import { Status } from "../models/Status";
import { CsgoMap } from "../../map/models/CsGoMap";
import { GfycatData } from "../models/GfycatData";
import { NadeType } from "../models/NadeType";
import { Movement } from "../models/NadeMovement";
import { Technique } from "../models/Technique";
import { useGetOrUpdateToken } from "../../core/authentication/useGetToken";
import { useDisplayToast } from "../../core/toasts/hooks/useDisplayToast";
import { NadeApi } from "./NadeApi";
import { useRouter } from "next/router";
import { assertNever } from "../../utils/Common";
import { Tickrate } from "../models/NadeTickrate";
import { TeamSide } from "../models/TeamSide";

interface EditNadeState extends Partial<NadeCreateBody> {
  loading: boolean;
  originalNade: Nade;
  showImageAdder: boolean;
  showLineupImgAdder: boolean;
  slug?: string;
  status?: Status;
}

type SetMap = {
  type: "EditNade/SetMap";
  map: CsgoMap;
};

type SetGfyData = {
  type: "EditNade/SetGfyData";
  data: GfycatData;
};

type SetEndPosition = {
  type: "EditNade/SetEndPosition";
  endPosition: string;
};

type SetStartPosition = {
  type: "EditNade/SetStartPosition";
  startPosition: string;
};

type SetDescription = {
  type: "EditNade/SetDescription";
  description: string;
};

type SetNadeType = {
  type: "EditNade/SetNadeType";
  nadeType: NadeType;
};

type SetMovement = {
  type: "EditNade/SetMovement";
  movement: Movement;
};

type SetImage = {
  type: "EditNade/SetImage";
  image: string;
};

type SetLineUpImage = {
  type: "EditNade/SetLineUpImage";
  image: string;
};

type ShowImageSelector = {
  type: "EditNade/ShowImageSelector";
};

type ToggleLineupImageAdder = {
  type: "EditNade/ToggleLineupImageAdder";
};

type SetEndPosCoords = {
  type: "EditNade/SetEndPosCoords";
  coords: MapCoordinates;
};

type SetTechnique = {
  type: "EditNade/SetTechnique";
  technique: Technique;
};

type SetLoading = {
  type: "EditNade/SetLoading";
};

type SetNotLoading = {
  type: "EditNade/SetNotLoading";
};

type SetOneWay = {
  type: "EditNade/SetOneWay";
  oneWay: boolean;
};

type SetTeamSide = {
  type: "EditNade/SetTeamSide";
  side: TeamSide;
};

type SetNadeStatus = {
  type: "EditNade/SetNadeStatus";
  status: Status;
};

type SetTickrate = {
  type: "EditNade/SetTickrate";
  tick: Tickrate;
};

type SetSlug = {
  type: "EditNade/SetSlug";
  slug: string;
};

type SetIsPro = {
  type: "EditNade/SetIsPro";
};

type UnSetIsPro = {
  type: "EditNade/UnSetIsPro";
};

type Actions =
  | SetDescription
  | SetEndPosCoords
  | SetEndPosition
  | SetGfyData
  | SetImage
  | SetIsPro
  | SetLineUpImage
  | SetLoading
  | SetMap
  | SetMovement
  | SetNadeStatus
  | SetNadeType
  | SetNotLoading
  | SetOneWay
  | SetSlug
  | SetStartPosition
  | SetTeamSide
  | SetTechnique
  | SetTickrate
  | ShowImageSelector
  | ToggleLineupImageAdder
  | UnSetIsPro;

const reducer: Reducer<EditNadeState, Actions> = (state, action) => {
  switch (action.type) {
    case "EditNade/ToggleLineupImageAdder":
      return {
        ...state,
        showLineupImgAdder: !state.showLineupImgAdder,
      };
    case "EditNade/SetMap":
      return {
        ...state,
        map: action.map,
      };
    case "EditNade/SetGfyData":
      return {
        ...state,
        gfycat: action.data,
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
        showImageAdder: false,
      };
    case "EditNade/ShowImageSelector":
      return {
        ...state,
        showImageAdder: !state.showImageAdder,
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
    case "EditNade/SetLoading":
      return {
        ...state,
        loading: true,
      };
    case "EditNade/SetNotLoading":
      return {
        ...state,
        loading: false,
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
        showLineupImgAdder: false,
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
    default:
      assertNever(action);
      return state;
  }
};

export const useEditNadeState = (nade: Nade) => {
  const router = useRouter();
  const displayToast = useDisplayToast();
  const getToken = useGetOrUpdateToken();
  const [state, dispatch] = useReducer(reducer, {
    originalNade: nade,
    showImageAdder: false,
    loading: false,
    showLineupImgAdder: false,
  });

  const onUpdate = useCallback(async () => {
    dispatch({ type: "EditNade/SetLoading" });
    const updateDto = createNadeUpdateBody(state);

    const changedFields = Object.keys(updateDto).length;

    if (!changedFields) {
      displayToast({
        severity: "info",
        title: "Nothing Changed",
        message: "Nothing changed from original nade",
      });
      return dispatch({ type: "EditNade/SetNotLoading" });
    }

    const token = await getToken();
    if (!token) {
      displayToast({
        severity: "error",
        title: "Not Signed In",
        message: "You don't seem to be signed in.",
      });
      return dispatch({ type: "EditNade/SetNotLoading" });
    }

    const result = await NadeApi.update(
      state.originalNade.id,
      updateDto,
      token
    );

    if (result.isErr()) {
      displayToast({
        severity: "error",
        message: "Failed to update nade",
      });
      return dispatch({ type: "EditNade/SetNotLoading" });
    }

    displayToast({
      severity: "success",
      message:
        "Nade updated! It can take up to 30 minutes for the change to be seen other places on the site.",
    });

    dispatch({ type: "EditNade/SetNotLoading" });

    router.push(
      "/nades/[nade]",
      `/nades/${state.originalNade.slug || state.originalNade.id}`
    );
  }, [state, getToken, displayToast, router]);

  const disableSubmit = useMemo(() => {
    const updateDto = createNadeUpdateBody(state);

    const changedFields = Object.keys(updateDto).length;

    return changedFields === 0 || state.loading;
  }, [state]);

  return {
    state,
    dispatch,
    disableSubmit,
    onUpdate,
  };
};

function createNadeUpdateBody(state: EditNadeState): NadeUpdateBody {
  const { originalNade } = state;

  const updateBody: NadeUpdateBody = {
    description: newValueIfDifferent(
      originalNade.description,
      state.description
    ),
    endPosition: newValueIfDifferent(
      originalNade.endPosition,
      state.endPosition
    ),
    gfycat: newValueIfDifferent(originalNade.gfycat, state.gfycat),
    imageBase64: newValueIfDifferent(originalNade.images, state.imageBase64),
    map: newValueIfDifferent(originalNade.map, state.map),
    mapEndCoord: newValueIfDifferent(
      originalNade.mapEndCoord,
      state.mapEndCoord
    ),
    movement: newValueIfDifferent(originalNade.movement, state.movement),
    slug: newValueIfDifferent(originalNade.slug, state.slug),
    startPosition: newValueIfDifferent(
      originalNade.startPosition,
      state.startPosition
    ),
    status: newValueIfDifferent(originalNade.status, state.status),
    technique: newValueIfDifferent(originalNade.technique, state.technique),
    tickrate: newValueIfDifferent(originalNade.tickrate, state.tickrate),
    type: newValueIfDifferent(originalNade.type, state.type),
    oneWay: newBooleanValueIfDifferent(originalNade.oneWay, state.oneWay),
    lineUpImageBase64: newValueIfDifferent(
      originalNade.images,
      state.lineUpImageBase64
    ),
    isPro: newBooleanValueIfDifferent(originalNade.isPro, state.isPro),
    teamSide: state.teamSide,
  };

  // Remove undefine keys
  Object.keys(updateBody).forEach((key) =>
    updateBody[key] === undefined ? delete updateBody[key] : {}
  );

  return updateBody;
}

function newValueIfDifferent(originalValue?: any, newValue?: any) {
  const originalValueCheck = JSON.stringify(originalValue);
  const newValueCheck = JSON.stringify(newValue);

  if (!newValue) {
    return undefined;
  } else if (originalValueCheck === newValueCheck) {
    return undefined;
  } else {
    return newValue;
  }
}

function newBooleanValueIfDifferent(
  originalValue?: boolean,
  newValue?: boolean
) {
  if (typeof newValue === "boolean" && originalValue !== newValue) {
    return newValue;
  }
  return undefined;
}
