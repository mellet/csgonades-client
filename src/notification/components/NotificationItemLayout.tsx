import Image from "next/image";
import { FC } from "react";
import styled from "styled-components";
import { prettyDateTime } from "../../utils/DateUtils";

type Props = {
  icon?: JSX.Element;
  message: string;
  imageUrl?: string;
  createdAt: Date;
};

export const NotificationItemLayout: FC<Props> = ({
  icon,
  message,
  createdAt,
  imageUrl,
}) => {
  return (
    <NotificationItemLayoutWrap>
      {icon && <NotificationItemIcon>{icon}</NotificationItemIcon>}
      <NotificationItemMessage>{message}</NotificationItemMessage>
      <NotificationItemDate>{prettyDateTime(createdAt)}</NotificationItemDate>
      {imageUrl && (
        <NotificationImageWrap>
          <Image src={imageUrl} layout="fill" objectFit="cover" quality={100} />
        </NotificationImageWrap>
      )}
    </NotificationItemLayoutWrap>
  );
};

const NotificationItemLayoutWrap = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-template-areas:
    "icon message image"
    "date date date";
  grid-row-gap: 10px;
  background: ${({ theme }) => theme.colors.DP03};
  color: ${({ theme }) => theme.colors.TEXT};
  border-bottom: 1px solid ${({ theme }) => theme.colors.BORDER};
  padding: 10px 15px;
`;

const NotificationItemIcon = styled.span`
  grid-area: icon;
  margin-right: 10px;
`;

const NotificationItemDate = styled.span`
  grid-area: date;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.GREY};
`;

const NotificationItemMessage = styled.span`
  grid-area: message;
`;

const NotificationImageWrap = styled.div`
  grid-area: image;
  width: 100px;
  position: relative;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  margin-left: 10px;
`;
