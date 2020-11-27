import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { useIsSignedIn } from "../../../store/AuthStore/AuthHooks";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";
import { useFilterByFavorites } from "../../../store/MapStore/hooks/useFilterByFavorites";
import { Dimensions } from "../../../constants/Constants";
import { useSignInWarning } from "../../../store/GlobalStore/hooks/useSignInWarning";

type Props = {
  vertical?: boolean;
};

export const FavFilterButton: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const isSignedIn = useIsSignedIn();
  const { byFavorites, filterByFavorites } = useFilterByFavorites();
  const { setSignInWarning } = useSignInWarning();
  const active = byFavorites ? "active" : "";

  function onFilterByFavorite() {
    if (isSignedIn) {
      filterByFavorites();
    } else {
      setSignInWarning("favorite");
    }
  }

  return (
    <>
      <div className="fav-filter-wrap">
        <button
          className={`filter-btn favorite ${active}`}
          onClick={onFilterByFavorite}
        >
          <div className="icon-wrap">
            <FaStar size={Dimensions.BUTTON_HEIGHT / 1.55} />
          </div>
        </button>
      </div>

      <style jsx>{`
        .filter-btn {
          border: none;
          outline: none;
          background: ${colors.filterBg};
          width: ${Dimensions.BUTTON_HEIGHT}px;
          height: ${Dimensions.BUTTON_HEIGHT}px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: #767676;
          cursor: pointer;
          overflow: hidden;
          border-radius: 5px;
        }

        .icon-wrap {
          position: relative;
          top: 1px;
        }

        .favorite {
          color: rgb(250, 200, 0);
        }

        .filter-btn:hover {
          background: ${colors.filterBgHover};
        }

        .active {
          background: ${colors.filterBgHover};
        }
      `}</style>
    </>
  );
};
