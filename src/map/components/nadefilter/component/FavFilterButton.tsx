import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { useIsSignedIn } from "../../../../core/authentication/useIsSignedIn";
import { useTheme } from "../../../../core/settings/SettingsHooks";
import { useFilterByFavorites } from "../../../data/hooks/useFilterByFavorites";
import { useSignInWarning } from "../../../../core/global/hooks/useSignInWarning";
import { SquareButton } from "../../../../shared-components/buttons/IconButton";
import { FilterLabel } from "./FilterLabel";
import { FavoriteHint } from "../../../../hints/components/FavoriteHint";

type Props = {
  vertical?: boolean;
};

export const FavFilterButton: FC<Props> = ({ vertical }) => {
  const { colors } = useTheme();
  const isSignedIn = useIsSignedIn();
  const { byFavorites, toggleFilterByFavorites } = useFilterByFavorites();
  const { setSignInWarning } = useSignInWarning();

  function onFilterByFavorite() {
    if (isSignedIn) {
      toggleFilterByFavorites();
    } else {
      setSignInWarning("favorite");
    }
  }

  return (
    <>
      <FilterLabel value="FAV" center={vertical} />
      <FavoriteHint>
        <SquareButton
          onClick={onFilterByFavorite}
          activeColor={colors.FAV_YELLOW}
          icon={<FaStar />}
          active={byFavorites}
        />
      </FavoriteHint>
    </>
  );
};
