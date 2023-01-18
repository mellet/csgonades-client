import { CSSProperties, FC } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/SettingsHooks";

type Props = {
  title?: string;
  style?: CSSProperties;
};

export const HintBox: FC<Props> = ({ children, title, style }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="hint-box" style={style}>
        {title && (
          <h3>
            {title}{" "}
            <span className="icon">
              <FaInfoCircle />
            </span>
          </h3>
        )}
        <div className="hintbox-content">{children}</div>
      </div>
      <style jsx>{`
        .hint-box {
          border: 1px solid #ffcc40;
          border-radius: ${Dimensions.BORDER_RADIUS};
          background: #fff9eb;
          color: #543f00;
          position: relative;
        }

        .hint-label {
          position: absolute;
          left: ${Dimensions.GUTTER_SIZE}px;
          top: -10px;
          font-size: 12px;
        }

        h3 {
          font-size: 20px;
          line-height: 20px;
          background: #fffbf0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: ${Dimensions.GUTTER_SIZE}px;
          border-bottom: 1px solid #ffcc40;
          margin: 0;
          color: #a67c00;
        }

        .icon {
          color: #ffcc40;
        }

        .hintbox-content {
          padding: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
