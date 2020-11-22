import { FC } from "react";
import { NadeCreateBody } from "../nade-data/Nade/Nade";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { NadeItemTitle } from "../common/nadeitem/NadeItemTitle";
import { GfycatThumbnail } from "../common/nadeitem/GfycatThumbnail";
import { NadeStats } from "../common/nadeitem/NadeStats/NadeStats";

type Props = {
  nade: Partial<NadeCreateBody>;
};

export const PreviewNade: FC<Props> = ({ nade }) => {
  const { colors } = useTheme();
  const {
    startPosition,
    endPosition,
    type,
    imageBase64,
    gfycat,
    movement,
    technique,
    tickrate,
    oneWay,
  } = nade;

  return (
    <>
      <div className="nade-container">
        <NadeItemTitle
          status="accepted"
          type={type}
          endPosition={endPosition}
          oneWay={oneWay}
          startPosition={startPosition}
        />
        <GfycatThumbnail
          disableAction
          nadeId=""
          smallVideoUrl={gfycat?.smallVideoUrl}
          thumbnailUrl={imageBase64}
          gfyId={gfycat?.gfyId || ""}
        />
        <NadeStats
          commentCount={10}
          viewCount={10}
          createdAt={new Date()}
          favoriteCount={100}
          movement={movement}
          technique={technique}
          tickrate={tickrate}
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
