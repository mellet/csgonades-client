import { AppState } from "../../core/store/rootReducer";

export const allNadesSelector = (state: AppState) => state.mapStore.nadeForMap;

export const currentMapSelector = (state: AppState) =>
  state.mapStore.currentMap;

export const filterByTypeSelector = (state: AppState) =>
  state.mapStore.filterByType;

export const filterByTickrateSelector = (state: AppState) =>
  state.mapStore.filterByTickrate;

export const filterByTeamSelector = (state: AppState) =>
  state.mapStore.filterByTeam;

export const filterByFavoritesSelector = (state: AppState) =>
  state.mapStore.filterByFavorites;

export const filterByMethodSelector = (state: AppState) =>
  state.mapStore.sortingMethod;

export const mapViewSelector = (state: AppState) => state.mapStore.view;

export const filterByProSelector = (state: AppState) =>
  state.mapStore.filterByPro;
