import Image from "next/image";
import { FC } from "react";
import styled from "styled-components";
import { prettyDateTime } from "../../utils/DateUtils";

type Props = {
  icon?: JSX.Element;
  message: string;
  imageUrl?: string;
  isUnviewed?: boolean;
  createdAt: Date;
};

export const NotificationItemLayout: FC<Props> = ({
  icon,
  message,
  createdAt,
  imageUrl,
  isUnviewed,
}) => {
  return (
    <NotificationItemLayoutWrap isUnviewed={isUnviewed}>
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

const NotificationItemLayoutWrap = styled.div<{ isUnviewed?: boolean }>`
  display: grid;
  grid-template-columns: min-content min-content 1fr min-content;
  grid-template-areas:
    "image icon message date"
    "image icon message date";
  grid-row-gap: 10px;
  background: ${({ theme, isUnviewed }) =>
    isUnviewed ? theme.colors.HIGHLIGHT_BG : theme.colors.DP03};
  border-bottom: 1px solid ${({ theme }) => theme.colors.BORDER};
  color: ${({ theme }) => theme.colors.TEXT};
  padding: 10px 12px;

  &:hover {
    background: ${({ theme }) => theme.colors.DP02};
  }
`;

const NotificationItemIcon = styled.span`
  grid-area: icon;
  margin-right: 10px;
`;

const NotificationItemDate = styled.span`
  grid-area: date;
  font-size: 14px;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.GREY};
`;

const NotificationItemMessage = styled.span`
  grid-area: message;
`;

const NotificationImageWrap = styled.div`
  grid-area: image;
  width: 100px;
  position: relative;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 8px;
  min-height: 40px;
`;
