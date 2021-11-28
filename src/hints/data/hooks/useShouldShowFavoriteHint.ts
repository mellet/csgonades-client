import { useCallback, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useFavorites } from "../../../favorites/data/hooks/useFavorites";

export const useShouldFavoriteHint = () => {
  const favorites = useFavorites();
  const [shownFavoriteHint, setShowFavoriteHint] = useLocalStorage(
    "shownFavoriteHint",
    false
  );

  const setShownFavoriteHint = useCallback(() => {
    setShowFavoriteHint(true);
  }, [setShowFavoriteHint]);

  const shouldDisplayFavoriteButtonHint = useMemo(() => {
    const favoriteCount = favorites.length;

    return favoriteCount > 0 && !shownFavoriteHint;
  }, [favorites, shownFavoriteHint]);

  return { shouldDisplayFavoriteButtonHint, setShownFavoriteHint };
};
