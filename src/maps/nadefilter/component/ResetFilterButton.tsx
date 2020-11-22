import { FC, memo } from "react";
import { FaUndo } from "react-icons/fa";
import { useFilterReset } from "../../../store/MapStore/hooks/useFilterReset";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";

type Props = {
  vertical?: boolean;
};

export const ResetFilterButton: FC<Props> = memo(({ vertical }) => {
  const { colors } = useTheme();
  const { canReset, resetFilter } = useFilterReset();

  function onReset() {
    if (canReset) {
      resetFilter();
    }
  }

  const visible = canReset ? "visible" : "";

  return (
    <>
      <div className={`reset ${visible}`}>
        <div className="label">RESET</div>
        <button className={`filter-btn`} onClick={onReset}>
          <FaUndo />
        </button>
      </div>
      <style jsx>{`
        .reset {
          opacity: 0;
          pointer-events: none;
        }

        .filter-btn {
          border: none;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: #767676;
          background: rgba(173, 0, 0, 0.7);
          color: white;
          border-radius: 5px;
          transition: all 0.1s;
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
          display: flex;
          height: ${Dimensions.BUTTON_HEIGHT}px;
          width: ${Dimensions.BUTTON_HEIGHT}px;
          cursor: pointer;
        }

        .label {
          font-size: 12px;
          margin-bottom: 5px;
          font-weight: 500;
          color: ${vertical ? "white" : colors.TEXT};
        }

        .icon {
          font-size: 11px;
          position: relative;
          top: 1px;
        }

        .visible {
          pointer-events: auto;
          opacity: 1;
        }
      `}</style>
    </>
  );
});
