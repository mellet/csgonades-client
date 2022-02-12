import { useCallback, useMemo } from "react";
import { useFavorites } from "../../favorites/data/useFavorites";
import { useLocalStorage } from "../../utils/useLocalStorage";

export const useShouldFavoriteHint = () => {
  const { favoritedNades } = useFavorites();
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
