import { FC } from "react";
import { FaEye, FaCommentDots } from "react-icons/fa";
import { useTheme } from "../../../../core/settings/useTheme";
import { StatItem } from "./StatItem";
import { Technique } from "../../../models/Technique";
import { NadeMovement } from "../../../models/NadeMovement";
import { StatFavorite } from "./StatFavorite";
import Link from "next/link";
import { TeamSide } from "../../../models/TeamSide";
import { GameMode } from "../../../models/GameMode";
import { NadeStatsSpecials } from "./NadeStatsSpecials";
import { Tickrate } from "../../../models/NadeTickrate";

type NadeStatsProps = {
  commentCount: number;
  favoriteCount: number;
  gameMode: GameMode;
  isFavorited?: boolean;
  isPro?: boolean;
  isNew?: boolean;
  movement?: NadeMovement;
  nadeId: string;
  side?: TeamSide;
  slug?: string;
  technique?: Technique;
  tickrate: Tickrate;
  viewCount: number;
  addAsFavorite: (nadeId: string) => void;
  removeAsFavorite: (nadeId: string) => void;
};

export const NadeStats: FC<NadeStatsProps> = ({
  commentCount,
  favoriteCount,
  gameMode,
  isFavorited,
  isPro,
  isNew,
  movement,
  nadeId,
  side,
  slug,
  technique,
  tickrate,
  viewCount,
  addAsFavorite,
  removeAsFavorite,
}) => {
  const { colors } = useTheme();

  // Show minimum of 1 if favorited by user
  const favCount = isFavorited ? favoriteCount || 1 : favoriteCount;

  return (
    <>
      <div className="item-bottom">
        <div className="stats">
          {isNew && (
            <div className="new-badge">
              <span>NEW</span>
            </div>
          )}

          {!isNew && (
            <div className="stat-item">
              <StatItem
                count={viewCount}
                icon={<FaEye />}
                color={colors.GREY}
              />
            </div>
          )}

          {nadeId !== "preview" && (
            <div className="stat-item">
              <StatFavorite
                nadeId={nadeId}
                favoriteCount={favCount}
                isFavorited={isFavorited}
                addAsFavorite={addAsFavorite}
                removeAsFavorite={removeAsFavorite}
              />
            </div>
          )}
          <Link href={`/nades/${slug || nadeId}#comments`} legacyBehavior>
            <a className="stat-item">
              <StatItem
                color={colors.GREY}
                count={commentCount}
                icon={<FaCommentDots />}
                hoverColor={colors.SUCCESS}
              />
            </a>
          </Link>
        </div>
        <NadeStatsSpecials
          movement={movement}
          technique={technique}
          gameMode={gameMode}
          isPro={isPro}
          teamSide={side}
          tickrate={tickrate}
        />
      </div>
      <style jsx>{`
        .item-bottom {
          display: flex;
          padding: 0px 14px;
          align-items: center;
          height: 34px;
        }

        .new-badge {
          align-items: center;
          display: inline-flex;
          margin-right: 15px;
        }

        .new-badge span {
          background: #b2d600;
          border-radius: 4px;
          color: #f8ffd4;
          display: inline;
          font-size: 9px;
          font-weight: 500;
          padding: 4px 4px;
          line-height: 8px;
        }

        .stats {
          display: flex;
          align-items: center;
          flex: 1;
          margin-top: -2px;
        }

        .stat-item {
          align-self: center;
          display: inline-flex;
          align-items: center;
          margin-right: 8px;
        }

        .stat-item:last-child {
          margin-right: 0;
        }
      `}</style>
      <style jsx global>{`
        .icon-fix {
          position: relative;
          top: -1px;
        }
      `}</style>
    </>
  );
};
