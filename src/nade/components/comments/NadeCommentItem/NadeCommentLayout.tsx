import styled from "styled-components";
import { Dimensions } from "../../../../constants/Constants";

export const NadeCommentLayout = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr 1fr;
  grid-template-areas:
    "avatar username username"
    "avatar body body"
    "avatar time time"
    "avatar action action";
  color: ${({ theme }) => theme.colors.TEXT};
  width: 100%;
  margin-bottom: ${Dimensions.GUTTER_SIZE}px;
  background: ${({ theme }) => theme.colors.DP03};
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.BORDER};
  border-radius: 8px;
`;

export const NadeCommentAvatar = styled.img`
  grid-area: avatar;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const NadeCommentNickname = styled.div`
  grid-area: username;
  color: ${({ theme }) => theme.colors.TEXT};
  font-weight: 400;
  margin-bottom: 8px;
`;

export const NadeCommentBody = styled.div`
  grid-area: body;
  max-width: 100%;
`;

export const NadeCommentTime = styled.div`
  grid-area: time;
  color: ${({ theme }) => theme.colors.GREY};
  font-size: 12px;
`;

export const NadeCommentActions = styled.div`
  grid-area: action;
`;
