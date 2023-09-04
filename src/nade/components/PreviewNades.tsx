import { FC } from "react";
import { useTheme } from "../../core/settings/useTheme";
import { NadeItemTitle } from "./NadeItem/Views/NadeItemTitle";
import { GfycatThumbnail } from "./NadeItem/GfycatThumbnail";
import { NadeStats } from "./NadeItem/NadeStats/NadeStats";
import { noOp } from "../../utils/Common";
import { NadeUpdateBody } from "../models/NadeUpdateBody";

type Props = {
  nade: Partial<NadeUpdateBody>;
  viewCount?: number;
  commentCount?: number;
};

export const PreviewNade: FC<Props> = ({ nade, commentCount, viewCount }) => {
  const { colors } = useTheme();
  const {
    gameMode,
    imageBase64,
    lineUpImageBase64,
    movement,
    oneWay,
    proUrl,
    startPosition,
    teamSide,
    technique,
    tickrate,
    type,
    youTubeId,
    endPosition,
  } = nade;

  return (
    <>
      <div className="nade-container">
        <NadeItemTitle
          elo={0}
          endPosition={endPosition}
          oneWay={oneWay}
          startPosition={startPosition}
          status="accepted"
          type={type}
        />
        <GfycatThumbnail
          disableAction
          lineUpThumnUrl={lineUpImageBase64}
          nadeId=""
          thumbnailUrl={imageBase64}
          youTubeId={youTubeId}
        />
        <NadeStats
          isNew
          addAsFavorite={noOp}
          commentCount={commentCount || 10}
          favoriteCount={100}
          gameMode={gameMode || "csgo"}
          isPro={Boolean(proUrl)}
          movement={movement}
          nadeId={"preview"}
          removeAsFavorite={noOp}
          side={teamSide}
          technique={technique}
          tickrate={tickrate}
          viewCount={viewCount || 10}
        />
      </div>
      <style jsx>{`
        .nade-container {
          background: ${colors.DP03};
          border-radius: 5px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .title-container {
          display: grid;
          grid-template-areas: ". title icon";
          grid-template-columns: 20px 1fr 20px;
          padding: 10px 15px;
        }

        .title {
          grid-area: title;
          text-align: center;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
};
