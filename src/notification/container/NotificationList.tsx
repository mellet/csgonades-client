import { FC, useEffect, useMemo } from "react";
import { Notification } from "../models/Notification";
import styled from "styled-components";
import { Dimensions } from "../../constants/Constants";
import { NotificationGroup } from "./NotificationGroup";

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

  const { todayNotifications, weekNotifications, oldNotifications } =
    useMemo(() => {
      const todayNotifications = notifications.filter((n) =>
        isDateToday(n.createdAt)
      );
      const weekNotifications = notifications.filter((n) => {
        return !isDateToday(n.createdAt) && isDateInThisWeek(n.createdAt);
      });
      const oldNotifications = notifications.filter((n) => {
        return !isDateInThisWeek(n.createdAt);
      });

      return { todayNotifications, weekNotifications, oldNotifications };
    }, [notifications]);

  if (notifications.length === 0) {
    return <EmptyNotifications>No notifications.</EmptyNotifications>;
  }

  return (
    <NotificationListWrapper>
      <NotificationGroup label="Today" notifications={todayNotifications} />
      <NotificationGroup label="This week" notifications={weekNotifications} />
      <NotificationGroup label="Earlier" notifications={oldNotifications} />
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

function isDateToday(date: Date | string) {
  const checkDate = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  return (
    now.getDate() === checkDate.getDate() &&
    now.getMonth() === checkDate.getMonth()
  );
}

function isDateInThisWeek(inputDate: Date | string) {
  const date = typeof inputDate === "string" ? new Date(inputDate) : inputDate;

  const todayObj = new Date();
  const todayDate = todayObj.getDate();
  const todayDay = todayObj.getDay();

  // get first date of week
  const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));

  // get last date of week
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

  // if date is equal or within the first and last dates of the week
  return date >= firstDayOfWeek && date <= lastDayOfWeek;
}
