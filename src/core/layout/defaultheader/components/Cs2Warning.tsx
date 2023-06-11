import { FC } from "react";
import { useTheme } from "../../../settings/useTheme";
import { Dimensions } from "../../../../constants/Constants";

export const Cs2Warning: FC = () => {
  const { colors } = useTheme();
  return (
    <>
      <div className="cs2-warning">
        CS2 is in closed beta so expect very little content at this time.
      </div>
      <style jsx>{`
        .cs2-warning {
          position: absolute;
          top: 0;
          left: calc(50% - 220px);
          width: 440px;
          background: ${colors.ERROR};
          border: 1px solid ${colors.BORDER};
          border-top: none;
          font-size: 14px;
          color: white;
          text-align: center;
          padding: 6px 12px;
          border-bottom-left-radius: ${Dimensions.BORDER_RADIUS};
          border-bottom-right-radius: ${Dimensions.BORDER_RADIUS};
        }
      `}</style>
    </>
  );
};
