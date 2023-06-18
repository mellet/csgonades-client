import { FC, memo } from "react";
import { tickrateString, Tickrate } from "../../models/NadeTickrate";
import { NadeType } from "../../models/NadeType";
import { techniqueString, Technique } from "../../models/Technique";
import { capitalize } from "../../../utils/Common";
import { NadeMovement } from "../../models/NadeMovement";
import { useIsDeviceSize } from "../../../core/layout/useDeviceSize";
import { TickrateHint } from "./TickrateHint";
import { NadeIcon } from "../../../shared-components/nade-icons";
import { TeamSide } from "../../models/TeamSide";
import { TeamSideDisplay } from "../../../shared-components/TeamSideDisplay";
import { ProDisplay } from "../../../shared-components/ProDisplay";

type Props = {
  movement?: NadeMovement;
  rounded?: boolean;
  technique?: Technique;
  tickrate?: Tickrate;
  type?: NadeType;
  teamSide?: TeamSide;
  proUrl?: string;
};

export const NadeMeta: FC<Props> = memo(
  ({ movement, type, technique, tickrate, teamSide, proUrl }) => {
    const { isMobile } = useIsDeviceSize();
    const isJumpThrowThrow = isJumpthrowTechnique(technique);

    return (
      <>
        <div className="nade-meta">
          <div className="nade-meta-item type">
            <h4>Type</h4>

            <NadeIcon nadeType={type} size={22} />
          </div>

          {teamSide && (
            <div className="nade-meta-item">
              <h4>Side</h4>

              <TeamSideDisplay teamSide={teamSide} size={22} />
            </div>
          )}

          {proUrl && (
            <div className="nade-meta-item">
              <h4>Pro</h4>
              <ProDisplay size={22} url={proUrl} />
            </div>
          )}

          {movement && (
            <div className="nade-meta-item">
              <h4>Movement</h4>
              <span>{movement ? capitalize(movement) : "Not set."}</span>
            </div>
          )}

          <div className="nade-meta-item">
            <h4>Technique</h4>
            <span>{technique ? techniqueString(technique) : "Not set."}</span>
          </div>

          {tickrate && isJumpThrowThrow && (
            <div className="nade-meta-item">
              <h4>Tickrate</h4>
              <span className="nade-meta-tick">
                <span>{tickrateString(tickrate)} </span>
                <TickrateHint tick={tickrate} />
              </span>
            </div>
          )}
        </div>
        <style jsx>{`
          .nade-meta {
            display: flex;
            color: white;
            background: #729b79;
            width: ${isMobile ? "100%" : "auto"};
            border-top-left-radius: ${isMobile ? 0 : 8}px;
            border-top-right-radius: ${isMobile ? 0 : 8}px;
            height: 50px;
          }

          .nade-meta-tick {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .nade-meta-tick span {
            margin-right: 4px;
          }

          .nade-meta-item {
            flex: 1;
            white-space: nowrap;
            border-right: 1px solid rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            font-size: 14px;
            padding: 0px;
            position: relative;
            padding: 8px 10px;
          }

          .nade-meta-item:last-child {
            border-right: none;
          }

          h4 {
            margin: 0;
            padding: 0;
            font-size: 12px;
            line-height: 10px;
            font-weight: 500;
            margin-bottom: 4px;
          }
        `}</style>
      </>
    );
  }
);

function isJumpthrowTechnique(technique?: Technique) {
  return (
    technique === "jumpthrow" ||
    technique === "jumpthrowBoth" ||
    technique === "jumpthrowW"
  );
}
