import useSWR from "swr";
import { NadeApi } from "../../nade/data/NadeApi";
import { GameMode } from "../../nade/models/GameMode";
import { NadeType } from "../../nade/models/NadeType";
import { CsMap } from "../models/CsGoMap";

async function fetcher(
  _url: string,
  csMap: CsMap,
  type: NadeType,
  gameMode: GameMode
) {
  const result = await NadeApi.getMapNadeLocations(csMap, gameMode, type);
  return result;
}

export const useMapNadeLocations = (
  map: CsMap,
  type: NadeType,
  gameMode: GameMode
) => {
  const { data, isValidating } = useSWR(
    ["mapNadeLocations", map, type, gameMode],
    fetcher
  );

  return {
    mapNadeLocations: data,
    isLoading: !data && isValidating,
  };
};
