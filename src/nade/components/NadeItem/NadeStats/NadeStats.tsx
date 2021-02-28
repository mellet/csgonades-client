import { FC } from "react";
import { FaRunning, FaCheckCircle, FaEye, FaCommentDots } from "react-icons/fa";
import { RiMouseLine } from "react-icons/ri";
import { tickrateString, Tickrate } from "../../../models/NadeTickrate";
import { useTheme } from "../../../../core/settings/SettingsHooks";
import { Popup } from "semantic-ui-react";
import { StatItem } from "./StatItem";
import { Technique } from "../../../models/Technique";
import { Movement } from "../../../models/NadeMovement";
import { isNewNade } from "../../../../utils/Common";
import { StatFavorite } from "./StatFavorite";

type NadeStatsProps = {
  nadeId: string;
  commentCount: number;
  createdAt: Date | string;
  downVoteCount?: number;
  favoriteCount: number;
  isFavorited?: boolean;
  isPro?: boolean;
  movement?: Movement;
  technique?: Technique;
  tickrate?: Tickrate;
  upVoteCount?: number;
  viewCount: number;
};

export const NadeStats: FC<NadeStatsProps> = ({
  nadeId,
  commentCount,
  createdAt,
  favoriteCount,
  isFavorited,
  isPro,
  movement,
  technique,
  tickrate,
  viewCount,
}) => {
  const { colors } = useTheme();
  const hasMovement =
    movement === "running" ||
    movement === "crouchwalking" ||
    movement === "walking";
  const isJumpThrow = technique === "jumpthrow";
  const nadeIsNew = isNewNade(createdAt);

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
                favoriteCount={favoriteCount}
                isFavorited={isFavorited}
              />
            </div>
          )}

          <div className="stat-item">
            <StatItem
              color={colors.GREY}
              count={commentCount}
              icon={<FaCommentDots />}
            />
          </div>
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
                    {tickrateString(tickrate || "any")}
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
        }

        .stat-item {
          align-self: center;
          display: inline-flex;
          align-items: center;
          margin-right: 10px;
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
          margin-right: 12px;
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
