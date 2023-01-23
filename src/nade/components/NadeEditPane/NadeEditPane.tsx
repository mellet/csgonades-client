import { FC } from "react";
import { useTheme } from "../../../core/settings/SettingsHooks";

type Props = {
  title: string;
  isActive?: boolean;
  onClick: () => void;
};

export const NadeEditPane: FC<Props> = ({ onClick, title, isActive }) => {
  const { colors } = useTheme();
  return (
    <>
      <button className="pane-item" onClick={onClick}>
        <span>{title}</span>
      </button>
      <style jsx>{`
        .pane-item {
          border: none;
          border-right: 1px solid ${colors.BORDER};
          padding: 8px 12px;
          background: ${isActive ? colors.DP03 : "transparent"};
          cursor: pointer;
          font-size: 13px;
          border-bottom: 2px solid
            ${isActive ? colors.filterBgHover : "transparent"};
          border-top: 2px solid transparent;
          color: ${isActive ? colors.TEXT : colors.GREY};
        }

        span {
        }

        .pane-item:last-child {
          border-right: none;
        }
      `}</style>
    </>
  );
};
