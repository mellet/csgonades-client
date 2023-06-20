import { FC, useEffect, useState } from "react";
import ViewSlider from "react-view-slider";
import { NadeLight } from "../../../nade/models/Nade";
import { EloGameVS } from "./EloGameVS";
import { NadeApi } from "../../../nade/data/NadeApi";
import { Dimensions } from "../../../constants/Constants";

type Props = {
  pairings: NadeLight[][];
  onFinish: () => void;
};

export const EloGameGameScreen: FC<Props> = ({ pairings, onFinish }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const isDone = activeIndex >= pairings.length;
    if (isDone) {
      onFinish();
    }
  }, [activeIndex, onFinish, pairings.length]);

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
