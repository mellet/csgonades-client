import { FC, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSignInWarning } from "../../core/global/hooks/useSignInWarning";
import { useIsFavoriteInProgress } from "../data/hooks/useIsFavoriteInProgress";
import { useIsSignedIn } from "../../core/authentication/useIsSignedIn";
import { useIsFavorited } from "../data/hooks/useIsFavorited";
import { useAddFavorite } from "../data/hooks/useAddFavorite";
import { useUnfavorite } from "../data/hooks/useUnFavorite";
import { IconButton } from "../../shared-components/buttons/IconButton";
import { useTheme } from "styled-components";
import { Tooltip } from "../../shared-components/Tooltip/Tooltip";

type Props = {
  nadeId: string;
  favoriteCount: number;
};

export const FavoriteButton: FC<Props> = ({ nadeId, favoriteCount }) => {
  const { colors } = useTheme();
  const [internalFavCount, setInternalFavoriteCount] = useState(favoriteCount);
  const { setSignInWarning } = useSignInWarning();
  const isFavoriteInProgress = useIsFavoriteInProgress();
  const isSignedIn = useIsSignedIn();
  const favorite = useIsFavorited(nadeId);
  const [optimisticIsFavorites, setOptimisticIsFavorited] = useState(
    !!favorite
  );
  const addFavorite = useAddFavorite();
  const unFavorite = useUnfavorite();

  useEffect(() => {
    if (favorite) {
      setOptimisticIsFavorited(true);
    } else {
      setOptimisticIsFavorited(false);
    }
  }, [favorite]);

  function onFavoriteClick() {
    if (!isSignedIn) {
      return setSignInWarning("favorite");
    }

    if (isFavoriteInProgress) {
      return;
    }

    if (favorite) {
      unFavorite(favorite.id);
      setInternalFavoriteCount(internalFavCount - 1);
      setOptimisticIsFavorited(false);
    } else {
      addFavorite(nadeId);
      setInternalFavoriteCount(internalFavCount + 1);
      setOptimisticIsFavorited(true);
    }
  }

  return (
    <Tooltip message="Favorite" direction="bottom">
      <IconButton
        icon={<FaStar />}
        active={optimisticIsFavorites}
        onClick={onFavoriteClick}
        activeColor={colors.FAV_YELLOW}
        labelCount={internalFavCount}
      />
    </Tooltip>
  );
};
