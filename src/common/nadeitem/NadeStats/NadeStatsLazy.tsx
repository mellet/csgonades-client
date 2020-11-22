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
import { NadeStatsProps } from "./NadeStats";

const NadeStatsLazy: FC<NadeStatsProps> = ({
  isFavorited,
  tickrate,
  technique,
  movement,
  createdAt,
  viewCount,
  favoriteCount,
  commentCount,
  isPro,
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
            count={favoriteCount}
            icon={<FaStar />}
            color={colors.GREY}
            iconColor={favoriteIconColor}
          />

          <StatItem
            count={commentCount}
            color={colors.GREY}
            icon={<FaCommentDots />}
          />
        </div>
        <div className="specials">
          {hasMovement && (
            <Popup
              inverted
              size="tiny"
              position="top center"
              content="Requires movement"
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
              position="top center"
              inverted
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
              size="tiny"
              openOnTriggerClick={false}
              position="top center"
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
          display: flex;
          align-items: center;
          margin-right: 15px;
        }

        .new-badge span {
          border-radius: 5px;
          background: #709c14;
          color: white;
          font-weight: 500;
          font-size: 9px;
          padding-left: 5px;
          padding-right: 5px;
          display: inline;
        }

        .center {
          text-align: center;
        }

        .item-bottom {
          display: flex;
          padding: 6px 16px;
          height: 40px;
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
          color: ${colors.NADE_ITEM_HIGHLIGHT};
          display: flex;
          align-items: center;
          margin-right: 15px;
        }

        .special:last-child {
          margin-right: 0;
        }

        .special-icon {
          position: relative;
          top: 1px;
          font-size: 12px;
          margin-right: 2px;
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

export default NadeStatsLazy;
