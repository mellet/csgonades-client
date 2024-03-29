import { NextRouter } from "next/router";
import { Tickrate } from "../../nade/models/NadeTickrate";
import { NadeType } from "../../nade/models/NadeType";
import { TeamSide } from "../../nade/models/TeamSide";
import { NadeLight } from "../../nade/models/NadePartial";

export function filterByPro(nades: NadeLight[], byPro?: boolean): NadeLight[] {
  if (byPro) {
    return nades.filter((n) => Boolean(n.proUrl) || n.isPro);
  }
  return nades;
}

export function filterByTeam(
  nades: NadeLight[],
  byTeam: TeamSide
): NadeLight[] {
  if (!byTeam || byTeam === "both") {
    return nades;
  } else {
    return nades.filter((n) => {
      return n.teamSide === byTeam || n.teamSide === "both";
    });
  }
}

export function filterByType(
  nades: NadeLight[],
  byType?: NadeType
): NadeLight[] {
  if (byType) {
    return nades.filter((n) => n.type === byType);
  } else {
    return nades;
  }
}

export function filterByFavorite(
  nades: NadeLight[],
  byFavorite: boolean
): NadeLight[] {
  if (!byFavorite) {
    return nades;
  }

  return nades.filter((n) => n.isFavorited);
}

export function filterByTickrate(
  nades: NadeLight[],
  byTickrate: Tickrate
): NadeLight[] {
  if (byTickrate === "tick128") {
    return nades.filter((n) => n.tickrate !== "tick64");
  } else if (byTickrate === "tick64") {
    return nades.filter((n) => n.tickrate !== "tick128");
  } else {
    return nades;
  }
}

export function addFavoriteToNades(
  nades: NadeLight[],
  favIds: string[]
): NadeLight[] {
  return nades.map((n) => {
    if (favIds.includes(n.id)) {
      return {
        ...n,
        isFavorited: true,
      };
    } else {
      return n;
    }
  });
}

export function setQueryParameter(
  router: NextRouter,
  key: string,
  value: string
) {
  router.replace(
    {
      query: {
        ...router.query,
        [key]: value,
      },
    },
    undefined,
    { shallow: true }
  );
}
