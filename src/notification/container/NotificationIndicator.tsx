import { FC, memo, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNotifications } from "../data/NotificationHooks";
import { useTheme } from "../../core/settings/SettingsHooks";
import { NotificationList } from "./NotificationList";
import { IconButton } from "../../shared-components/buttons/IconButton";

export const NotificationIndicator: FC = memo(() => {
  const [notificationTabVisible, setNotificationTabVisible] = useState(false);
  const { colors } = useTheme();
  const {
    notificationCount,
    notifications,
    setAllNotificationsAsViewed,
  } = useNotifications();

  function toggleNotificationTab() {
    setNotificationTabVisible(!notificationTabVisible);
  }

  return (
    <>
      <div className="notification-wrapper">
        <IconButton
          icon={<FaBell />}
          labelCount={notificationCount}
          onClick={toggleNotificationTab}
          activeColor={colors.SUCCESS}
        />

        {notificationTabVisible && (
          <div id="notification-placer">
            <NotificationList
              markAsViewed={setAllNotificationsAsViewed}
              notifications={notifications}
            />
          </div>
        )}
      </div>
      <style jsx>{`
        .notification-wrapper {
          align-items: center;
          display: flex;
          font-size: 0.9em;
          position: relative;
          z-index: 999;
        }

        #notification-placer {
          position: absolute;
          right: 0;
          top: calc(100% + 6px);
          width: 350px;
          z-index: 1000;
          max-height: 40vh;
          overflow-y: auto;
        }
      `}</style>
    </>
  );
});
