import useSWR from "swr";
import { NadeApi } from "../../nade/data/NadeApi";
import { NadeLight } from "../../nade/models/Nade";
import { NadeType } from "../../nade/models/NadeType";
import { endMeasurement, startMeasurement } from "../../utils/Instrumentation";
import { useFilterByType } from "../logic/useFilterByType";
import { CsgoMap } from "../models/CsGoMap";

async function nadeForMapFetcher(
  _url: string,
  mapName: CsgoMap,
  nadeType: NadeType
) {
  const start = startMeasurement("getByMap", "NadeApi");
  const result = await NadeApi.getByMap(mapName, nadeType);
  endMeasurement(start);

  if (result.isOk()) {
    return result.value;
  } else {
    throw result.error;
  }
}

export const useNadesForMapFromApi = (
  mapName: CsgoMap,
  fallback: NadeLight[]
) => {
  const { byType } = useFilterByType();

  const { data, isValidating } = useSWR(
    ["map", mapName, byType],
    nadeForMapFetcher,
    {
      revalidateOnFocus: false,
      fallbackData: byType === "smoke" && fallback,
    }
  );

  const nades = data || [];

  return {
    nades: nades,
    isLoading: !data && isValidating,
  };
};
