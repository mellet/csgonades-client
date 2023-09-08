import { useCallback } from "react";
import { Tickrate } from "../../nade/models/NadeTickrate";
import { useSignedInUser } from "../../core/authentication/useSignedInUser";
import { setQueryParameter } from "./helpers";
import { useRouter } from "next/router";

type QueryTickrate = "128" | "64" | "any";

export const useFilterByTickrate = () => {
  const router = useRouter();
  const { signedInUser } = useSignedInUser();
  const defaultTickrate: Tickrate = signedInUser?.defaultTick || "any";
  const byTickrate = useQueryNadeTick(defaultTickrate);

  const filterByTickrate = useCallback(
    (tick: Tickrate) => {
      setQueryParameter(router, "tickrate", convertTickrateToQuerySting(tick));
    },
    [router]
  );

  return {
    byTickrate,
    filterByTickrate,
  };
};

const useQueryNadeTick = (defaultTick: Tickrate): Tickrate => {
  const { query } = useRouter();

  if (!query.tickrate) {
    return defaultTick;
  }

  const queryTickRate = query.tickrate as QueryTickrate;

  switch (queryTickRate) {
    case "128":
      return "tick128";
    case "64":
      return "tick64";
    default:
      return "any";
  }
};

const convertTickrateToQuerySting = (tickrate: Tickrate): QueryTickrate => {
  if (tickrate === "tick128") {
    return "128";
  } else if (tickrate === "tick64") {
    return "64";
  } else {
    return "any";
  }
};
