import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NadeLight } from "../../../nade/models/Nade";
import { useGa } from "../../../utils/Analytics";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/useTheme";
import { createPairings } from "../../../utils/PairingUtils";
import { EloGameStartScreen } from "./EloGameStartScreen";
import { EloGameGameScreen } from "./EloGameGameScreen";
import { EloGameFinishScreen } from "./EloGameFinishScreen";
import { FaTimesCircle } from "react-icons/fa";

type Props = {
  nades: NadeLight[];
  onClose: () => void;
  onFinish: () => void;
};

export const EloGameModal: FC<Props> = ({ nades, onClose, onFinish }) => {
  const ga = useGa();
  const { colors } = useTheme();
  const [pairings, setPairings] = useState<NadeLight[][]>([]);
  const [gameState, setGameState] = useState<"init" | "start" | "end">("init");

  const onBackgroundClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onClose();
  };

  useEffect(() => {
    const pairings = createPairings(nades);

    setPairings(pairings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentGame = useMemo(() => {
    return pairings[0];
  }, [pairings]);

  if (!currentGame) {
    // Show end screen!
    return null;
  }

  const onGameClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="modal" onClick={onBackgroundClick}>
        <div className="game-wrapper" onClick={onGameClick}>
          <div className="game-header">
            <h2>
              <span>Nade Battle Royale</span>
              <div className="close-btn" onClick={onClose}>
                <FaTimesCircle />
              </div>
            </h2>
          </div>
          {gameState === "init" && (
            <EloGameStartScreen
              numPairings={pairings.length}
              onStart={() => {
                ga.event({
                  category: "map_page",
                  action: "elo_start_game",
                });
                setGameState("start");
              }}
            />
          )}
          {gameState === "start" && (
            <EloGameGameScreen
              onFinish={() => setGameState("end")}
              pairings={pairings}
            />
          )}
          {gameState === "end" && <EloGameFinishScreen onFinish={onFinish} />}
        </div>
      </div>
      <style jsx>{`
        h2 {
          font-size: 24px;
          margin: 0;
          padding: 0;
          border-bottom: 1px solid ${colors.BORDER};
          padding: ${Dimensions.PADDING_MEDIUM};
          background: ${colors.PRIMARY};
          display: flex;
          justify-content: space-between;
          color: white;
        }

        h3 {
          padding: ${Dimensions.PADDING_MEDIUM};
          border-bottom: 1px solid ${colors.BORDER};
        }

        p {
          padding: ${Dimensions.PADDING_MEDIUM};
          font-size: 16px;
        }

        .close-btn:hover {
          cursor: pointer;
          color: ${colors.ERROR};
        }

        .modal {
          position: fixed;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 999;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .game-wrapper {
          position: relative;
          background: white;
          margin: ${Dimensions.GUTTER_SIZE}px;
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
        }

        .votes-left {
          background: ${colors.DP02};
          padding: ${Dimensions.GUTTER_SIZE}px;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          text-align: center;
          font-size: 14px;
          font-weight: bold;
          border-top: 1px solid ${colors.BORDER};
        }

        .select-wrapper {
          padding-left: ${Dimensions.GUTTER_SIZE}px;
          padding-right: ${Dimensions.GUTTER_SIZE}px;
        }

        .back-btn {
          margin: ${Dimensions.GUTTER_SIZE}px;
          padding: 10px 20px;
          background: ;
        }
      `}</style>
    </>
  );
};

export const useEloGame = () => {
  const ga = useGa();
  const [eloNades, setEloNades] = useState<NadeLight[] | null>(null);

  const showEloGame = useCallback(
    (nades: NadeLight[]) => {
      ga.event({
        category: "map_page",
        action: "elo_open_click",
      });
      setEloNades(nades);
    },
    [ga]
  );

  const closeEloGame = useCallback(() => {
    ga.event({
      category: "map_page",
      action: "elo_close_click",
    });
    setEloNades(null);
  }, [ga]);

  const finishEloGame = useCallback(() => {
    ga.event({
      category: "map_page",
      action: "elo_finish",
    });
    setEloNades(null);
  }, [ga]);

  return {
    showEloGame,
    closeEloGame,
    finishEloGame,
    eloNades,
  };
};
