import { FC } from "react";
import { NadeLight } from "../../../nade/models/Nade";
import { Dimensions } from "../../../constants/Constants";
import { GfycatThumbnail } from "../../../nade/components/NadeItem/GfycatThumbnail";
import {
  getNadeLineUpImageThumb,
  getNadeMainImage,
} from "../../../nade/components/NadeItem/Views/NadeItemView";

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
      <div className="nade-view">
        <div
          className="left"
          onClick={() => {
            onSelectWinner(nadeOne.id, nadeTwo.id, nadeOne.id);
          }}
        >
          <GfycatThumbnail
            avgColor={nadeOne.gfycat?.avgColor}
            gfyId={nadeOne.gfycat?.gfyId}
            lineUpThumnUrl={getNadeLineUpImageThumb(nadeOne)}
            nadeId={nadeOne.id}
            nadeSlug={nadeOne.slug}
            smallVideoUrl={nadeOne.gfycat?.smallVideoUrl}
            thumbnailUrl={getNadeMainImage(nadeOne)}
            youTubeId={nadeOne.youTubeId}
            quality="hd"
            speed="normal"
          />
        </div>
        <div
          className="right"
          onClick={() => {
            onSelectWinner(nadeOne.id, nadeTwo.id, nadeTwo.id);
          }}
        >
          <GfycatThumbnail
            avgColor={nadeTwo.gfycat?.avgColor}
            gfyId={nadeTwo.gfycat?.gfyId}
            lineUpThumnUrl={getNadeLineUpImageThumb(nadeTwo)}
            nadeId={nadeTwo.id}
            nadeSlug={nadeTwo.slug}
            smallVideoUrl={nadeTwo.gfycat?.smallVideoUrl}
            thumbnailUrl={getNadeMainImage(nadeTwo)}
            youTubeId={nadeTwo.youTubeId}
            speed="normal"
          />
        </div>
      </div>
      <style jsx>{`
        .left,
        .right {
          width: 50%;
          opacity: 0.9;
          cursor: pointer;
          border: 1px solid rgba(0, 0, 0, 0.75);
        }

        .left {
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }

        .left:hover,
        .right:hover {
          opacity: 1;
        }

        .nade-view,
        .picker {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
};
