import { FC } from "react";
import { useTheme } from "../../../../store/SettingsStore/SettingsHooks";
import { useFilterByTickrate } from "../../../../store/MapStore/hooks/useFilterByTickrate";
import { ButtonGroup } from "./ButtonGroup";
import { Dimensions } from "../../../../constants/Constants";
import { FilterLabel } from "./FilterLabel";

export const TickrateSelector: FC = () => {
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
        <FilterLabel value="TICK" />
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
          flex-direction: column;
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
          font-size: 14px;
          font-weight: 300;
          background: ${colors.filterBg};
          color: ${colors.filterColor};
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 0;
        }

        .filter-btn:first-child {
          border-top: 0px solid rgba(0, 0, 0, 0.1);
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
