import useSWR from "swr";
import { GameMode } from "../models/GameMode";
import { NadeApi } from "./NadeApi";

async function recentNadesFetcher(gameMode: GameMode) {
  const result = await NadeApi.getRecent(gameMode);

  if (result.isOk()) {
    return result.value;
  } else {
    throw result.error;
  }
}

export const useRecentNades = (gameMode: GameMode) => {
  const { data, isValidating } = useSWR([gameMode], recentNadesFetcher, {
    revalidateOnFocus: false,
  });

  return {
    recentNades: data || [],
    isLoading: isValidating,
  };
};
