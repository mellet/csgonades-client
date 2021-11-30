import { useCallback, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useFavoritesV2 } from "../../../favorites/data/hooks/useFavoritesV2";

export const useShouldFavoriteHint = () => {
  const { favoritedNades } = useFavoritesV2();
  const [shownFavoriteHint, setShowFavoriteHint] = useLocalStorage(
    "shownFavoriteHint",
    false
  );

  const setShownFavoriteHint = useCallback(() => {
    setShowFavoriteHint(true);
  }, [setShowFavoriteHint]);

  const shouldDisplayFavoriteButtonHint = useMemo(() => {
    const favoriteCount = favoritedNades.length;

    return favoriteCount > 0 && !shownFavoriteHint;
  }, [favoritedNades, shownFavoriteHint]);

  return { shouldDisplayFavoriteButtonHint, setShownFavoriteHint };
};
