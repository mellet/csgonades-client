import { useMemo } from "react";
import { useIsAdmin } from "../../../../core/authentication/useIsAdmin";
import { dateDaysAgo } from "../../../../utils/DateUtils";
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

export function useIsLowEngagementNade(
  favoriteCount: number,
  viewCount: number,
  created: Date | string
) {
  const isAdmin = useIsAdmin();

  const isLowEngagementNade = useMemo(() => {
    const isOldEnough = dateDaysAgo(created) > 60;

    if (!isAdmin || !isOldEnough) {
      return false;
    }

    const popFactor = viewCount / 1000 / favoriteCount;

    return popFactor > 1.5;
  }, [favoriteCount, viewCount, created, isAdmin]);

  return isLowEngagementNade;
}
