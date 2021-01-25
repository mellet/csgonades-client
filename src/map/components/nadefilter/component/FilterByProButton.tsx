import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useTheme } from "../../../../core/settings/SettingsHooks";
import { Dimensions } from "../../../../constants/Constants";
import { useFilterByPro } from "../../../data/hooks/useFilterByPro";
import { FilterLabel } from "./FilterLabel";

export const FilterByProButton: FC = () => {
  const { colors } = useTheme();
  const { byPro, toggleFilterByPro } = useFilterByPro();

  const active = byPro ? "active" : "";

  function onFilterByPro() {
    toggleFilterByPro();
  }

  return (
    <>
      <div className="fav-filter-wrap">
        <FilterLabel value="PRO" />
        <button
          className={`filter-btn favorite ${active}`}
          onClick={onFilterByPro}
        >
          <div className="icon-wrap">
            <FaCheckCircle size={Dimensions.BUTTON_HEIGHT - 14} />
          </div>
        </button>
      </div>

      <style jsx>{`
        .filter-btn {
          border: none;
          outline: none;
          background: ${colors.filterBg};
          width: ${Dimensions.BUTTON_HEIGHT}px;
          height: ${Dimensions.BUTTON_HEIGHT}px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: #767676;
          cursor: pointer;
          overflow: hidden;
          border-radius: 5px;
        }

        .favorite {
          color: #00b8d9;
        }

        .filter-btn:hover {
          background: ${colors.filterBgHover};
        }

        .active {
          background: ${colors.filterBgHover};
        }

        .icon-wrap {
          position: relative;
          top: 2px;
        }
      `}</style>
    </>
  );
};
