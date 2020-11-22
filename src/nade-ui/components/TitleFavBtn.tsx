import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { useSignInWarning } from "../../store/GlobalStore/hooks/useSignInWarning";
import { useIsFavoriteInProgress } from "../../store/FavoriteStore/hooks/useIsFavoriteInProgress";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import { useIsFavorited } from "../../store/FavoriteStore/hooks/useIsFavorited";
import { useAddFavorite } from "../../store/FavoriteStore/hooks/useAddFavorite";
import { useUnfavorite } from "../../store/FavoriteStore/hooks/useUnFavorite";
import { Popup } from "semantic-ui-react";
import { useNadeModal } from "../../store/MapStore/hooks/useNadeModal";

type Props = {
  nadeId: string;
};

export const TitleFavBtn: FC<Props> = ({ nadeId }) => {
  const { clearNadeForModal } = useNadeModal();
  const { setSignInWarning } = useSignInWarning();
  const isFavoriteInProgress = useIsFavoriteInProgress();
  const isSignedIn = useIsSignedIn();
  const favorite = useIsFavorited(nadeId);
  const addFavorite = useAddFavorite();
  const unFavorite = useUnfavorite();
  const isFavorited = favorite;

  function onFavoriteClick() {
    if (!isSignedIn) {
      clearNadeForModal();
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
      <Popup
        inverted
        size="mini"
        position="bottom center"
        openOnTriggerClick={false}
        content={tooltipText}
        trigger={
          <button
            onClick={onFavoriteClick}
            disabled={isFavoriteInProgress}
            className="favorite"
          >
            <FaStar />
          </button>
        }
      />

      <style jsx>{`
        .favorite {
          background: #d4a900;
          color: ${color};
          border: none;
          border-radius: 5px;
          padding: 8px 10px 5px 10px;
          cursor: pointer;
          font-size: 20px;
          outline: none;
        }
      `}</style>
    </>
  );
};
