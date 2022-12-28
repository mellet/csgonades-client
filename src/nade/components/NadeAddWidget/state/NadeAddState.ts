import { NadeCreateBody } from "../../../models/Nade";

export type NadeCreateSteps =
  | "typeStep"
  | "mapStep"
  | "videoStep"
  | "titleDescriptionStep"
  | "resultImgStep"
  | "lineupImgStep"
  | "metaStep"
  | "proStep"
  | "confirmStep";

export interface NadeAddState {
  currentStep: NadeCreateSteps;
  nadeData: Partial<NadeCreateBody>;
}

export const initialNadeAddState: NadeAddState = {
  currentStep: "typeStep",
  nadeData: {},
};
