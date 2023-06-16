import { FC, memo } from "react";
import { Dimensions } from "../../constants/Constants";
import { useNotifications } from "../data/NotificationHooks";
import { NotificationList } from "./NotificationList";
import { useTheme } from "../../core/settings/useTheme";

export const NotificationMain: FC = memo(() => {
  const { colors } = useTheme();
  const { notifications, setAllNotificationsAsViewed } = useNotifications();

  return (
    <>
      <h2>Notifications</h2>
      <NotificationList
        notifications={notifications}
        markAsViewed={setAllNotificationsAsViewed}
      />
      <style jsx>{`
        h2 {
          padding: 0;
          margin: 0;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
});
