import { FC } from "react";
import { kFormatter } from "../../../../utils/Common";

type Props = {
  alwaysShow?: boolean;
  color: string;
  count: number;
  hidden?: boolean;
  icon: any;
  iconColor?: string;
  hoverColor?: string;
};

export const StatItem: FC<Props> = ({
  alwaysShow,
  color,
  count,
  hidden,
  icon,
  iconColor,
  hoverColor,
}) => {
  if ((hidden || !count) && !alwaysShow) {
    return null;
  }

  return (
    <>
      <div className="stat">
        <div className="icon">{icon}</div>
        <div className="count">{kFormatter(count)}</div>
      </div>
      <style jsx>{`
        .stat {
          display: inline-flex;
          align-items: center;
          color: ${color};
          font-size: 11px;
          line-height: 11px;
          font-weight: 400;
          height: 11px;
        }

        .icon {
          color: ${iconColor || color};
          font-size: 11px;
          margin-right: 3px;
          position: relative;
          top: 1px;
          transition: color 0.14s;
        }

        .icon:hover {
          color: ${hoverColor || iconColor || color};
        }
      `}</style>
    </>
  );
};
