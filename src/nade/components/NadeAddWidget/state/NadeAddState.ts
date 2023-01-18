import { NadeCreateBody } from "../../../models/Nade";

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
  nadeData: {},
};
