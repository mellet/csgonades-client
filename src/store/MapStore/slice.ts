import { NadeLight } from "../../nade-data/Nade/Nade";
import { CsgoMap } from "../../nade-data/Nade/CsGoMap";
import { NadeType } from "../../nade-data/Nade/NadeType";
import { Tickrate } from "../../nade-data/Nade/NadeTickrate";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NadesForMap = { [key: string]: NadeLight[] | undefined };

export type NadeSortingMethod = "hot" | "new" | "top";

export type MapView = "overview" | "list";

export type MapStoreState = {
  currentMap?: CsgoMap;
  filterByFavorites: boolean;
  filterByPro?: boolean;
  filterByTickrate: Tickrate;
  filterByType?: NadeType;
  nadeForMap: NadesForMap;
  sortingMethod: NadeSortingMethod;
  suggestedNades?: NadeLight[];
  view: MapView;
};

const initialState: MapStoreState = {
  filterByFavorites: false,
  filterByPro: false,
  filterByTickrate: "any",
  filterByType: "smoke",
  nadeForMap: {},
  sortingMethod: "hot",
  view: "overview",
};

const mapStore = createSlice({
  name: "MapStore",
  initialState,
  reducers: {
    setMapViewAction(state, action: PayloadAction<MapView>) {
      state.view = action.payload;
    },
    setSortingMethodAction(state, action: PayloadAction<NadeSortingMethod>) {
      state.sortingMethod = action.payload;
    },
    replaceNadesForMapAction(
      state,
      action: PayloadAction<{ map: CsgoMap; nades: NadeLight[] }>
    ) {
      const { map, nades } = action.payload;
      state.nadeForMap[map] = nades;
    },
    setCurrentMapAction(state, action: PayloadAction<CsgoMap>) {
      state.currentMap = action.payload;
    },
    resetFilterAction(state) {
      state.filterByFavorites = false;
      state.filterByTickrate = "any";
      state.filterByType = "smoke";
      state.filterByPro = false;
    },
    filterByTickrateAction(state, action: PayloadAction<Tickrate>) {
      state.filterByTickrate = action.payload;
    },
    filterByTypeAction(state, action: PayloadAction<NadeType>) {
      state.filterByType = action.payload;
    },
    toggleFavoritesAction(state) {
      state.filterByFavorites = !state.filterByFavorites;
    },
    toggleProNadesAction(state) {
      state.filterByPro = !state.filterByPro;
    },
    setSuggestedNades(state, action: PayloadAction<NadeLight[]>) {
      state.suggestedNades = action.payload;
    },
  },
});

export const {
  filterByTickrateAction,
  filterByTypeAction,
  replaceNadesForMapAction,
  resetFilterAction,
  setCurrentMapAction,
  setMapViewAction,
  setSortingMethodAction,
  toggleFavoritesAction,
  toggleProNadesAction,
} = mapStore.actions;

const persistConfig: PersistConfig<MapStoreState> = {
  key: "MapStore",
  storage,
  whitelist: ["view"],
};

export const MapStoreReducer = persistReducer(persistConfig, mapStore.reducer);
