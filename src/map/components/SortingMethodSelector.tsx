import { FC, useMemo } from "react";
import { FaRocket, FaLongArrowAltUp, FaSith } from "react-icons/fa";
import { useFilterByMethod } from "../data/hooks/useFilterByMethod";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Dimensions } from "../../constants/Constants";

export const SortingMethodSelector: FC = () => {
  const { colors } = useTheme();
  const { byMethod, filterBySortingMethod } = useFilterByMethod();

  const hotClassName = useMemo(() => {
    const base = ["method-selector"];
    if (byMethod === "hot") {
      base.push("selected");
    }
    return base.join(" ");
  }, [byMethod]);

  const newClassName = useMemo(() => {
    const base = ["method-selector"];
    if (byMethod === "new") {
      base.push("selected");
    }
    return base.join(" ");
  }, [byMethod]);

  const topClassName = useMemo(() => {
    const base = ["method-selector"];
    if (byMethod === "top") {
      base.push("selected");
    }
    return base.join(" ");
  }, [byMethod]);

  return (
    <>
      <div className="sorting-wrapper">
        <div className="sorthing-method-selector">
          <div className="sorting-btns">
            <button
              className={hotClassName}
              onClick={() => filterBySortingMethod("hot")}
            >
              <FaRocket />
              <span>HOT</span>
            </button>
            <button
              className={newClassName}
              onClick={() => filterBySortingMethod("new")}
            >
              <FaSith />
              <span>NEW</span>
            </button>
            <button
              className={topClassName}
              onClick={() => filterBySortingMethod("top")}
            >
              <FaLongArrowAltUp />
              <span>TOP</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sorting-label {
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 5px;
          color: ${colors.TEXT};
          display: flex;
          align-items: center;
        }

        .sorthing-method-selector {
          border-radius: 5px;
          overflow: hidden;
        }

        .sorting-btns {
          display: inline-flex;
          margin-right: -1px;
        }

        .method-selector {
          border: none;
          appearance: none;
          background: ${colors.filterBg};
          padding: 10px 10px;
          display: flex;
          align-items: center;
          flex-direction: row;
          cursor: pointer;
          outline: none;
          transition: all 0.2s;
          color: ${colors.filterColor};
          height: ${Dimensions.BUTTON_HEIGHT}px;
          border-right: 1px solid rgba(0, 0, 0, 0.5);
        }

        .method-selector:last-child {
          border-right: none;
        }

        .method-selector span {
          margin-left: 6px;
          font-size: 14px;
        }

        .method-selector:hover {
          background: ${colors.filterBgHover};
        }

        .selected {
          background: ${colors.filterBgHover};
        }
      `}</style>
    </>
  );
};
