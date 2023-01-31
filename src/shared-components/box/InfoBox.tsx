import { CSSProperties, FC, useMemo } from "react";
import { FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/SettingsHooks";

type Props = {
  type: "info" | "warning" | "error";
  style?: CSSProperties;
  title?: string;
};

export const InfoBox: FC<Props> = ({ type, children, style, title }) => {
  const { colors } = useTheme();
  const bgColor = useMemo(() => {
    switch (type) {
      case "info":
        return "#f09800";
      default:
        return "#f09800";
    }
  }, [type]);
  const boxIcon = useMemo(() => {
    switch (type) {
      case "error":
      case "warning":
        return <FaExclamationTriangle size={60} />;
      case "info":
        return <FaInfoCircle size={60} />;
      default:
        break;
    }
  }, [type]);

  return (
    <>
      <div className="info-box" style={style}>
        <span className="icon">{boxIcon}</span>
        {title && <div className="title">{title}</div>}
        <span className="content">{children}</span>
      </div>
      <style jsx>{`
        .info-box {
          background: ${bgColor};
          color: white;
          padding: ${Dimensions.PADDING_MEDIUM};
          border-radius: ${Dimensions.BORDER_RADIUS};
          border: 1px solid ${colors.BORDER};
          position: relative;
        }

        .icon {
          position: absolute;
          top: -15px;
          right: -15px;
          opacity: 0.3;
        }

        .title {
          font-weight: 400;
          margin-bottom: 10px;
          font-size: 18px;
        }
      `}</style>
    </>
  );
};
