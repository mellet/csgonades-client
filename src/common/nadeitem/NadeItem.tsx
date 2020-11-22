import { FC, memo } from "react";
import { AnimationTimings, Dimensions } from "../../constants/Constants";
import { NadeLight } from "../../nade-data/Nade/Nade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { GfycatThumbnail } from "./GfycatThumbnail";
import { NadeItemTitle } from "./NadeItemTitle";
import { NadeStats } from "./NadeStats/NadeStats";
import Link from "next/link";

interface Props {
  nade: NadeLight;
}

export const NadeItem: FC<Props> = memo(({ nade }) => {
  const { colors } = useTheme();

  return (
    <>
      <Link href="/nades/[nade]" as={`/nades/${nade.slug || nade.id}`}>
        <a>
          <div className={"nadebox"} style={{ display: "inline-block" }}>
            <NadeItemTitle
              startPosition={nade.startPosition}
              endPosition={nade.endPosition}
              type={nade.type}
              status={nade.status}
              title={nade.title}
              oneWay={nade.oneWay}
            />
            <div className="video">
              <GfycatThumbnail
                nadeId={nade.id}
                smallVideoUrl={nade.gfycat.smallVideoUrl}
                thumbnailUrl={nade.images.thumbnailUrl}
                avgColor={nade.gfycat.avgColor}
                nadeSlug={nade.slug}
                gfyId={nade.gfycat.gfyId}
                upVoteCount={nade.upVoteCount}
                downVoteCount={nade.downVoteCount}
              />
            </div>
            <NadeStats
              commentCount={nade.commentCount}
              createdAt={nade.createdAt}
              favoriteCount={nade.favoriteCount}
              viewCount={nade.viewCount}
              isFavorited={nade.isFavorited}
              movement={nade.movement}
              technique={nade.technique}
              tickrate={nade.tickrate}
              isPro={nade.isPro}
              downVoteCount={nade.downVoteCount}
              upVoteCount={nade.upVoteCount}
            />
          </div>
        </a>
      </Link>
      <style jsx>{`
        .nadebox {
          background: ${colors.DP02};
          border-radius: ${Dimensions.BORDER_RADIUS};
          cursor: pointer;
          transition: box-shadow ${AnimationTimings.fast}s;
          overflow: hidden;
          width: 100%;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          min-width: 250px;
          max-width: 350px;
        }

        .nadebox:hover {
          box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.05);
        }

        .video {
          overflow: hidden;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .nadebox {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
});
