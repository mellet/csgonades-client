import useSWR from "swr";
import { NadeApi } from "../../nade/data/NadeApi";
import { GameMode } from "../../nade/models/GameMode";
import { NadeType } from "../../nade/models/NadeType";
import { CsMap } from "../models/CsGoMap";
import { Tickrate } from "../../nade/models/NadeTickrate";
import { useFilterByTickrate } from "../logic/useFilterByTickrate";
import { useGameMode } from "../../core/useGameMode";

async function fetcher(
  _url: string,
  csMap: CsMap,
  type: NadeType,
  gameMode: GameMode,
  tickRate: Tickrate
) {
  const result = await NadeApi.getMapNadeLocations(
    csMap,
    gameMode,
    type,
    tickRate
  );
  return result;
}

export const useMapNadeLocations = (map: CsMap, type: NadeType) => {
  const { gameMode } = useGameMode();
  const { byTickrate } = useFilterByTickrate();

  const { data, isValidating } = useSWR(
    ["mapNadeLocations", map, type, gameMode, byTickrate],
    fetcher
  );

  return {
    mapNadeLocations: data,
    isLoading: !data && isValidating,
  };
};
