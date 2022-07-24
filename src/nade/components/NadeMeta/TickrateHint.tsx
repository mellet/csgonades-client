import { FC } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { Tickrate } from "../../models/NadeTickrate";

type Props = {
  tick: Tickrate;
};

export const TickrateHint: FC<Props> = ({ tick }) => {
  return (
    <>
      <Popup
        content={tickrateTooltip(tick)}
        inverted
        position="bottom center"
        size="small"
        trigger={
          <span className="tick-info">
            <FaInfoCircle />
          </span>
        }
      />
      <style jsx>{`
        .tick-info {
          cursor: pointer;
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
            Only works on <em>3rd Party Services</em> like FACEIT and ESEA and
            required a jumpthrow bind script.
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
            Only works on <em>Matchmaking</em> servers and required a jumpthrow
            bind script.
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
            Works on <em>Matchmaking</em>
            <br /> and <em>3rd Party Services</em> and required a jumpthrow bind
            script.
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
