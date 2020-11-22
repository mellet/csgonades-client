import { useMapStoreDispatch } from "./helpers";
import { useCallback } from "react";
import { CsgoMap } from "../../../nade-data/Nade/CsGoMap";
import { NadeLight } from "../../../nade-data/Nade/Nade";

export const useReplaceNadesForMap = () => {
  const dispatch = useMapStoreDispatch();

  const replaceNadesForMap = useCallback(
    (map: CsgoMap, nades: NadeLight[]) =>
      dispatch({ type: "MapStore/ReplaceNadesForMap", map, nades }),
    [dispatch]
  );

  return replaceNadesForMap;
};
