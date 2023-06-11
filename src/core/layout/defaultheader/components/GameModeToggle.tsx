import { FC } from "react";
import { useGameMode } from "../../../useGameMode";
import { useTheme } from "../../../settings/useTheme";
import { Dimensions } from "../../../../constants/Constants";

export const GameModeToggle: FC = () => {
  const { colors } = useTheme();
  const { gameMode, setGameMode } = useGameMode();

  return (
    <>
      <div className="game-mode-toggle">
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
        .game-mode-toggle {
          display: flex;
          align-items: center;
          width: 100%;
        }

        .btn-wrapper {
          border: 1px solid ${colors.BORDER};
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
          width: 100%;
        }

        .game-btn {
          border: none;
          height: 30px;
          background: ${colors.DP01};
          font-size: 14px;
          font-weight: 500;
          width: 50%;
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
      `}</style>
    </>
  );
};
