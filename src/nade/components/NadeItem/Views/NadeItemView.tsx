import { FC, memo } from "react";
import { AnimationTimings, Dimensions } from "../../../../constants/Constants";
import { NadeLight } from "../../../models/Nade";
import { useTheme } from "../../../../core/settings/SettingsHooks";
import { GfycatThumbnail } from "../GfycatThumbnail";
import { NadeItemTitle } from "../Views/NadeItemTitle";
import { NadeStats } from "../NadeStats/NadeStats";
import Link from "next/link";

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

    return (
      <>
        <div className="nadebox-wrap">
          <div className={"nadebox"} style={{ display: "inline-block" }}>
            <Link href={`/nades/${nade.slug || nade.id}`}>
              <a>
                <NadeItemTitle
                  endPosition={nade.endPosition}
                  oneWay={nade.oneWay}
                  startPosition={nade.startPosition}
                  status={nade.status}
                  type={nade.type}
                />
                <div className="video">
                  <GfycatThumbnail
                    avgColor={nade.gfycat.avgColor}
                    gfyId={nade.gfycat.gfyId}
                    lineUpThumnUrl={getNadeLineUpImageThumb(nade)}
                    nadeId={nade.id}
                    nadeSlug={nade.slug}
                    smallVideoUrl={nade.gfycat.smallVideoUrl}
                    thumbnailUrl={getNadeMainImage(nade)}
                  />
                </div>
              </a>
            </Link>
            <NadeStats
              nadeId={nade.id}
              commentCount={nade.commentCount}
              createdAt={nade.createdAt}
              favoriteCount={nade.favoriteCount}
              isFavorited={isFavorited}
              isPro={nade.isPro}
              movement={nade.movement}
              technique={nade.technique}
              tickrate={nade.tickrate}
              viewCount={nade.viewCount}
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
            border: 1px solid ${colors.BORDER};
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

export function getNadeMainImage(nade: NadeLight) {
  return nade.imageMain?.url || "";
}

export function getNadeLineUpImageThumb(nade: NadeLight) {
  return nade.imageLineupThumb?.url;
}

export function getNadeLineUpImage(nade: NadeLight) {
  return nade.imageLineup?.url;
}