import useSWR from "swr";
import { NadeApi } from "../../nade/data/NadeApi";
import { NadeType } from "../../nade/models/NadeType";
import { endMeasurement, startMeasurement } from "../../utils/Instrumentation";
import { useFilterByType } from "../logic/useFilterByType";
import { CsgoMap } from "../models/CsGoMap";
import { GameMode } from "../../nade/models/GameMode";
import { useGameMode } from "../../core/useGameMode";

async function nadeForMapFetcher(
  _url: string,
  mapName: CsgoMap,
  gameMode: GameMode,
  nadeType: NadeType
) {
  const start = startMeasurement("getByMap", "NadeApi");
  const result = await NadeApi.getByMap(mapName, gameMode, nadeType);
  endMeasurement(start);

  if (result.isOk()) {
    return result.value;
  } else {
    throw result.error;
  }
}

export const useNadesForMapFromApi = (mapName: CsgoMap) => {
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
