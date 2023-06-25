import { FC } from "react";
import { NadeLight } from "../../../nade/models/NadeLight";
import { GfycatThumbnail } from "../../../nade/components/NadeItem/GfycatThumbnail";
import { EloGameNadeTitle } from "./EloGameNadeTitle";

type Props = {
  nadeOne: NadeLight;
  nadeTwo: NadeLight;
  onSelectWinner: (
    nadeOneId: string,
    nadeTwoId: string,
    nadeWinnerId: string
  ) => void;
};

export const EloGameVS: FC<Props> = ({ nadeOne, nadeTwo, onSelectWinner }) => {
  return (
    <>
      <div className="elo-game-vs">
        <div className="nade-view">
          <div
            className="left"
            onClick={() => {
              onSelectWinner(nadeOne.id, nadeTwo.id, nadeOne.id);
            }}
          >
            <EloGameNadeTitle nade={nadeOne} />
            <GfycatThumbnail
              avgColor={nadeOne.gfycat?.avgColor}
              gfyId={nadeOne.gfycat?.gfyId}
              lineUpThumnUrl={nadeOne.images.lineup.medium}
              nadeId={nadeOne.id}
              nadeSlug={nadeOne.slug}
              smallVideoUrl={nadeOne.gfycat?.smallVideoUrl}
              thumbnailUrl={nadeOne.images.result.medium}
              youTubeId={nadeOne.youTubeId}
              quality="hd"
              speed="normal"
            />
          </div>
          <div className="vs">VS</div>
          <div
            className="right"
            onClick={() => {
              onSelectWinner(nadeOne.id, nadeTwo.id, nadeTwo.id);
            }}
          >
            <EloGameNadeTitle nade={nadeTwo} />
            <GfycatThumbnail
              avgColor={nadeTwo.gfycat?.avgColor}
              gfyId={nadeTwo.gfycat?.gfyId}
              lineUpThumnUrl={nadeTwo.images.lineup.medium}
              nadeId={nadeTwo.id}
              nadeSlug={nadeTwo.slug}
              smallVideoUrl={nadeTwo.gfycat?.smallVideoUrl}
              thumbnailUrl={nadeTwo.images.result.medium}
              youTubeId={nadeTwo.youTubeId}
              speed="normal"
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .left,
        .right {
          flex: 1;
          opacity: 0.9;
          cursor: pointer;
        }

        .vs {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          font-size: 24px;
        }

        .left:hover,
        .right:hover {
          opacity: 1;
        }

        .nade-view,
        .picker {
          display: flex;
        }
      `}</style>
    </>
  );
};
