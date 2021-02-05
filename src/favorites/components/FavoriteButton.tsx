import { FC, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSignInWarning } from "../../core/global/hooks/useSignInWarning";
import { useIsFavoriteInProgress } from "../data/hooks/useIsFavoriteInProgress";
import { useIsSignedIn } from "../../core/authentication/useIsSignedIn";
import { useIsFavorited } from "../data/hooks/useIsFavorited";
import { useAddFavorite } from "../data/hooks/useAddFavorite";
import { useUnfavorite } from "../data/hooks/useUnFavorite";
import { IconButton } from "../../shared-components/buttons/IconButton";

type Props = {
  nadeId: string;
  favoriteCount: number;
};

export const FavoriteButton: FC<Props> = ({ nadeId, favoriteCount }) => {
  const [internalFavCount, setInternalFavoriteCount] = useState(favoriteCount);
  const { setSignInWarning } = useSignInWarning();
  const isFavoriteInProgress = useIsFavoriteInProgress();
  const isSignedIn = useIsSignedIn();
  const favorite = useIsFavorited(nadeId);
  const addFavorite = useAddFavorite();
  const unFavorite = useUnfavorite();
  const isFavorited = favorite;

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
    } else {
      addFavorite(nadeId);
      setInternalFavoriteCount(internalFavCount + 1);
    }
  }

  return (
    <IconButton
      icon={<FaStar />}
      active={!!isFavorited}
      onClick={onFavoriteClick}
      activeColor="orange"
      labelCount={internalFavCount}
    />
  );
};
