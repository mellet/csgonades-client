import { FC } from "react";
import { FaCheckCircle, FaRunning } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { Tickrate, tickrateShortString } from "../../../models/NadeTickrate";
import { NadeMovement } from "../../../models/NadeMovement";
import { Technique } from "../../../models/Technique";
import { GameMode } from "../../../models/GameMode";
import { RiMouseLine } from "react-icons/ri";
import { TeamSide } from "../../../models/TeamSide";
import { useTheme } from "../../../../core/settings/useTheme";

type Props = {
  movement?: NadeMovement;
  technique?: Technique;
  tickrate?: Tickrate;
  gameMode?: GameMode;
  teamSide?: TeamSide;
  isPro?: boolean;
};

export const NadeStatsSpecials: FC<Props> = ({
  movement,
  technique,
  gameMode = "csgo",
  tickrate,
  teamSide,
  isPro,
}) => {
  const { colors } = useTheme();
  const hasMovement =
    movement === "running" ||
    movement === "crouchwalking" ||
    movement === "walking";

  const isJumpThrow = technique?.includes("jumpthrow");
  const isCsgo = gameMode === "csgo";

  return (
    <>
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

        {isJumpThrow && isCsgo && (
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

        {teamSide === "counterTerrorist" && (
          <div className="special teamside side-ct"></div>
        )}

        {teamSide === "terrorist" && (
          <div className="special teamside side-t"></div>
        )}
      </div>
      <style jsx>{`
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
          background: url("/icons/counterTerrorist.webp");
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
