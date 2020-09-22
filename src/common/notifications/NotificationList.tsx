import { FC, useEffect } from "react";
import { useNotifications } from "../../store/NotificationStore/NotificationHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { NotificationItem } from "./NotificationItem";

type Props = {
  visble: boolean;
};

export const NotificationList: FC<Props> = ({ visble }) => {
  const { notifications, setNotificationsAsViewed } = useNotifications();
  const { colors } = useTheme();

  useEffect(() => {
    if (visble) {
      setNotificationsAsViewed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visble]);

  if (!visble) {
    return null;
  }

  const hasNotifications = notifications.length > 0;

  return (
    <>
      <div className="notification-list">
        {!hasNotifications && (
          <div className="no-noti">
            You don&apos;t have any notifications yet.
          </div>
        )}
        {hasNotifications &&
          notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} />
          ))}
      </div>
      <style jsx>{`
        .notification-list {
          position: absolute;
          top: calc(100% + 13px);
          right: 0;
          background: ${colors.DP03};
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          max-height: 40vh;
          overflow-y: auto;
          width: 300px;
        }

        .no-noti {
          padding: 12px;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
