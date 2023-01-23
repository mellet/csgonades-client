import { FC, memo } from "react";
import { tickrateString, Tickrate } from "../../models/NadeTickrate";
import { nadeTypeString, NadeType } from "../../models/NadeType";
import { techniqueString, Technique } from "../../models/Technique";
import { capitalize } from "../../../utils/Common";
import { NadeMovement } from "../../models/NadeMovement";
import { useIsDeviceSize } from "../../../core/layout/useDeviceSize";
import { TickrateHint } from "./TickrateHint";

type Props = {
  movement?: NadeMovement;
  rounded?: boolean;
  technique?: Technique;
  tickrate?: Tickrate;
  type?: NadeType;
};

export const NadeMeta: FC<Props> = memo(
  ({ movement, type, technique, tickrate }) => {
    const { isMobile } = useIsDeviceSize();

    return (
      <>
        <div className="nade-meta">
          <div className="nade-meta-item">
            <h4>Type</h4>
            <span>{type ? nadeTypeString(type) : "Not set."}</span>
          </div>

          <div className="nade-meta-item">
            <h4>Movement</h4>
            <span>{movement ? capitalize(movement) : "Not set."}</span>
          </div>

          <div className="nade-meta-item">
            <h4>Technique</h4>
            <span>{technique ? techniqueString(technique) : "Not set."}</span>
          </div>

          {tickrate && (
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
          .nade-meta-tick {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .nade-meta-tick span {
            margin-right: 4px;
          }

          .nade-meta {
            display: flex;
            color: white;
          }

          .nade-meta-item {
            padding: 10px;
            text-align: center;
            flex: 1;
            white-space: nowrap;
            border-right: 1px solid rgba(0, 0, 0, 0.05);
            background: #729b79;
            display: flex;
            flex-direction: column;
          }

          .nade-meta-item:first-child {
            border-top-left-radius: ${isMobile ? 0 : 8}px;
          }

          .nade-meta-item:last-child {
            border-right: none;
            border-top-right-radius: ${isMobile ? 0 : 8}px;
          }

          h4 {
            margin: 0;
            padding: 0;
            font-size: 12px;
            line-height: 12px;
            font-weight: 500;
            margin-bottom: 4px;
          }

          span {
            font-size: 14px;
            line-height: 14px;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </>
    );
  }
);
