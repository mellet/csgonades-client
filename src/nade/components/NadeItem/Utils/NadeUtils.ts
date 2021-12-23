import { NadeLight } from "../../../models/Nade";

export function getNadeLineUpImage(nade: NadeLight) {
  return nade.imageLineup?.url;
}

export function getNadeMainImage(nade: NadeLight) {
  return nade.imageMain?.url || "";
}

export function getNadeLineUpImageThumb(nade: NadeLight) {
  return nade.imageLineupThumb?.url;
}
