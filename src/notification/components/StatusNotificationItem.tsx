import Link from "next/link";
import { FC } from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import {
  AcceptedNadeNotification,
  DeclinedNadeNotification,
} from "../models/Notification";
import { NotificationItemLayout } from "./NotificationItemLayout";
import { dateMinutesAgo } from "../../utils/DateUtils";

type Props = {
  notification: AcceptedNadeNotification | DeclinedNadeNotification;
};

export const StatusNotificationItem: FC<Props> = ({ notification }) => {
  return (
    <Link href={`/nades/${notification.nadeSlug || notification.nadeId}`}>
      <a>
        <NotificationItemLayout
          icon={
            notification.type === "accepted-nade" ? (
              <FaCheckCircle />
            ) : (
              <FaExclamationTriangle />
            )
          }
          createdAt={notification.createdAt}
          message={notificationMessage(notification)}
          imageUrl={notification.thumnailUrl}
          isUnviewed={!notification.viewed}
        />
      </a>
    </Link>
  );
};

function notificationMessage(
  notification: AcceptedNadeNotification | DeclinedNadeNotification
): string {
  const minutesAgo = dateMinutesAgo(notification.createdAt);

  if (notification.type === "accepted-nade") {
    if (minutesAgo < 30) {
      return "Your nade was accepted! It can take up to 30 minutes before it appears on the site.";
    }
    return "Your nade was accepted!";
  } else {
    return "Your nade was declined!";
  }
}
