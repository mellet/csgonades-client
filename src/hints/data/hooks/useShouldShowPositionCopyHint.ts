import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shownPositionCopyHintSelctor } from "../HintSelectors";
import { setShownPositionCopyHintAction } from "../HintSlice";

export const useShouldShowPositionCopyHint = () => {
  const dispatch = useDispatch();
  const shownPositionCopyHint = useSelector(shownPositionCopyHintSelctor);

  const setShownPositionCopyHint = useCallback(() => {
    dispatch(setShownPositionCopyHintAction());
  }, [dispatch]);

  return { shownPositionCopyHint, setShownPositionCopyHint };
};
