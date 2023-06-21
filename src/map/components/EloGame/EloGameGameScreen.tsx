import { FC, useCallback, useState } from "react";
import ViewSlider from "react-view-slider";
import { NadeLight } from "../../../nade/models/Nade";
import { EloGameVS } from "./EloGameVS";
import { NadeApi } from "../../../nade/data/NadeApi";
import { Dimensions } from "../../../constants/Constants";
import { useGa } from "../../../utils/Analytics";

type Props = {
  pairings: NadeLight[][];
  onFinish: () => void;
};

export const EloGameGameScreen: FC<Props> = ({ pairings, onFinish }) => {
  const ga = useGa();
  const [activeIndex, setActiveIndex] = useState(0);

  // Callback function to select a winner and remove them from the pairings
  const onSelectWinner = useCallback(
    (nadeOneId: string, nadeTwoId: string, winnerId: string) => {
      ga.event({
        category: "map_page",
        action: "elo_cast_vote",
      });
      NadeApi.eloGame({
        nadeOneId,
        nadeTwoId,
        winnerId,
      });
      if (activeIndex === pairings.length - 1) {
        onFinish();
      } else {
        setActiveIndex((curIndex) => curIndex + 1);
      }
    },
    [ga, activeIndex, onFinish, pairings.length]
  );

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

  return (
    <>
      <div className="select-wrapper">
        <ViewSlider
          renderView={renderItem}
          numViews={pairings.length}
          activeView={activeIndex}
        />
        <p>
          Choose a winner!
          <br />
          {activeIndex + 1} / {pairings.length}
        </p>
      </div>
      <style jsx>{`
        .select-wrapper {
          width: 95vw;
          padding: ${Dimensions.GUTTER_SIZE}px;
        }

        p {
          font-size: 28px;
          font-weight: 300;
          text-align: center;
          margin: 0;
          padding: 0;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
