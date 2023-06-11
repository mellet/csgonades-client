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
              gameMode === "csgo" ? "game-btn right active" : "game-btn right"
            }
            style={{ width: "54%" }}
            onClick={() => setGameMode("csgo")}
          >
            CS:GO
            <div className="slant-right"></div>
          </button>
          <button
            className={
              gameMode === "cs2" ? "game-btn cs2 active" : "game-btn cs2"
            }
            style={{ width: "46%" }}
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
          color: ${colors.TEXT};
          cursor: pointer;
          position: relative;
        }

        .right.active:after {
          content: "";
          background-color: ${colors.DP01};
          display: block;
          height: 100%;
          position: absolute;
          right: -5px;
          top: 0;
          width: 10px;
          transform: skewX(-15deg);
        }

        .right:after {
          content: "";
          background-color: ${colors.PRIMARY};
          display: block;
          height: 100%;
          position: absolute;
          right: -5px;
          top: 0;
          width: 10px;
          transform: skewX(-15deg);
        }

        .active {
          background: ${colors.PRIMARY};
          color: white;
        }
      `}</style>
    </>
  );
};
