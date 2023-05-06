import Image from "next/image";
import { FC } from "react";
import { useTheme } from "../../core/settings/SettingsHooks";
import { prettyDateTime } from "../../utils/DateUtils";

type Props = {
  icon?: JSX.Element;
  message: string;
  imageUrl?: string;
  isUnviewed?: boolean;
  createdAt: Date;
};

export const NotificationItemLayout: FC<Props> = ({
  icon,
  message,
  createdAt,
  imageUrl,
  isUnviewed,
}) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="notification-layout">
        {icon && <span className="icon">{icon}</span>}
        <span className="message">{message}</span>
        <span className="date">{prettyDateTime(createdAt)}</span>
        {imageUrl && (
          <div className="image">
            <Image alt="Nade image" fill src={imageUrl} />
          </div>
        )}
      </div>
      <style jsx>{`
        .notification-layout {
          display: grid;
          grid-template-columns: min-content min-content 1fr min-content;
          grid-template-areas:
            "image icon message date"
            "image icon message date";
          grid-row-gap: 10px;
          background: ${isUnviewed ? colors.HIGHLIGHT_BG : colors.DP03};
          border-bottom: 1px solid ${colors.BORDER};
          color: ${colors.TEXT};
          padding: 10px 12px;
        }

        .notification-layout:hover {
          background: ${colors.DP02};
        }

        .icon {
          grid-area: icon;
          margin-right: 10px;
        }

        .message {
          grid-area: message;
        }

        .date {
          grid-area: date;
          font-size: 14px;
          white-space: nowrap;
          color: ${colors.GREY};
        }

        .image {
          grid-area: image;
          width: 100px;
          position: relative;
          height: 100%;
          border-radius: 4px;
          overflow: hidden;
          margin-right: 8px;
          min-height: 40px;
        }
      `}</style>
    </>
  );
};
