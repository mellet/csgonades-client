import { FC } from "react";
import { useTheme } from "../../../../core/settings/SettingsHooks";

type Props = {
  values: string[];
  selectedIndex: number;
};

export const OptionCarusel: FC<Props> = ({ values, selectedIndex }) => {
  const { colors, theme } = useTheme();
  const currentValue = values[selectedIndex];

  return (
    <>
      <div className="option-carusel">
        <span className="option-value">{currentValue}</span>
        <div className="indicator">
          {values.map((val, idx) => (
            <div
              key={val}
              className={
                idx === selectedIndex
                  ? "indiciator-circle active"
                  : "indiciator-circle"
              }
            ></div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .option-carusel {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .option-value {
          font-size: 15px;
          line-height: 15px;
          display: block;
          width: 100%;
          text-align: center;
          margin-bottom: 3px;
          padding-top: 4px;
          color: ${colors.TEXT};
        }

        .indicator {
          display: flex;
        }

        .indiciator-circle {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${theme === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)"};
          margin-right: 2px;
        }

        .active {
          background: #00b8d9;
        }

        .indiciator-circle:last-child {
          margin-right: 0;
        }
      `}</style>
    </>
  );
};
