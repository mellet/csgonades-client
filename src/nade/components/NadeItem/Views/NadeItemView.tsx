import { FC, memo } from "react";
import { AnimationTimings, Dimensions } from "../../../../constants/Constants";
import { useTheme } from "../../../../core/settings/useTheme";
import { NadeItemThumbnail } from "../NadeItemThumbnail";
import { NadeItemTitle } from "../Views/NadeItemTitle";
import { NadeStats } from "../NadeStats/NadeStats";
import Link from "next/link";
import { NadeLight } from "../../../models/NadePartial";

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
            <Link
              href={`/nades/${nade.slug || nade.id}`}
              legacyBehavior
              scroll={true}
            >
              <a role="button">
                <NadeItemTitle
                  elo={nade.eloScore}
                  endPosition={nade.endPosition}
                  oneWay={nade.oneWay}
                  startPosition={nade.startPosition}
                  status={nade.status}
                  type={nade.type}
                />
                <div className="video">
                  <NadeItemThumbnail
                    gameMode={nade.gameMode}
                    lineUpThumnUrl={nade.images.lineup.small}
                    nadeId={nade.id}
                    nadeSlug={nade.slug}
                    thumbnailUrl={nade.images.result.small}
                    youTubeId={nade.youTubeId}
                    avatar={nade.user.avatar}
                  />
                </div>
              </a>
            </Link>
            <NadeStats
              addAsFavorite={onAddAsFavorite}
              commentCount={nade.commentCount}
              favoriteCount={nade.favoriteCount}
              gameMode={nade.gameMode}
              isFavorited={isFavorited}
              isPro={Boolean(nade.proUrl)}
              isNew={nade.isNew}
              movement={nade.movement}
              nadeId={nade.id}
              removeAsFavorite={onRemoveAsFavorite}
              side={nade.teamSide}
              slug={nade.slug}
              technique={nade.technique}
              tickrate={nade.tickrate}
              viewCount={nade.viewCount}
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
            margin-bottom: -6px;
            max-width: 400px;
            min-width: 265px;
            overflow: hidden;
            transition: box-shadow ${AnimationTimings.fast}s;
            width: 100%;
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
