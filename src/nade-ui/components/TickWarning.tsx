import { FC, memo } from "react";
import { Tickrate } from "../../nade-data/Nade/NadeTickrate";

type Props = {
  tickrate?: Tickrate;
};

export const TickWarning: FC<Props> = memo(({ tickrate }) => {
  if (!tickrate || tickrate !== "tick128") {
    return null;
  }

  return (
    <>
      <div className="matchmake-warning">
        <div className="warning-msg">
          <div className="warning-title">
            <b>WARNING:</b> Will not work, or be suboptimal if you play
            matchmaking. This nade is made for 128 tick servers.
          </div>
        </div>
      </div>
      <style jsx>{`
        .matchmake-warning {
          background: #ad540a;
          color: white;
          padding: 5px 20px;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .warning-msg {
          display: flex;
        }

        .warning-title {
          font-weight: 400;
          margin-right: 8px;
          font-size: 14px;
        }

        .warning-title b {
          font-weight: 500;
        }
      `}</style>
    </>
  );
});
