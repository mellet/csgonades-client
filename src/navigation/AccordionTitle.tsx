import { FC } from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { useTheme } from "../core/settings/SettingsHooks";

type Props = {
  title: string;
  isActive?: boolean;
  hasNew?: boolean;
};

export const AccordianTitle: FC<Props> = ({ title, isActive, hasNew }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="accordion-title">
        <span className="title"> {title}</span>
        {hasNew && <span className="new">NEW</span>}
        <span className="icon">
          {isActive ? <FaArrowDown /> : <FaArrowRight />}
        </span>
      </div>
      <style jsx>{`
        .accordion-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          background: ${colors.filterBg};
          font-size: 14px;
          color: ${colors.filterColor};
          font-weight: 400;
          border-bottom: 1px solid ${colors.BORDER};
        }

        .accordion-title:hover {
          background: ${isActive ? colors.filterBg : colors.filterBgHover};
          cursor: ${isActive ? "auto" : "pointer"};
        }
        .icon {
          position: relative;
          top: 2px;
        }

        .new {
          display: block;
          font-size: 10px;
          color: ${colors.SUCCESS};
          font-weight: 500;
        }
      `}</style>
    </>
  );
};
