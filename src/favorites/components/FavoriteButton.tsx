import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { useSignInWarning } from "../../store/GlobalStore/hooks/useSignInWarning";
import { useIsFavoriteInProgress } from "../data/hooks/useIsFavoriteInProgress";
import { useIsSignedIn } from "../../core/authentication/useIsSignedIn";
import { useIsFavorited } from "../data/hooks/useIsFavorited";
import { useAddFavorite } from "../data/hooks/useAddFavorite";
import { useUnfavorite } from "../data/hooks/useUnFavorite";
import { Dimensions } from "../../constants/Constants";

type Props = {
  nadeId: string;
};

export const FavoriteButton: FC<Props> = ({ nadeId }) => {
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
    } else {
      addFavorite(nadeId);
    }
  }

  const color = isFavorited ? "#f5e342" : "white";
  const tooltipText = isFavorited ? "Unfavorite" : "Favorite";

  return (
    <>
      <button
        onClick={onFavoriteClick}
        disabled={isFavoriteInProgress}
        className="favorite"
      >
        <FaStar />
        <span>{tooltipText}</span>
      </button>

      <style jsx>{`
        .favorite {
          background: #d4a900;
          color: ${color};
          border: none;
          border-radius: 5px;
          padding: 10px 16px;
          cursor: pointer;
          font-size: 15px;
          outline: none;
          margin-right: ${Dimensions.GUTTER_SIZE}px;
          flex: 1;
          display: flex;
          align-items: center;
        }

        .favorite span {
          margin-left: 6px;
        }
      `}</style>
    </>
  );
};
