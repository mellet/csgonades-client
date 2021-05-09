import { FC, useEffect } from "react";
import { NotificationItem } from "./NotificationItem";
import { Notification } from "../models/Notification";
import styled from "styled-components";

export type NotificationListProps = {
  markAsViewed: () => void;
  notifications: Notification[];
};

export const NotificationList: FC<NotificationListProps> = ({
  notifications,
  markAsViewed,
}) => {
  useEffect(() => {
    const unviewedCount = notifications.filter((n) => !n.viewed).length;

    if (unviewedCount > 0) {
      markAsViewed();
    }
  }, [markAsViewed, notifications]);

  if (notifications.length === 0) {
    return <EmptyNotifications>No notifications.</EmptyNotifications>;
  }

  return (
    <NotificationListWrapper>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </NotificationListWrapper>
  );
};

const NotificationListWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.BORDER};
  border-bottom: none;
  max-width: 350px;
`;

const EmptyNotifications = styled.div`
  max-width: 350px;
  background: ${({ theme }) => theme.colors.DP03};
  color: ${({ theme }) => theme.colors.TEXT};
  border: 1px solid ${({ theme }) => theme.colors.BORDER};
  padding: 10px 15px;
`;
