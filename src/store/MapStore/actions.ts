import { CsgoMap } from "../../nade-data/Nade/CsGoMap";
import { NadeLight, MapCoordinates } from "../../nade-data/Nade/Nade";
import { NadeType } from "../../nade-data/Nade/NadeType";
import { Tickrate } from "../../nade-data/Nade/NadeTickrate";
import { NadeSortingMethod, MapView } from "./reducer";

type ReplaceNadesForMap = {
  type: "MapStore/ReplaceNadesForMap";
  map: CsgoMap;
  nades: NadeLight[];
};

type SetCurrentMap = {
  type: "MapStore/SetCurrentMap";
  map: CsgoMap;
};

type ToggleMapview = {
  type: "MapStore/ToggleMapView";
};

type FilterByCoordinates = {
  type: "MapStore/FilterByCoordinates";
  payload: MapCoordinates;
};

type FilterByType = {
  type: "MapStore/FilterByType";
  payload: NadeType;
};

type FilterToggleFavorites = {
  type: "MapStore/FilterToggleFavorites";
};

type FilterReset = {
  type: "MapStore/FilterReset";
};

type FilterByTickrate = {
  type: "MapStore/FilterByTickrate";
  tick: Tickrate;
};

type SetSortingMethod = {
  type: "MapStore/SetSortingMethod";
  method: NadeSortingMethod;
};

export type IncrementNadeFavoriteCount = {
  type: "MapStore/IncrementNadeFavoriteCount";
  nadeId: string;
};

export type DecrementNadeFavoriteCount = {
  type: "MapStore/DecrementNadeFavoriteCount";
  nadeId: string;
};

type SetView = {
  type: "MapStore/SetView";
  view: MapView;
};

type SetNadeForModal = {
  type: "MapStore/SetNadeForModal";
  id: NadeLight;
};

type ClearNadeModal = {
  type: "MapStore/ClearNadeModal";
};

type FilterToggleByPro = {
  type: "MapStore/FilterToggleByPro";
};

export type MapStoreActions =
  | SetCurrentMap
  | ReplaceNadesForMap
  | ToggleMapview
  | FilterByCoordinates
  | FilterByType
  | FilterToggleFavorites
  | FilterReset
  | FilterByTickrate
  | IncrementNadeFavoriteCount
  | DecrementNadeFavoriteCount
  | SetSortingMethod
  | SetView
  | SetNadeForModal
  | ClearNadeModal
  | FilterToggleByPro;
