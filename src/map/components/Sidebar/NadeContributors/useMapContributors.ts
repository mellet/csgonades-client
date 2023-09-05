import useSWR from "swr";
import { useGameMode } from "../../../../core/useGameMode";
import { CsMap } from "../../../models/CsGoMap";
import { GameMode } from "../../../../nade/models/GameMode";
import { NadeApi } from "../../../../nade/data/NadeApi";

async function fetcher(_url: string, csMap: CsMap, gameMode: GameMode) {
  const result = await NadeApi.getMapContributors(csMap, gameMode);

  return result.data;
}

export const useMapContributors = (csMap: CsMap) => {
  const { gameMode } = useGameMode();

  const { data, isValidating } = useSWR(
    ["contributors", csMap, gameMode],
    fetcher
  );

  return {
    contributors: data || [],
    isLoading: !data && isValidating,
  };
};
