import { CSSProperties, FC } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Dimensions } from "../../../constants/Constants";

type Props = {
  title?: string;
  style?: CSSProperties;
};

export const HintBox: FC<Props> = ({ children, title, style }) => {
  return (
    <>
      <div className="hint-box" style={style}>
        {title && <h3>{title} </h3>}
        <span className="icon">
          <FaInfoCircle />
        </span>
        <div className="hintbox-content">{children}</div>
      </div>
      <style jsx>{`
        .hint-box {
          border-radius: ${Dimensions.BORDER_RADIUS};
          background: #0080a3;
          color: white;
          position: relative;
          overflow: hidden;
        }

        h3 {
          font-size: 18px;
          line-height: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: ${Dimensions.GUTTER_SIZE}px ${Dimensions.GUTTER_SIZE}px 0
            ${Dimensions.GUTTER_SIZE}px;
          margin: 0;
          font-weight: 400;
        }

        .icon {
          font-size: 75px;
          opacity: 0.25;
          position: absolute;
          top: -15px;
          right: -15px;
        }

        .hintbox-content {
          padding: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
