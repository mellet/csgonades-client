import { FC, useEffect } from "react";
import { NotificationItem } from "./NotificationItem";
import { Notification } from "../models/Notification";
import styled from "styled-components";
import { Dimensions } from "../../constants/Constants";

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
      markAsViewed();
    }, 1500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  margin-bottom: ${Dimensions.GUTTER_SIZE}px;
`;

const EmptyNotifications = styled.div`
  background: ${({ theme }) => theme.colors.DP03};
  color: ${({ theme }) => theme.colors.TEXT};
  border: 1px solid ${({ theme }) => theme.colors.BORDER};
  padding: 10px 15px;
`;
