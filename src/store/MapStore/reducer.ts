import { Reducer } from "redux";
import { MapStoreActions } from "./actions";
import { NadeLight, MapCoordinates } from "../../nade-data/Nade/Nade";
import { CsgoMap } from "../../nade-data/Nade/CsGoMap";
import { NadeType } from "../../nade-data/Nade/NadeType";
import { Tickrate } from "../../nade-data/Nade/NadeTickrate";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  IncrementNadeFavoriteCount,
  DecrementNadeFavoriteCount,
} from "./actions";
import { assertNever } from "../../utils/Common";

type NadesForMap = { [key: string]: NadeLight[] | undefined };

export type NadeSortingMethod = "hot" | "new" | "top";
export type MapView = "overview" | "list";

export type MapStoreState = {
  view: MapView;
  mapViewOpen: boolean;
  nadeForMap: NadesForMap;
  currentMap?: CsgoMap;
  filterByFavorites: boolean;
  filterByType?: NadeType;
  filterByCoords?: MapCoordinates;
  filterByTickrate: Tickrate;
  filterByPro?: boolean;
  sortingMethod: NadeSortingMethod;
  nadeForModal?: NadeLight;
};

const initialState: MapStoreState = {
  view: "list",
  mapViewOpen: false,
  nadeForMap: {},
  filterByFavorites: false,
  filterByPro: false,
  filterByTickrate: "any",
  sortingMethod: "hot",
};

const MapStoreReducerBase: Reducer<MapStoreState, MapStoreActions> = (
  state = initialState,
  action
): MapStoreState => {
  switch (action.type) {
    case "MapStore/SetView":
      return {
        ...state,
        view: action.view,
      };
    case "MapStore/SetSortingMethod":
      return {
        ...state,
        sortingMethod: action.method,
      };
    case "MapStore/ReplaceNadesForMap":
      return {
        ...state,
        nadeForMap: {
          ...state.nadeForMap,
          [action.map]: action.nades,
        },
      };
    case "MapStore/SetCurrentMap":
      if (state.currentMap !== action.map) {
        return {
          ...state,
          currentMap: action.map,
          filterByFavorites: false,
          filterByTickrate: "any",
          filterByCoords: undefined,
          filterByType: undefined,
        };
      } else {
        return {
          ...state,
          currentMap: action.map,
        };
      }
    case "MapStore/ToggleMapView":
      return {
        ...state,
        mapViewOpen: !state.mapViewOpen,
      };
    case "MapStore/FilterReset":
      return {
        ...state,
        filterByCoords: undefined,
        filterByFavorites: false,
        filterByTickrate: "any",
        filterByType: undefined,
        filterByPro: false,
      };
    case "MapStore/FilterByTickrate":
      return {
        ...state,
        filterByTickrate:
          action.tick === state.filterByTickrate ? "any" : action.tick,
      };
    case "MapStore/FilterByType":
      return {
        ...state,
        filterByType:
          action.payload === state.filterByType ? undefined : action.payload,
      };
    case "MapStore/FilterToggleFavorites":
      return {
        ...state,
        filterByFavorites: !state.filterByFavorites,
      };
    case "MapStore/FilterByCoordinates":
      return {
        ...state,
        filterByCoords: action.payload,
      };
    case "MapStore/IncrementNadeFavoriteCount":
      return handleIncrementNadeFavCount(state, action, "inc");
    case "MapStore/DecrementNadeFavoriteCount":
      return handleIncrementNadeFavCount(state, action, "dec");
    case "MapStore/SetNadeForModal":
      return {
        ...state,
        nadeForModal: action.id,
      };
    case "MapStore/ClearNadeModal":
      return {
        ...state,
        nadeForModal: undefined,
      };
    case "MapStore/FilterToggleByPro":
      return {
        ...state,
        filterByPro: !state.filterByPro,
      };
    default:
      assertNever(action);
      return state;
  }
};

function handleIncrementNadeFavCount(
  state: MapStoreState,
  action: IncrementNadeFavoriteCount | DecrementNadeFavoriteCount,
  incOrdDec: "inc" | "dec"
) {
  const currentMap = state.currentMap;

  if (!currentMap) {
    return state;
  }

  const currentMapNades = state.nadeForMap[currentMap];
  const foundNade = currentMapNades
    ? currentMapNades.find((n) => n.id === action.nadeId)
    : null;

  if (!foundNade || !currentMapNades) {
    return state;
  }

  const modifiedNade = { ...foundNade };
  if (incOrdDec === "inc") {
    modifiedNade.favoriteCount += 1;
  } else {
    modifiedNade.favoriteCount -= 1;
  }

  const otherNades = currentMapNades.filter((n) => n.id !== action.nadeId);

  const newState = {
    ...state,
    nadeForMap: {
      ...state.nadeForMap,
      [currentMap]: [...otherNades, modifiedNade],
    },
  };

  return newState;
}

const persistConfig: PersistConfig<MapStoreState> = {
  key: "mapStore",
  storage,
  whitelist: ["view"],
};

export const MapStoreReducer = persistReducer(
  persistConfig,
  MapStoreReducerBase
);
