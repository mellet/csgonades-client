import Link from "next/link";
import { FC } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { ReportNotification } from "../models/Notification";
import { NotificationItemLayout } from "./NotificationItemLayout";

type Props = {
  notification: ReportNotification;
};

export const ReportNotificationItem: FC<Props> = ({ notification }) => {
  return (
    <Link href="/admin/reports">
      <a id="contact-notification">
        <NotificationItemLayout
          icon={<FaExclamationTriangle />}
          createdAt={notification.createdAt}
          message={"Nade reported."}
        />
      </a>
    </Link>
  );
};
