import { FC, memo } from "react";
import { AnimationTimings, Dimensions } from "../../../constants/Constants";
import { NadeLight } from "../../models/Nade";
import { useTheme } from "../../../core/settings/SettingsHooks";
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
      <div>
        <Link href={`/nades/${nade.slug || nade.id}`}>
          <a className="nadebox-link">
            <div className={"nadebox"} style={{ display: "inline-block" }}>
              <NadeItemTitle
                endPosition={nade.endPosition}
                oneWay={nade.oneWay}
                startPosition={nade.startPosition}
                status={nade.status}
                title={nade.title}
                type={nade.type}
              />
              <div className="video">
                <GfycatThumbnail
                  avgColor={nade.gfycat.avgColor}
                  downVoteCount={nade.downVoteCount}
                  gfyId={nade.gfycat.gfyId}
                  lineUpThumnUrl={nade.imageLineupThumbUrl}
                  nadeId={nade.id}
                  nadeSlug={nade.slug}
                  smallVideoUrl={nade.gfycat.smallVideoUrl}
                  thumbnailUrl={nade.images.thumbnailUrl}
                  upVoteCount={nade.upVoteCount}
                />
              </div>
              <NadeStats
                commentCount={nade.commentCount}
                createdAt={nade.createdAt}
                downVoteCount={nade.downVoteCount}
                favoriteCount={nade.favoriteCount}
                isFavorited={nade.isFavorited}
                isPro={nade.isPro}
                movement={nade.movement}
                technique={nade.technique}
                tickrate={nade.tickrate}
                upVoteCount={nade.upVoteCount}
                viewCount={nade.viewCount}
              />
            </div>
          </a>
        </Link>
      </div>
      <style jsx>{`
        .nadebox-link {
          display: inline-block;
          width: 100%;
        }

        .nadebox {
          background: ${colors.DP02};
          border-radius: ${Dimensions.BORDER_RADIUS};
          border: 1px solid ${colors.BORDER};
          cursor: pointer;
          max-width: 400px;
          min-width: 265px;
          overflow: hidden;
          transition: box-shadow ${AnimationTimings.fast}s;
          width: 100%;
          margin-bottom: -6px;
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
