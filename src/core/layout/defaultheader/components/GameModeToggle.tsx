import { FC } from "react";
import { useGameMode } from "../../../useGameMode";
import { useTheme } from "../../../settings/useTheme";
import { Dimensions } from "../../../../constants/Constants";

export const GameModeToggle: FC = () => {
  const { colors } = useTheme();
  const { gameMode, setGameMode } = useGameMode();

  return (
    <>
      <div className="darkmode-toggle">
        <div className="btn-wrapper">
          <button
            className={gameMode === "csgo" ? "game-btn active" : "game-btn"}
            onClick={() => setGameMode("csgo")}
          >
            CS:GO
          </button>
          <button
            className={gameMode === "cs2" ? "game-btn active" : "game-btn"}
            onClick={() => setGameMode("cs2")}
          >
            CS2
          </button>
        </div>
      </div>
      <style jsx>{`
        .darkmode-toggle {
          display: flex;
          align-items: center;
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }

        .btn-wrapper {
          border: 1px solid ${colors.BORDER};
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
        }

        .game-btn {
          border: none;
          height: 40px;
          background: ${colors.DP01};
          font-size: 14px;
          font-weight: 500;
          width: 60px;
          color: ${colors.TEXT};
          cursor: pointer;
        }

        .active {
          background: ${colors.PRIMARY};
          color: white;
        }

        .game-btn:first-child {
          border-right: 1px solid ${colors.BORDER};
        }

        .toggle-btn {
          border: none;
          padding: 0;
          margin: 0;
          border-radius: 8px;
          outline: none;
          height: 40px;
          width: 100px;
          border: none;
        }

        .toggle-btn:hover {
          background: #222;
          color: white;
          cursor: pointer;
        }

        .toggle-btn.selected {
          color: white;
        }

        .toggle-btn.selected:hover {
          background: #f2f2f2;
          color: #111;
        }

        .toggle-btn:focus-visible {
          outline: 1px auto ${colors.focusOutline};
        }

        .cs2 {
          background: #e3871f;
          color: ##1e202f;
          font-weight: bold;
          font-size: 14px;
        }

        .cs2 span {
          color: white;
        }
      `}</style>
    </>
  );
};
