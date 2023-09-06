import useSWR from "swr";
import { NadeApi } from "../../../nade/data/NadeApi";
import { DisplayNades } from "./NadeListViewModal";

async function fetcher(
  _url: string,
  startLocationId: string,
  endLocationId: string
) {
  const result = await NadeApi.getByStartAndEndLocation(
    startLocationId,
    endLocationId
  );
  return result;
}

export const useNadesForLocation = (displayNades: DisplayNades) => {
  const { data, isValidating } = useSWR(
    [
      "nadeForLocation",
      displayNades.mapStartLocationId,
      displayNades.mapEndLocationId,
    ],
    fetcher
  );

  return {
    nades: data,
    isLoading: !data && isValidating,
  };
};
