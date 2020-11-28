import { FC } from "react";
import {
  FaRunning,
  FaCheckCircle,
  FaEye,
  FaStar,
  FaCommentDots,
} from "react-icons/fa";
import { RiMouseLine } from "react-icons/ri";
import { tickrateString, Tickrate } from "../../../nade-data/Nade/NadeTickrate";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";
import { dateMinutesAgo } from "../../../utils/DateUtils";
import { Popup } from "semantic-ui-react";
import { StatItem } from "./StatItem";
import { Technique } from "../../../nade-data/Nade/Technique";
import { Movement } from "../../../nade-data/Nade/NadeMovement";

type NadeStatsProps = {
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
  const favoriteIconColor = isFavorited ? colors.FAV_YELLOW : colors.GREY;
  const hasMovement =
    movement === "running" ||
    movement === "crouchwalking" ||
    movement === "walking";
  const isJumpThrow = technique === "jumpthrow";
  const nadeIsNew = isNew(createdAt);

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
            <StatItem count={viewCount} icon={<FaEye />} color={colors.GREY} />
          )}

          <StatItem
            color={colors.GREY}
            count={favoriteCount}
            icon={<FaStar />}
            iconColor={favoriteIconColor}
          />

          <StatItem
            color={colors.GREY}
            count={commentCount}
            icon={<FaCommentDots />}
          />
        </div>
        <div className="specials">
          {hasMovement && (
            <Popup
              content="Requires movement"
              inverted
              position="top center"
              size="tiny"
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
              size="tiny"
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
              size="tiny"
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
        .new-badge {
          align-items: center;
          display: flex;
          margin-right: 15px;
        }

        .new-badge span {
          background: #709c14;
          border-radius: 5px;
          color: white;
          display: inline;
          font-size: 9px;
          font-weight: 500;
          padding-left: 5px;
          padding-right: 5px;
        }

        .center {
          text-align: center;
        }

        .item-bottom {
          display: flex;
          height: 40px;
          padding: 6px 16px;
        }

        .stats {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .specials {
          display: flex;
          align-items: center;
        }

        .special {
          align-items: center;
          color: ${colors.NADE_ITEM_HIGHLIGHT};
          display: flex;
          margin-right: 15px;
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

function isNew(createdAt: Date | string) {
  const hoursAgoAdded = dateMinutesAgo(createdAt) / 60;

  return hoursAgoAdded < 36;
}

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
