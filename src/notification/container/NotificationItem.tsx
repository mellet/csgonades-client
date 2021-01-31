import { FC } from "react";
import { assertNever } from "../../utils/Common";
import { CommentNotificationItem } from "../components/CommentNotificationItem";
import { ContactNotificationItem } from "../components/ContactNotificationItem";
import { FavoriteNotificationItem } from "../components/FavoriteNotificationItem";
import { NewNadeNotificationItem } from "../components/NewNadeNotificationItem";
import { ReportNotificationItem } from "../components/ReportNotificationItem";
import { StatusNotificationItem } from "../components/StatusNotificationItem";
import { Notification } from "../models/Notification";

export type NotificationItemProps = {
  notification: Notification;
};

export const NotificationItem: FC<NotificationItemProps> = ({
  notification,
}) => {
  switch (notification.type) {
    case "contact-msg":
      return <ContactNotificationItem notification={notification} />;
    case "favorite-agregate":
      return <FavoriteNotificationItem notification={notification} />;
    case "accepted-nade":
    case "declined-nade":
      return <StatusNotificationItem notification={notification} />;
    case "new-comment":
      return <CommentNotificationItem notification={notification} />;
    case "report":
      return <ReportNotificationItem notification={notification} />;
    case "new-nade":
      return <NewNadeNotificationItem notification={notification} />;
    case "favorite":
      return null;
    default:
      assertNever(notification);
      return null;
  }
};
