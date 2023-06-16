import { FC, memo } from "react";
import { AnimationTimings, Dimensions } from "../../../../constants/Constants";
import { NadeLight } from "../../../models/Nade";
import { useTheme } from "../../../../core/settings/useTheme";
import { GfycatThumbnail } from "../GfycatThumbnail";
import { NadeItemTitle } from "../Views/NadeItemTitle";
import { NadeStats } from "../NadeStats/NadeStats";
import Link from "next/link";
import { useIsLowEngagementNade } from "../Utils/NadeUtils";

interface Props {
  nade: NadeLight;
  onAddAsFavorite: (nadeId: string) => void;
  onRemoveAsFavorite: (nadeId: string) => void;
  isFavorited: boolean;
  width?: number;
}

export const NadeItemView: FC<Props> = memo(
  ({ nade, isFavorited, onAddAsFavorite, onRemoveAsFavorite, width }) => {
    const { colors } = useTheme();

    const isLowEngagementNade = useIsLowEngagementNade(
      nade.favoriteCount,
      nade.viewCount,
      nade.createdAt
    );

    const borderColor = isLowEngagementNade ? colors.WARNING : colors.BORDER;

    return (
      <>
        <div className="nadebox-wrap">
          <div className={"nadebox"} style={{ display: "inline-block" }}>
            <Link
              href={`/nades/${nade.slug || nade.id}`}
              scroll={true}
              legacyBehavior
            >
              <a role="button">
                <NadeItemTitle
                  endPosition={nade.endPosition}
                  oneWay={nade.oneWay}
                  startPosition={nade.startPosition}
                  status={nade.status}
                  type={nade.type}
                />
                <div className="video">
                  <GfycatThumbnail
                    avgColor={nade.gfycat?.avgColor}
                    gfyId={nade.gfycat?.gfyId}
                    lineUpThumnUrl={getNadeLineUpImageThumb(nade)}
                    nadeId={nade.id}
                    nadeSlug={nade.slug}
                    smallVideoUrl={nade.gfycat?.smallVideoUrl}
                    thumbnailUrl={getNadeMainImage(nade)}
                    youTubeId={nade.youTubeId}
                  />
                </div>
              </a>
            </Link>
            <NadeStats
              nadeId={nade.id}
              slug={nade.slug}
              commentCount={nade.commentCount}
              createdAt={nade.createdAt}
              favoriteCount={nade.favoriteCount}
              isFavorited={isFavorited}
              isPro={Boolean(nade.proUrl)}
              movement={nade.movement}
              technique={nade.technique}
              tickrate={nade.tickrate}
              viewCount={nade.viewCount}
              side={nade.teamSide}
              addAsFavorite={onAddAsFavorite}
              removeAsFavorite={onRemoveAsFavorite}
            />
          </div>
        </div>
        <style jsx>{`
          .nadebox-wrap {
            display: inline-block;
            width: ${width ? `${width}px` : "100%"};
          }

          .nadebox {
            background: ${colors.DP02};
            border-radius: ${Dimensions.BORDER_RADIUS};
            border: 1px solid ${borderColor};
            max-width: 400px;
            min-width: 265px;
            overflow: hidden;
            transition: box-shadow ${AnimationTimings.fast}s;
            width: 100%;
            margin-bottom: -6px;
            background: ${colors.DP02};
          }

          .nadebox:hover {
            box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.05);
          }

          .video {
            overflow: hidden;
            position: relative;
          }

          @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
            .nadebox {
              max-width: 100%;
            }
          }
        `}</style>
      </>
    );
  }
);

function getNadeMainImage(nade: NadeLight) {
  return nade.imageMain?.url || "";
}

function getNadeLineUpImageThumb(nade: NadeLight) {
  return nade.imageLineupThumb?.url;
}
