import Link from "next/link";
import { FC } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { NewNadeNotification } from "../models/Notification";
import { NotificationItemLayout } from "./NotificationItemLayout";

type Props = {
  notification: NewNadeNotification;
};

export const NewNadeNotificationItem: FC<Props> = ({ notification }) => {
  return (
    <Link href={`/nades/${notification.nadeSlug || notification.nadeId}`}>
      <a>
        <NotificationItemLayout
          icon={<FaPlusCircle />}
          createdAt={notification.createdAt}
          message={"New nade added for review."}
          isUnviewed={!notification.viewed}
        />
      </a>
    </Link>
  );
};
