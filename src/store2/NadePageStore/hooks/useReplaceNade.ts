import { useCallback, useContext } from "react";
import { Nade } from "../../../nade-data/Nade/Nade";
import { NadePageStoreContext } from "../context";

export const useReplaceNade = () => {
  const { dispatch } = useContext(NadePageStoreContext);

  const decrementNadeFavCount = useCallback(
    (nade: Nade) => {
      dispatch({ type: "@@nades/REPLACE_NADE", nade });
    },
    [dispatch]
  );

  return decrementNadeFavCount;
};
