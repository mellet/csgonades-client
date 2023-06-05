import { FC } from "react";
import { Dimensions } from "../../../constants/Constants";
import { FaEye } from "react-icons/fa";
import { useTheme } from "../../../core/settings/SettingsHooks";

type Props = {
  viewCount: number;
  commentCount: number;
};

export const NadeStats: FC<Props> = ({ viewCount }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="nade-stats">
        <div className="stat-item">
          <FaEye />
          <span>{viewCount}</span>
        </div>
      </div>
      <style jsx>{`
        .nade-stats {
          display: flex;
          justify-content: flex-end;
        }

        .stat-item {
          display: flex;
          align-items: center;
          margin-left: 12px;
          font-size: 12px;
          color: ${colors.GREY};
          background: ${colors.DP03};
          padding: 4px ${Dimensions.PADDING_MEDIUM};
          border-bottom-right-radius: ${Dimensions.BORDER_RADIUS};
          border-bottom-left-radius: ${Dimensions.BORDER_RADIUS};
          border: 1px solid ${colors.BORDER};
        }

        .stat-item span {
          margin-left: 4px;
        }
      `}</style>
    </>
  );
};
