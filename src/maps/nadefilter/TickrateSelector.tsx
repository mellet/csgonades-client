import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { useFilterByTickrate } from "../../store/MapStore/hooks/useFilterByTickrate";
import { ButtonGroup } from "./ButtonGroup";
import { Dimensions } from "../../constants/Constants";
import { HelpTip } from "./HelpTip";

type Props = {};

export const TickrateSelector: FC<Props> = ({}) => {
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

  return (
    <>
      <div className="tick-filter-wrap">
        <div className="label">
          TICKRATE{" "}
          <HelpTip>
            <div>Matchmaking: 64 Tick</div>
            <div>3rd Party Services: 128 Tick</div>
          </HelpTip>
        </div>
        <div className="filter-tick">
          <ButtonGroup>
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
          </ButtonGroup>
        </div>
      </div>
      <style jsx>{`
        .label {
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 5px;
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
