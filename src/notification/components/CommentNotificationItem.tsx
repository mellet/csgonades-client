import Link from "next/link";
import { FC } from "react";
import { FaCommentDots } from "react-icons/fa";
import { NewCommentNotification } from "../models/Notification";
import { NotificationItemLayout } from "./NotificationItemLayout";

type Props = {
  notification: NewCommentNotification;
};

export const CommentNotificationItem: FC<Props> = ({ notification }) => {
  return (
    <Link href={`/nades/${notification.nadeSlug || notification.id}`}>
      <a>
        <NotificationItemLayout
          icon={<FaCommentDots />}
          createdAt={notification.createdAt}
          message={notificationMessage(notification)}
          imageUrl={notification.thumnailUrl}
        />
      </a>
    </Link>
  );
};

function notificationMessage(notification: NewCommentNotification): string {
  return `${notification.byNickname} commented on your nade.`;
}
