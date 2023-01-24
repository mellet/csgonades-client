import Link from "next/link";
import { FC } from "react";
import { FaCommentDots } from "react-icons/fa";
import { useSignedInUser } from "../../core/authentication/useSignedInUser";
import { User } from "../../users/models/User";
import { NewCommentNotification } from "../models/Notification";
import { NotificationItemLayout } from "./NotificationItemLayout";

type Props = {
  notification: NewCommentNotification;
};

export const CommentNotificationItem: FC<Props> = ({ notification }) => {
  const { signedInUser } = useSignedInUser();

  if (!signedInUser) {
    return null;
  }

  return (
    <Link
      href={`/nades/${notification.nadeSlug || notification.nadeId}`}
      legacyBehavior
    >
      <a>
        <NotificationItemLayout
          icon={<FaCommentDots />}
          createdAt={notification.createdAt}
          message={notificationMessage(notification, signedInUser)}
          imageUrl={notification.thumnailUrl}
          isUnviewed={!notification.viewed}
        />
      </a>
    </Link>
  );
};

function notificationMessage(
  notification: NewCommentNotification,
  signedInUser: User
): string {
  if (notification.nadeOwner !== signedInUser.steamId) {
    return `${notification.byNickname} commented on a nade you recently commented on.`;
  }

  return `${notification.byNickname} commented on your nade.`;
}
