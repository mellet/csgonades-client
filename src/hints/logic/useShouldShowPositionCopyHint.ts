import { useCallback } from "react";
import { useLocalStorage } from "../../utils/useLocalStorage";

export const useShouldShowPositionCopyHint = () => {
  const [shownPositionCopyHint, setShowPositionCopyHint] = useLocalStorage(
    "shownPositionCopyHint",
    false
  );

  const setShownPositionCopyHint = useCallback(() => {
    setShowPositionCopyHint(true);
  }, [setShowPositionCopyHint]);

  return { shownPositionCopyHint, setShownPositionCopyHint };
};
