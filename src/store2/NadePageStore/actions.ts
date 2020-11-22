import { Nade } from "../../nade-data/Nade/Nade";

export type OnFavoriteNadeAction = {
  type: "@@nades/ON_FAVORITE_NADE";
};

export type OnUnFavoriteNadeAction = {
  type: "@@nades/ON_UNFAVORITE_NADE";
};

export type ReplaceNade = {
  type: "@@nades/REPLACE_NADE";
  nade: Nade;
};

export type NadeActions =
  | OnFavoriteNadeAction
  | OnUnFavoriteNadeAction
  | ReplaceNade;
