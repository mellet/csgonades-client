import { FC } from "react";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";
import { useFilterByTickrate } from "../../../store/MapStore/hooks/useFilterByTickrate";
import { ButtonGroup } from "./ButtonGroup";
import { Dimensions } from "../../../constants/Constants";
import { HelpTip } from "./HelpTip";
import Link from "next/link";

type Props = {
  vertical?: boolean;
};

export const TickrateSelector: FC<Props> = ({ vertical }) => {
  const { colors } = useTheme();
  const { byTickrate, filterByTickrate } = useFilterByTickrate();

  function filterBy64tick() {
    filterByTickrate("tick64");
  }

  function filterByTickrate128() {
    filterByTickrate("tick128");
  }

  const tick64active = byTickrate === "tick64" ? "active" : "";
  const tick128active = byTickrate === "tick128" ? "active" : "";

  const labelText = vertical ? "TICK" : "TICKRATE";

  return (
    <>
      <div className="tick-filter-wrap">
        <div className="label">
          {labelText}{" "}
          <HelpTip hintLabel="Tickrate">
            <div>
              <b>Matchmaking:</b> 64 Tick
            </div>
            <div>
              <b>3rd Party Services:</b> 128 Tick
            </div>
            <div>
              <Link
                href="/blog/tickrate-and-jumpthrow-bind"
                as="/blog/tickrate-and-jumpthrow-bind"
              >
                <a>Read why.</a>
              </Link>
            </div>
          </HelpTip>
        </div>
        <div className="filter-tick">
          <ButtonGroup>
            <div className="filter-btns">
              <button
                className={`filter-btn tickrate-btn ${tick64active}`}
                onClick={filterBy64tick}
              >
                64
              </button>

              <button
                className={`filter-btn tickrate-btn ${tick128active}`}
                onClick={filterByTickrate128}
              >
                128
              </button>
            </div>
          </ButtonGroup>
        </div>
      </div>
      <style jsx>{`
        .filter-btns {
          display: flex;
          flex-direction: ${vertical ? "column" : "row"};
          margin-right: -1px;
        }

        .label {
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 5px;
          color: ${vertical ? "white" : colors.TEXT};
          display: flex;
          align-items: center;
        }

        .filter-tick {
          display: flex;
        }

        .filter-btn {
          display: block;
          border: none;
          outline: none;
          appearance: none;
          width: ${Dimensions.BUTTON_HEIGHT}px;
          height: ${Dimensions.BUTTON_HEIGHT}px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          cursor: pointer;
          font-size: 15px;
          font-weight: 300;
          background: ${colors.filterBg};
          color: ${colors.filterColor};
          border-right: 1px solid rgba(0, 0, 0, 0.5);
        }

        .filter-btn:hover {
          background: ${colors.filterBgHover};
        }

        .active {
          background: ${colors.filterBgHover};
        }
      `}</style>
    </>
  );
};
