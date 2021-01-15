import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { CsgoMap } from "../../models/CsGoMap";
import { NadeLight } from "../../../nade/models/Nade";
import { replaceNadesForMapAction } from "../slice";

export const useReplaceNadesForMap = () => {
  const dispatch = useDispatch();

  const replaceNadesForMap = useCallback(
    (map: CsgoMap, nades: NadeLight[]) =>
      dispatch(replaceNadesForMapAction({ map, nades })),
    [dispatch]
  );

  return replaceNadesForMap;
};
