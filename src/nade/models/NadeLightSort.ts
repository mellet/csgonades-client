import { NadeLight } from "./NadeLight";

export type NadeLightSort = keyof Pick<
  NadeLight,
  "score" | "viewCount" | "favoriteCount" | "createdAt"
>;
