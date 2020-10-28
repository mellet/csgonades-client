import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../store";

export type TrackerState = {
  readonly numNadesVisited: number;
};

const initialState: TrackerState = {
  numNadesVisited: 0,
};

const slice = createSlice({
  name: "tracker",
  initialState,
  reducers: {
    incrementVisitedNades(state) {
      state.numNadesVisited += 1;
    },
  },
});

export const numNadesVisitedSelector = (state: AppState): number => {
  return state.trackerStore.numNadesVisited;
};

export const { incrementVisitedNades } = slice.actions;

export default slice.reducer;
