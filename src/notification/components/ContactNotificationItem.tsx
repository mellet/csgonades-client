import Link from "next/link";
import { FC } from "react";
import { FaComment } from "react-icons/fa";
import { NewContactNotification } from "../models/Notification";
import { NotificationItemLayout } from "./NotificationItemLayout";

type Props = {
  notification: NewContactNotification;
};

export const ContactNotificationItem: FC<Props> = ({ notification }) => {
  return (
    <Link href="/admin/contact">
      <a>
        <NotificationItemLayout
          icon={<FaComment />}
          createdAt={notification.createdAt}
          message={"New contact message"}
        />
      </a>
    </Link>
  );
};
