import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NadeLight } from "../../../nade/models/Nade";
import { EloGameVS } from "./EloGameVS";
import { useGa } from "../../../utils/Analytics";
import { NadeApi } from "../../../nade/data/NadeApi";
import ViewSlider from "react-view-slider";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/useTheme";
import { FaTimesCircle } from "react-icons/fa";
import { Button } from "../../../shared-components/buttons/Button";
import { createPairings } from "../../../utils/PairingUtils";

type Props = {
  nades: NadeLight[];
  onClose: () => void;
  onFinish: () => void;
};

export const EloGameModal: FC<Props> = ({ nades, onClose, onFinish }) => {
  const { colors } = useTheme();
  const [pairings, setPairings] = useState<NadeLight[][]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const votesLeft = pairings.length - activeIndex;
  const isFinished = votesLeft === 0;

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

  // Callback function to select a winner and remove them from the pairings
  const onSelectWinner = (
    nadeOneId: string,
    nadeTwoId: string,
    winnerId: string
  ) => {
    setActiveIndex((curIndex) => curIndex + 1);
    NadeApi.eloGame({
      nadeOneId,
      nadeTwoId,
      winnerId,
    });
  };

  if (!currentGame) {
    // Show end screen!
    return null;
  }

  const renderItem = ({ index }: { index: number }) => {
    const currentGame = pairings[index];
    if (!currentGame) {
      return null;
    }
    const nadeOne = currentGame[0];
    const nadeTwo = currentGame[1];

    if (!nadeOne || !nadeTwo) {
      return null;
    }

    return (
      <EloGameVS
        nadeOne={nadeOne}
        nadeTwo={nadeTwo}
        onSelectWinner={onSelectWinner}
      />
    );
  };

  const onGameClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="modal" onClick={onBackgroundClick}>
        <div className="game-wrapper" onClick={onGameClick}>
          {isFinished ? (
            <>
              <h3>Thanks for rating the nades!</h3>
              <p>
                The nades will be sorted by the best performers at the top!
                <br /> Keep playing this with other nades to make it as accurate
                as possible.
              </p>
              <p>
                <Button onClick={onFinish} title="Back to nades" />
              </p>
            </>
          ) : (
            <>
              <h2>
                <span>Rate a Nade!</span>
                <div className="close-btn" onClick={onClose}>
                  <FaTimesCircle />
                </div>
              </h2>
              <p>Select the nade you think is most useful!</p>
              <div className="select-wrapper">
                <ViewSlider
                  renderView={renderItem}
                  numViews={pairings.length}
                  activeView={activeIndex}
                />
              </div>
              <div className="votes-left">{votesLeft} more votes left!</div>
            </>
          )}
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
          align-items: flex-start;
        }

        .game-wrapper {
          position: relative;
          background: white;
          width: 100%;
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
        action: "start_elo_game",
      });
      setEloNades(nades);
    },
    [ga]
  );

  const closeEloGame = useCallback(() => {
    ga.event({
      category: "map_page",
      action: "close_elo_game",
    });
    setEloNades(null);
  }, [ga]);

  const finishEloGame = useCallback(() => {
    ga.event({
      category: "map_page",
      action: "finish_elo_game",
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
