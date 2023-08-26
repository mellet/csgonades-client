import useSWR from "swr";
import { CsMap } from "../models/CsGoMap";
import { MapLocationApi } from "./NadeLocationApi";
import { useCallback } from "react";
import {
  NadeStartLocationCreate,
  NadeStartLocationUpdate,
} from "../models/NadeStartLocation";

async function fetcher(_url: string, csMap: CsMap) {
  const result = await MapLocationApi.getMapStartLocation(csMap);
  return result.data;
}

export const useMapStartLocations = (csMap: CsMap) => {
  const { data, isValidating, mutate } = useSWR(
    ["mapStartLocation", csMap],
    fetcher
  );

  const isLoading = !data && isValidating;

  const addMapStartLocation = useCallback(
    async (newMapStartLocation: NadeStartLocationCreate) => {
      await MapLocationApi.addMapStartLocation(newMapStartLocation);
      mutate();
    },
    [mutate]
  );

  const updateMapStartLocation = useCallback(
    async (mapStartLocation: NadeStartLocationUpdate) => {
      await MapLocationApi.updateNadeLocation(mapStartLocation);
      mutate();
    },
    [mutate]
  );

  return {
    isLoading,
    mapLocations: data || [],
    addMapStartLocation,
    updateMapStartLocation,
  };
};
