import { FC } from "react";
import { Popup } from "semantic-ui-react";
import { useTheme } from "../../core/settings/useTheme";
import { useGa } from "../../utils/Analytics";
import { useShouldShowGameModeHint } from "../logic/useShouldShowGameModeHint";
import { isDesktop } from "react-device-detect";
import { FaTimesCircle } from "react-icons/fa";

export const GameToggleHint: FC = ({ children }) => {
  const { theme } = useTheme();
  const { setHasShownGameModeHint, shouldShownGameModeHint } =
    useShouldShowGameModeHint();
  const { event } = useGa();

  if (!shouldShownGameModeHint || !isDesktop) {
    return <>{children}</>;
  }

  function dismissHint() {
    event({
      category: "map_page",
      action: "click_dismiss_gamemode_hint",
    });
    setHasShownGameModeHint();
  }

  return (
    <>
      <Popup
        position="right center"
        open
        inverted={theme === "dark"}
        content={
          <div className="hint-content">
            <div className="toolbar">
              <h3>Game toggle</h3>
              <button onClick={dismissHint}>
                <FaTimesCircle />
              </button>
            </div>
            Toggle between CS:GO and CS2 grenades.
          </div>
        }
        trigger={children}
      />

      <style jsx>{`
        .hint-content {
          display: flex;
          flex-direction: column;
        }

        .toolbar {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          align-items: center;
        }

        h3 {
          font-size: 14px;
          margin: 0;
          padding: 0;
          font-weight: 500;
        }

        .hint-content button {
          background: transparent;
          font-size: 18px;
          color: rgba(150, 20, 20, 0.6);
          cursor: pointer;
          transition: color 0.1s;
          height: 18px;
          padding: 0;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
        }

        .hint-content button:hover {
          color: rgba(150, 20, 20, 1);
        }
      `}</style>
    </>
  );
};
