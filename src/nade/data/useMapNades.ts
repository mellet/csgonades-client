import useSWR from "swr";
import { CsgoMap } from "../../map/models/CsGoMap";
import { NadeLight } from "../models/Nade";
import { NadeApi } from "./NadeApi";

async function fetcher(map: CsgoMap) {
  console.log("# Refetching nades", map);
  const mapNadesResult = await NadeApi.getByMap(map);

  if (mapNadesResult.isOk()) {
    return mapNadesResult.value;
  } else {
    throw Error(mapNadesResult.error.message);
  }
}

export const useMapNades = (initialNades: NadeLight[], map: CsgoMap) => {
  const refreshDelay = 5 * 60 * 1000;

  const { data, error } = useSWR(map, fetcher, {
    initialData: initialNades,
    dedupingInterval: refreshDelay,
    errorRetryCount: 3,
  });

  return {
    nades: data,
    error,
  };
};
