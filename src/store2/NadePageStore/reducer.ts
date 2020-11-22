import { Reducer } from "redux";
import { Nade } from "../../nade-data/Nade/Nade";
import { assertNever } from "../../utils/Common";
import { NadeActions } from "./actions";

export type NadePageState = {
  nade: Nade | null;
};

export const nadePageInitialState: NadePageState = {
  nade: null,
};

export const NadePageReducer: Reducer<NadePageState, NadeActions> = (
  state = nadePageInitialState,
  action
): NadePageState => {
  switch (action.type) {
    case "@@nades/REPLACE_NADE": {
      return {
        ...state,
        nade: action.nade,
      };
    }
    case "@@nades/ON_FAVORITE_NADE": {
      if (!state.nade) {
        return state;
      }

      return {
        ...state,
        nade: {
          ...state.nade,
          favoriteCount: state.nade.favoriteCount + 1,
        },
      };
    }
    case "@@nades/ON_UNFAVORITE_NADE": {
      if (!state.nade) {
        return state;
      }

      return {
        ...state,
        nade: {
          ...state.nade,
          favoriteCount: state.nade.favoriteCount - 1,
        },
      };
    }
    default:
      assertNever(action);
      return state;
  }
};
