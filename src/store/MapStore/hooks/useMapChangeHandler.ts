import { useEffect } from "react";
import { useRouter } from "next/router";
import { CsgoMap } from "../../../nade-data/Nade/CsGoMap";
import { useReplaceNadesForMap } from "./useReplaceNadesForMap";
import { NadeLight } from "../../../nade-data/Nade/Nade";
import { useDispatch } from "react-redux";
import { setCurrentMapAction } from "../slice";

export const useMapChangeHandler = (nades: NadeLight[]): void => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const replaceNadesForMap = useReplaceNadesForMap();

  useEffect(() => {
    const csGoMap = query.map as CsgoMap;

    if (!csGoMap) {
      return;
    }

    replaceNadesForMap(csGoMap, nades);
  }, [query, nades, replaceNadesForMap]);

  useEffect(() => {
    const csGoMap = query.map as CsgoMap;

    if (!csGoMap) {
      return;
    }

    dispatch(setCurrentMapAction(csGoMap));
  }, [query, dispatch]);
};
