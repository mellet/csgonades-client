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
            className={
              gameMode === "cs2" ? "game-btn cs2 active" : "game-btn cs2"
            }
            onClick={() => setGameMode("cs2")}
          >
            CS2
          </button>
          <button
            className={
              gameMode === "csgo" ? "game-btn right active" : "game-btn right"
            }
            onClick={() => setGameMode("csgo")}
          >
            CS:GO
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
          display: flex;
        }

        .game-btn {
          border: none;
          background: ${colors.DP01};
          font-size: 12px;
          font-weight: 500;
          color: ${colors.TEXT};
          cursor: pointer;
          position: relative;
          height: 24px;
          flex: 1;
        }

        .active {
          background: ${colors.PRIMARY};
          color: white;
        }
      `}</style>
    </>
  );
};
