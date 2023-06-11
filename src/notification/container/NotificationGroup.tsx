import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/useTheme";
import { Notification } from "../models/Notification";
import { NotificationItem } from "./NotificationItem";

type Props = {
  label: string;
  notifications: Notification[];
};

export const NotificationGroup: FC<Props> = ({ label, notifications }) => {
  const { colors } = useTheme();
  if (!notifications.length) {
    return null;
  }

  return (
    <>
      <div className="notification-group">
        <h3>{label}</h3>
        <div className="notifications">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .notification-group {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        h3 {
          margin: 0;
          padding: 0;
          margin-bottom: ${Dimensions.GUTTER_SIZE / 2}px;
        }

        .notifications {
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
          border: 1px solid ${colors.BORDER};
        }
      `}</style>
    </>
  );
};
