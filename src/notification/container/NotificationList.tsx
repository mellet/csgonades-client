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
    const timer = setTimeout(() => {
      if (notifications.length) {
        console.log("Marking as viewed");
        markAsViewed();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [markAsViewed, notifications.length]);

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
