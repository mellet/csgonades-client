import Link from "next/link";
import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { pluralize } from "../../utils/Common";
import { FavoriteNotificationAgregate } from "../models/Notification";
import { NotificationItemLayout } from "./NotificationItemLayout";

type Props = {
  notification: FavoriteNotificationAgregate;
};

export const FavoriteNotificationItem: FC<Props> = ({ notification }) => {
  return (
    <Link href={`/nades/${notification.nadeSlug || notification.nadeId}`}>
      <a>
        <NotificationItemLayout
          icon={<FaStar />}
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
  notification: FavoriteNotificationAgregate
): string {
  const favCount = notification.count;
  if (favCount === 1) {
    return `Your nade was favorited by ${notification.byNickname}.`;
  } else {
    return `Your nade was favorited by ${
      notification.byNickname
    } and ${pluralize(favCount - 1, "other")}.`;
  }
}
