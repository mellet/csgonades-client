import { FC, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { useIsSignedIn } from "../../../../core/authentication/useIsSignedIn";
import { useSignInWarning } from "../../../../core/global/hooks/useSignInWarning";
import { useTheme } from "../../../../core/settings/SettingsHooks";
import { useGa } from "../../../../utils/Analytics";

type Props = {
  nadeId: string;
  isFavorited?: boolean;
  favoriteCount: number;
  addAsFavorite: (nadeId: string) => void;
  removeAsFavorite: (nadeId: string) => void;
};

export const StatFavorite: FC<Props> = ({
  favoriteCount,
  isFavorited,
  nadeId,
  addAsFavorite,
  removeAsFavorite,
}) => {
  const ga = useGa();

  const { setSignInWarning } = useSignInWarning();

  const isSignedIn = useIsSignedIn();
  const [internalFavorited, setInternalFavorited] = useState(
    isFavorited || false
  );
  const [internalFavCount, setInternalFavCount] = useState(favoriteCount);
  const { colors } = useTheme();

  function onFavoriteClick() {
    if (!isSignedIn) {
      return setSignInWarning("favorite");
    }
    if (internalFavorited) {
      removeAsFavorite(nadeId);
      setInternalFavorited(false);
      setInternalFavCount(internalFavCount - 1);
      ga.event({
        category: "nade_item",
        action: "click_remove_favorite",
        label: nadeId,
      });
    } else {
      addAsFavorite(nadeId);
      setInternalFavorited(true);
      setInternalFavCount(internalFavCount + 1);
      ga.event({
        category: "nade_item",
        action: "click_add_favorite",
        label: nadeId,
      });
    }
  }

  return (
    <>
      <div className="stat-favorite">
        <Popup
          content={internalFavorited ? "Remove favorite" : "Favorite"}
          inverted
          position="top center"
          size="mini"
          trigger={
            <a className="fav-icon" onClick={onFavoriteClick}>
              <FaStar />
            </a>
          }
        />

        <span className="fav-count">{internalFavCount}</span>
      </div>
      <style jsx>{`
        .stat-favorite {
          display: inline-flex;
          align-items: center;
          font-size: 11px;
          line-height: 11px;
          height: 11px;
          font-weight: 400;
          color: ${colors.GREY};
        }

        .fav-icon {
          color: ${internalFavorited ? colors.FAV_YELLOW : colors.GREY};
          cursor: pointer;
        }

        .fav-icon:hover {
          color: ${internalFavorited ? colors.GREY : colors.FAV_YELLOW};
        }

        .fav-count {
          margin-left: 4px;
        }
      `}</style>
    </>
  );
};
