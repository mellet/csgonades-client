import { NadeCreateBody } from "../../../models/NadeCreateBody";

export type NadeCreateSteps =
  | "video"
  | "info"
  | "map"
  | "resultImage"
  | "lineupImage"
  | "confirmStep";

export interface NadeAddState {
  currentStep: NadeCreateSteps;
  nadeData: Partial<NadeCreateBody>;
}

export const initialNadeAddState: NadeAddState = {
  currentStep: "video",
  nadeData: {
    type: "smoke",
    teamSide: "both",
    movement: "stationary",
    gameMode: "csgo",
  },
};
