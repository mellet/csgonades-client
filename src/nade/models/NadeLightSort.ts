import { NadeLight } from "./NadePartial";

export type NadeLightSort = keyof Pick<
  NadeLight,
  "score" | "viewCount" | "favoriteCount" | "createdAt"
>;
