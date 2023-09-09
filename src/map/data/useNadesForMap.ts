import useSWR from "swr";
import { NadeApi } from "../../nade/data/NadeApi";
import { NadeType } from "../../nade/models/NadeType";
import { useFilterByType } from "../logic/useFilterByType";
import { CsMap } from "../models/CsGoMap";
import { GameMode } from "../../nade/models/GameMode";
import { useGameMode } from "../../core/useGameMode";

async function nadeForMapFetcher(
  _url: string,
  mapName: CsMap,
  gameMode: GameMode,
  nadeType: NadeType
) {
  return NadeApi.getByMap(mapName, gameMode, nadeType);
}

export const useNadesForMapFromApi = (mapName: CsMap) => {
  const { byType } = useFilterByType();
  const { gameMode } = useGameMode();

  const { data, isValidating } = useSWR(
    ["map", mapName, gameMode, byType],
    nadeForMapFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const nades = data || [];

  return {
    nades: nades,
    isLoading: !data && isValidating,
  };
};
