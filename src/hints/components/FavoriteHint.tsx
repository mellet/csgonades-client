import { FC } from "react";
import { Popup } from "semantic-ui-react";
import { useTheme } from "../../core/settings/SettingsHooks";
import { useGa } from "../../utils/Analytics";
import { useShouldFavoriteHint } from "../data/hooks/useShouldShowFavoriteHint";

export const FavoriteHint: FC = ({ children }) => {
  const { colors, theme } = useTheme();
  const {
    shouldDisplayFavoriteButtonHint,
    setShownFavoriteHint,
  } = useShouldFavoriteHint();
  const { event } = useGa();

  if (!shouldDisplayFavoriteButtonHint) {
    return <>{children}</>;
  }

  function dismissHint() {
    event({
      category: "map_page",
      action: "click_dismiss_favorite_btn_hint",
    });
    setShownFavoriteHint();
  }

  return (
    <>
      <Popup
        position="right center"
        open
        inverted={theme === "dark"}
        content={
          <div className="hint-content">
            <h3>Your Favorites</h3>
            Click to only show your favorites. Keep on favoriting nades to make
            them easier to find next time.
            <br />
            <br />
            <div className="actions">
              <button onClick={dismissHint}>Got it!</button>
            </div>
          </div>
        }
        trigger={children}
      />

      <style jsx>{`
        .hint-content h3 {
          font-size: 14px;
          margin-bottom: 10px;
          padding: 0;
          font-weight: 600;
        }

        .hint-content button {
          background: ${colors.SUCCESS};
          border: none;
          border-radius: 5px;
          padding: 8px 12px;
          color: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          opacity: 0.85;
          transition: opacity 0.3s;
        }

        .hint-content button:hover {
          opacity: 1;
        }

        .actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
      `}</style>
    </>
  );
};
