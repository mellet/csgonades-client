import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

export const useShouldShowGameModeHint = () => {
  const [shouldShownGameModeHint, setShownGameModeHint] = useLocalStorage(
    "showGameModeHint",
    true
  );

  const setHasShownGameModeHint = useCallback(() => {
    setShownGameModeHint(false);
  }, [setShownGameModeHint]);

  return { shouldShownGameModeHint, setHasShownGameModeHint };
};
