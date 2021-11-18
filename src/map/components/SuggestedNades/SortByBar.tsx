import { FC } from "react";
import { FaRocket, FaEye } from "react-icons/fa";
import { MdFiberNew } from "react-icons/md";
import { ImStarFull } from "react-icons/im";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { Dimensions } from "../../../constants/Constants";
import { NadeLightSort } from "../../../nade/models/Nade";

type Props = {
  sortBy: NadeLightSort;
  setSortBy: (sortBy: NadeLightSort) => void;
};

export const SortByBar: FC<Props> = ({ sortBy, setSortBy }) => {
  const { colors } = useTheme();

  const methods: { [key in NadeLightSort] } = {
    score: {
      name: "Hot",
      icon: <FaRocket />,
    },
    favoriteCount: {
      name: "Top",
      icon: <ImStarFull />,
    },
    viewCount: {
      name: "Views",
      icon: <FaEye />,
    },
    createdAt: {
      name: "New",
      icon: <MdFiberNew />,
    },
  };

  return (
    <>
      <div className="sorting-wrapper">
        <div className="sorthing-method-selector">
          <div className="sorting-btns">
            {Object.entries(methods).map(([method, values], i) => (
              <button
                key={i}
                className={
                  "method-selector " + (method === sortBy ? "selected" : "")
                }
                onClick={() => setSortBy(method as NadeLightSort)}
              >
                {values.icon}
                <span>{values.name}</span>
              </button>
            ))}
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
