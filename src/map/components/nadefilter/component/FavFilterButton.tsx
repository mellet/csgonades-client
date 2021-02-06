import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { useIsSignedIn } from "../../../../core/authentication/useIsSignedIn";
import { useTheme } from "../../../../core/settings/SettingsHooks";
import { useFilterByFavorites } from "../../../data/hooks/useFilterByFavorites";
import { useSignInWarning } from "../../../../core/global/hooks/useSignInWarning";
import { IconButton } from "../../../../shared-components/buttons/IconButton";
import { FilterLabel } from "./FilterLabel";

type Props = {
  vertical?: boolean;
};

export const FavFilterButton: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const isSignedIn = useIsSignedIn();
  const { byFavorites, filterByFavorites } = useFilterByFavorites();
  const { setSignInWarning } = useSignInWarning();

  function onFilterByFavorite() {
    if (isSignedIn) {
      filterByFavorites();
    } else {
      setSignInWarning("favorite");
    }
  }

  return (
    <>
      <FilterLabel value="FAV" />
      <IconButton
        onClick={onFilterByFavorite}
        activeColor={colors.FAV_YELLOW}
        icon={<FaStar />}
        active={byFavorites}
      />
    </>
  );
};
