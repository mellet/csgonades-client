import Link from "next/link";
import { FC } from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import {
  AcceptedNadeNotification,
  DeclinedNadeNotification,
} from "../models/Notification";
import { NotificationItemLayout } from "./NotificationItemLayout";

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
        />
      </a>
    </Link>
  );
};

function notificationMessage(
  notification: AcceptedNadeNotification | DeclinedNadeNotification
): string {
  if (notification.type === "accepted-nade") {
    return "Your nade was accepted!";
  } else {
    return "Your nade was declined!";
  }
}
