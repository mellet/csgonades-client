import { FC, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { useTheme } from "styled-components";
import { useIsSignedIn } from "../../../../core/authentication/useIsSignedIn";
import { useGa } from "../../../../utils/Analytics";
import { useNadeFavoriteActions } from "../../../data/useNadeFavoriteActions";

type Props = {
  nadeId: string;
  isFavorited?: boolean;
  favoriteCount: number;
};

export const StatFavorite: FC<Props> = ({
  favoriteCount,
  isFavorited,
  nadeId,
}) => {
  const ga = useGa();

  const isSignedIn = useIsSignedIn();
  const [internalFavorited, setInternalFavorited] = useState(
    isFavorited || false
  );
  const [internalFavCount, setInternalFavCount] = useState(favoriteCount);
  const { addFavorite, unFavorite } = useNadeFavoriteActions();
  const { colors } = useTheme();

  function onFavoriteClick() {
    if (internalFavorited) {
      if (isSignedIn) {
        setInternalFavorited(false);
        setInternalFavCount(internalFavCount - 1);
        ga.event({
          category: "nade_item",
          action: "click_remove_favorite",
          label: nadeId,
        });
      }
      unFavorite(nadeId);
    } else {
      if (isSignedIn) {
        setInternalFavorited(true);
        setInternalFavCount(internalFavCount + 1);
        ga.event({
          category: "nade_item",
          action: "click_add_favorite",
          label: nadeId,
        });
      }
      addFavorite(nadeId);
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
