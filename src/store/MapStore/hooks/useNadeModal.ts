import { useSelector } from "react-redux";
import { nadeIdForModalSelector } from "../selectors";
import { useCallback } from "react";
import { useMapStoreDispatch } from "./helpers";
import { NadeLight } from "../../../nade-data/Nade/Nade";

type UseNadeModalReturn = {
  nadeForModal?: NadeLight;
  clearNadeForModal: () => void;
  setNadeForModal: (nade: NadeLight) => void;
};

export const useNadeModal = (): UseNadeModalReturn => {
  const dispatch = useMapStoreDispatch();
  const nadeForModal = useSelector(nadeIdForModalSelector);

  const setNadeForModal = useCallback(
    (id: NadeLight) => {
      dispatch({
        type: "MapStore/SetNadeForModal",
        id,
      });
    },
    [dispatch]
  );

  const clearNadeForModal = useCallback(() => {
    dispatch({
      type: "MapStore/ClearNadeModal",
    });
  }, [dispatch]);

  return {
    nadeForModal,
    clearNadeForModal,
    setNadeForModal,
  };
};
