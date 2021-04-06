import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFavorites } from "../../../favorites/data/hooks/useFavorites";
import { shownFavoriteHintSelector } from "../HintSelectors";
import { setShownFavoriteHintAction } from "../HintSlice";

export const useShouldFavoriteHint = () => {
  const dispatch = useDispatch();
  const favorites = useFavorites();
  const shownFavoriteHint = useSelector(shownFavoriteHintSelector);

  const setShownFavoriteHint = useCallback(() => {
    dispatch(setShownFavoriteHintAction());
  }, [dispatch]);

  const shouldDisplayFavoriteButtonHint = useMemo(() => {
    const favoriteCount = favorites.length;

    return favoriteCount > 0 && !shownFavoriteHint;
  }, [favorites, shownFavoriteHint]);

  return { shouldDisplayFavoriteButtonHint, setShownFavoriteHint };
};
