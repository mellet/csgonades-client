import { FC } from "react";
import { Popup } from "semantic-ui-react";
import { useTheme } from "../../core/settings/useTheme";
import { useGa } from "../../utils/Analytics";
import { useShouldShowPositionCopyHint } from "../logic/useShouldShowPositionCopyHint";
import { useIsDeviceSize } from "../../core/layout/useDeviceSize";

export const PositionCopyHint: FC = ({ children }) => {
  const { colors, theme } = useTheme();
  const { setShownPositionCopyHint, shownPositionCopyHint } =
    useShouldShowPositionCopyHint();
  const { event } = useGa();
  const { isMobile } = useIsDeviceSize();

  if (isMobile || shownPositionCopyHint) {
    return <>{children}</>;
  }

  function dismissHint() {
    event({
      category: "map_page",
      action: "click_dismiss_copy_pos_btn_hint",
    });
    setShownPositionCopyHint();
  }

  return (
    <>
      <Popup
        position="bottom center"
        open
        inverted={theme === "dark"}
        content={
          <div className="hint-content">
            <h3>Teleport to throw location</h3>
            Click to copy the teleport command and paste it into the in-game
            console.
            <br />
            <br />
            Make sure you are on the correct map in-game and that you have
            sv_cheats 1 on.
            <br />
            <br />
            <div className="actions">
              <button onClick={dismissHint}>Dismiss hint</button>
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
