import { FC } from "react";
import { kFormatter } from "../../../utils/Common";

type Props = {
  alwaysShow?: boolean;
  color: string;
  count: number;
  hidden?: boolean;
  icon: any;
  iconColor?: string;
};

export const StatItem: FC<Props> = ({
  alwaysShow,
  color,
  count,
  hidden,
  icon,
  iconColor,
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
          color: ${color};
          display: flex;
          font-size: 11px;
          font-weight: 400;
          margin-right: 15px;
        }

        .icon {
          color: ${iconColor || color};
          font-size: 12px;
          margin-right: 2px;
          position: relative;
          top: 1px;
        }
      `}</style>
    </>
  );
};
