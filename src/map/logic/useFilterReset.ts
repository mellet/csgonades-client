import { useCallback, useMemo } from "react";
import { useFilterByPro } from "./useFilterByPro";
import { useFilterByTickrate } from "./useFilterByTickrate";
import { useFilterByFavorites } from "./useFilterByFavorites";
import { useFilterByType } from "./useFilterByType";
import { useFilterByTeam } from "./useFilterByTeam";
import { useSignedInUser } from "../../core/authentication/useSignedInUser";
import { useRouter } from "next/router";

export const useFilterReset = () => {
  const { signedInUser } = useSignedInUser();
  const { byPro, resetFilterByPro } = useFilterByPro();
  const { byTickrate } = useFilterByTickrate();
  const { byFavorites, resetFilterByFavorites } = useFilterByFavorites();
  const { byType } = useFilterByType();
  const { byTeam } = useFilterByTeam();
  const resetQueryFilters = useResetQueryFilters();

  const resetFilter = useCallback(() => {
    resetFilterByPro();
    resetFilterByFavorites();
    resetQueryFilters();
  }, [resetFilterByPro, resetFilterByFavorites, resetQueryFilters]);

  const canReset = useMemo(() => {
    const userDefaultTickrate = signedInUser?.defaultTick;

    if (byFavorites) {
      return true;
    }
    if (byTickrate !== "any" && userDefaultTickrate === undefined) {
      return true;
    }
    if (userDefaultTickrate && userDefaultTickrate !== byTickrate) {
      return true;
    }
    if (byType !== "smoke") {
      return true;
    }
    if (byPro) {
      return true;
    }
    if (byTeam !== "both") {
      return true;
    }

    return false;
  }, [byTickrate, byFavorites, byType, byPro, byTeam, signedInUser]);

  return {
    resetFilter,
    canReset,
  };
};

const useResetQueryFilters = () => {
  const router = useRouter();

  return useCallback(() => {
    const baseUrl = router.asPath
      .replace(/\?type=([^&#]*)/, "")
      .replace(/\&type=([^&#]*)/, "")
      .replace(/\?team=([^&#]*)/, "")
      .replace(/\&team=([^&#]*)/, "")
      .replace(/\?tickrate=([^&#]*)/, "")
      .replace(/\&tickrate=([^&#]*)/, "");
    router.replace(baseUrl, undefined, { shallow: true });
  }, [router]);
};
