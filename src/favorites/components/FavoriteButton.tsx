import { FC, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSignInWarning } from "../../core/global/hooks/useSignInWarning";
import { useIsSignedIn } from "../../core/authentication/useIsSignedIn";
import { SquareButton } from "../../shared-components/buttons/IconButton/IconButton";
import { Tooltip } from "../../shared-components/Tooltip/Tooltip";
import { useGa } from "../../utils/Analytics";
import { useFavorites, useIsNadeFavorited } from "../data/useFavorites";
import { useTheme } from "../../core/settings/SettingsHooks";

type Props = {
  nadeId: string;
  favoriteCount: number;
};

export const FavoriteButton: FC<Props> = ({ nadeId, favoriteCount }) => {
  const { addNadeAsFavorite, removeNadeAsFavorite } = useFavorites();
  const { colors } = useTheme();
  const ga = useGa();
  const [internalFavCount, setInternalFavoriteCount] = useState(favoriteCount);
  const { setSignInWarning } = useSignInWarning();
  const isSignedIn = useIsSignedIn();
  const isFavorited = useIsNadeFavorited(nadeId);
  const [optimisticIsFavorites, setOptimisticIsFavorited] =
    useState(isFavorited);

  useEffect(() => {
    if (isFavorited) {
      setOptimisticIsFavorited(true);
    } else {
      setOptimisticIsFavorited(false);
    }
  }, [isFavorited]);

  function onFavoriteClick() {
    if (!isSignedIn) {
      return setSignInWarning("favorite");
    }

    if (isFavorited) {
      ga.event({
        category: "nade_page",
        action: "click_remove_favorite",
        label: nadeId,
      });
      removeNadeAsFavorite(nadeId);
      setInternalFavoriteCount(internalFavCount - 1);
      setOptimisticIsFavorited(false);
    } else {
      ga.event({
        category: "nade_page",
        action: "click_add_favorite",
        label: nadeId,
      });
      addNadeAsFavorite(nadeId);
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
