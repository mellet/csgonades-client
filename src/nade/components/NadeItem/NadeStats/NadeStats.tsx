import { FC } from "react";
import { FaRunning, FaCheckCircle, FaEye, FaCommentDots } from "react-icons/fa";
import { RiMouseLine } from "react-icons/ri";
import { Tickrate, tickrateShortString } from "../../../models/NadeTickrate";
import { useTheme } from "../../../../core/settings/SettingsHooks";
import { Popup } from "semantic-ui-react";
import { StatItem } from "./StatItem";
import { Technique } from "../../../models/Technique";
import { Movement } from "../../../models/NadeMovement";
import { isNewNade } from "../../../../utils/Common";
import { StatFavorite } from "./StatFavorite";
import Link from "next/link";
import { TeamSide } from "../../../models/TeamSide";

type NadeStatsProps = {
  slug?: string;
  nadeId: string;
  commentCount: number;
  createdAt: Date | string;
  favoriteCount: number;
  isFavorited?: boolean;
  isPro?: boolean;
  movement?: Movement;
  side?: TeamSide;
  technique?: Technique;
  tickrate?: Tickrate;
  viewCount: number;
  addAsFavorite: (nadeId: string) => void;
  removeAsFavorite: (nadeId: string) => void;
};

export const NadeStats: FC<NadeStatsProps> = ({
  nadeId,
  slug,
  commentCount,
  createdAt,
  favoriteCount,
  isFavorited,
  isPro,
  movement,
  technique,
  side,
  tickrate,
  viewCount,
  addAsFavorite,
  removeAsFavorite,
}) => {
  const { colors } = useTheme();
  const hasMovement =
    movement === "running" ||
    movement === "crouchwalking" ||
    movement === "walking";
  const isJumpThrow = technique?.includes("jumpthrow");
  const nadeIsNew = isNewNade(createdAt);

  // Show minimum of 1 if favorited by user
  const favCount = isFavorited ? favoriteCount || 1 : favoriteCount;

  return (
    <>
      <div className="item-bottom">
        <div className="stats">
          {nadeIsNew && (
            <div className="new-badge">
              <span>NEW</span>
            </div>
          )}

          {!nadeIsNew && (
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
          <Link href={`/nades/${slug || nadeId}#comments`}>
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
        <div className="specials">
          {hasMovement && (
            <Popup
              content="Requires movement"
              inverted
              position="top center"
              size="mini"
              trigger={
                <div className="special movement">
                  <div className="special-icon">
                    <FaRunning />
                  </div>
                </div>
              }
            />
          )}

          {isJumpThrow && (
            <Popup
              content={tickrateTooltip(tickrate)}
              inverted
              position="top center"
              size="mini"
              trigger={
                <div className="special tick">
                  <div className="special-icon">
                    <RiMouseLine />
                  </div>
                  <span className="special-text">
                    {tickrateShortString(tickrate || "any")}
                  </span>
                </div>
              }
            />
          )}

          {isPro && (
            <Popup
              inverted
              openOnTriggerClick={false}
              position="top center"
              size="mini"
              content={
                <div className="center">
                  <b>Verified Pro</b>
                  <br />
                  Nade has been thrown by a
                  <br />
                  professional CS:GO player
                  <br />
                  in a official game.
                </div>
              }
              trigger={
                <div className="special pro">
                  <div className="special-icon">
                    <FaCheckCircle />
                  </div>
                  <span className="special-text">PRO</span>
                </div>
              }
            />
          )}

          {side === "counterTerrorist" && (
            <div className="special teamside side-ct"></div>
          )}

          {side === "terrorist" && (
            <div className="special teamside side-t"></div>
          )}
        </div>
      </div>
      <style jsx>{`
        .item-bottom {
          display: flex;
          padding: 0px 10px;
          align-items: center;
          height: 35px;
        }

        .new-badge {
          align-items: center;
          display: inline-flex;
          margin-right: 15px;
        }

        .new-badge span {
          background: #709c14;
          border-radius: 4px;
          color: white;
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

        .specials {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
        }

        .special {
          align-items: center;
          color: ${colors.NADE_ITEM_HIGHLIGHT};
          display: flex;
          margin-right: 8px;
        }

        .special:last-child {
          margin-right: 0;
        }

        .special-icon {
          font-size: 12px;
          margin-right: 2px;
          position: relative;
          top: 1px;
        }

        .special-text {
          font-size: 11px;
          font-weight: 400;
        }

        .pro {
          color: #00b8d9;
        }

        .side-ct {
          background: url("/icons/ct.webp");
          background-size: contain;
        }

        .side-t {
          background: url("/icons/terrorist.webp");
          background-size: contain;
        }

        .teamside {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          margin-bottom: 2px;
          opacity: 0.9;
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

function tickrateTooltip(tickrate?: Tickrate) {
  switch (tickrate) {
    case "tick128":
      return (
        <>
          <div className="center">
            <b>Jumpthrow Bind</b>
          </div>
          <div className="center">
            Only for <em>3rd Party Services</em>
          </div>
          <style jsx>{`
            .center {
              text-align: center;
            }
          `}</style>
        </>
      );
    case "tick64":
      return (
        <>
          <div className="center">
            <b>Jumpthrow Bind</b>
          </div>
          <div className="center">
            Only for <em>Matchmaking</em>
          </div>
          <style jsx>{`
            .center {
              text-align: center;
            }
          `}</style>
        </>
      );
    default:
      return (
        <>
          <div className="center">
            <b>Jumpthrow Bind</b>
          </div>
          <div className="center">
            Works on <em>Matchmaking</em>
            <br /> and <em>3rd Party Services</em>
          </div>
          <style jsx>{`
            .center {
              text-align: center;
            }
          `}</style>
        </>
      );
  }
}
