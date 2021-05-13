import { FC, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSignInWarning } from "../../core/global/hooks/useSignInWarning";
import { useIsFavoriteInProgress } from "../data/hooks/useIsFavoriteInProgress";
import { useIsSignedIn } from "../../core/authentication/useIsSignedIn";
import { useIsFavorited } from "../data/hooks/useIsFavorited";
import { SquareButton } from "../../shared-components/buttons/IconButton";
import { useTheme } from "styled-components";
import { Tooltip } from "../../shared-components/Tooltip/Tooltip";
import { useGa } from "../../utils/Analytics";
import { useNadeFavoriteActions } from "../../nade/data/useNadeFavoriteActions";

type Props = {
  nadeId: string;
  favoriteCount: number;
};

export const FavoriteButton: FC<Props> = ({ nadeId, favoriteCount }) => {
  const { colors } = useTheme();
  const ga = useGa();
  const [internalFavCount, setInternalFavoriteCount] = useState(favoriteCount);
  const { setSignInWarning } = useSignInWarning();
  const isFavoriteInProgress = useIsFavoriteInProgress();
  const isSignedIn = useIsSignedIn();
  const favorite = useIsFavorited(nadeId);
  const [optimisticIsFavorites, setOptimisticIsFavorited] = useState(
    !!favorite
  );
  const { addFavorite, unFavorite } = useNadeFavoriteActions();

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
      ga.event({
        category: "nade_page",
        action: "click_remove_favorite",
        label: nadeId,
      });
      unFavorite(nadeId);
      setInternalFavoriteCount(internalFavCount - 1);
      setOptimisticIsFavorited(false);
    } else {
      ga.event({
        category: "nade_page",
        action: "click_add_favorite",
        label: nadeId,
      });
      addFavorite(nadeId);
      setInternalFavoriteCount(internalFavCount + 1);
      setOptimisticIsFavorited(true);
    }
  }

  return (
    <Tooltip message="Favorite" direction="right">
      <SquareButton
        icon={<FaStar />}
        active={optimisticIsFavorites}
        onClick={onFavoriteClick}
        activeColor={colors.FAV_YELLOW}
        labelCount={internalFavCount}
      />
    </Tooltip>
  );
};
