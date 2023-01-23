import { FC } from "react";
import { NadeCreateBody } from "../models/Nade";
import { useTheme } from "../../core/settings/SettingsHooks";
import { NadeItemTitle } from "./NadeItem/Views/NadeItemTitle";
import { GfycatThumbnail } from "./NadeItem/GfycatThumbnail";
import { NadeStats } from "./NadeItem/NadeStats/NadeStats";

type Props = {
  nade: Partial<NadeCreateBody>;
  viewCount?: number;
  commentCount?: number;
  createdAt?: Date | string;
};

export const PreviewNade: FC<Props> = ({
  nade,
  commentCount,
  viewCount,
  createdAt,
}) => {
  const { colors } = useTheme();
  const {
    endPosition,
    gfycat,
    imageBase64,
    movement,
    oneWay,
    startPosition,
    technique,
    tickrate,
    type,
    lineUpImageBase64,
    proUrl,
    teamSide,
  } = nade;

  return (
    <>
      <div className="nade-container">
        <NadeItemTitle
          endPosition={endPosition}
          oneWay={oneWay}
          startPosition={startPosition}
          status="accepted"
          type={type}
        />
        <GfycatThumbnail
          disableAction
          gfyId={gfycat?.gfyId || ""}
          nadeId=""
          smallVideoUrl={gfycat?.smallVideoUrl}
          thumbnailUrl={imageBase64}
          lineUpThumnUrl={lineUpImageBase64}
        />
        <NadeStats
          nadeId={"preview"}
          commentCount={commentCount || 10}
          createdAt={createdAt || new Date()}
          favoriteCount={100}
          movement={movement}
          technique={technique}
          tickrate={tickrate}
          isPro={Boolean(proUrl)}
          side={teamSide}
          viewCount={viewCount || 10}
          addAsFavorite={() => {
            // no-op
          }}
          removeAsFavorite={() => {
            // no-op
          }}
        />
      </div>
      <style jsx>{`
        .nade-container {
          background: ${colors.DP03};
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          overflow: hidden;
        }

        .title-container {
          display: grid;
          grid-template-columns: 20px 1fr 20px;
          grid-template-areas: ". title icon";
          padding: 10px 15px;
        }

        .title {
          grid-area: title;
          white-space: nowrap;
          text-align: center;
        }
      `}</style>
    </>
  );
};
