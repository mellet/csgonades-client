import { FC, memo } from "react";
import { tickrateString, Tickrate } from "../../models/NadeTickrate";
import { nadeTypeString, NadeType } from "../../models/NadeType";
import { techniqueString, Technique } from "../../models/Technique";
import { capitalize } from "../../../utils/Common";
import { Movement } from "../../models/NadeMovement";
import { Dimensions } from "../../../constants/Constants";

type Props = {
  movement?: Movement;
  rounded?: boolean;
  technique?: Technique;
  tickrate?: Tickrate;
  type?: NadeType;
};

export const NadeMeta: FC<Props> = memo(
  ({ movement, type, technique, tickrate }) => {
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
              <span>{tickrateString(tickrate)}</span>
            </div>
          )}
        </div>
        <style jsx>{`
          .nade-meta {
            margin-left: ${Dimensions.GUTTER_SIZE}px;
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
            border-top-left-radius: 8px;
          }

          .nade-meta-item:last-child {
            border-right: none;
            border-top-right-radius: 8px;
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
