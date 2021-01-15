import { FC, memo, useMemo, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNotifications } from "../data/NotificationHooks";
import { useTheme } from "../../core/settings/SettingsHooks";
import { NotificationList } from "./NotificationList";

export const NotificationIndicator: FC = memo(() => {
  const [notificationTabVisible, setNotificationTabVisible] = useState(false);
  const { colors } = useTheme();
  const { notificationCount } = useNotifications();

  function toggleNotificationTab() {
    setNotificationTabVisible(!notificationTabVisible);
  }

  const notificationBtnClassNames = useMemo(() => {
    const classes = ["notification-indicator"];
    if (notificationCount) {
      classes.push("active");
    }
    return classes.join(" ");
  }, [notificationCount]);

  return (
    <>
      <div className="notification-wrapper">
        <button
          className={notificationBtnClassNames}
          onClick={toggleNotificationTab}
        >
          <FaBell style={{ position: "relative", top: 1, left: -2 }} />
          <span>{notificationCount}</span>
        </button>
        <NotificationList visble={notificationTabVisible} />
      </div>
      <style jsx>{`
        .notification-wrapper {
          align-items: center;
          display: flex;
          font-size: 0.9em;
          position: relative;
          z-index: 999;
        }

        .notification-indicator {
          background: transparent;
          border-radius: 4px;
          border: 1px solid ${colors.BORDER};
          color: ${colors.GREY};
          cursor: pointer;
          font-weight: bold;
          outline: none;
          padding: 6px;
          transition: border 0.2s, color 0.2s;
        }

        .notification-indicator.active {
          border: 1px solid ${colors.PRIMARY};
          color: ${colors.PRIMARY};
        }

        .notification-indicator:hover {
          border: 1px solid ${colors.TEXT};
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
});
