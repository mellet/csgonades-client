import styled from "styled-components";
import { Dimensions } from "../../../../constants/Constants";

export const NadeCommentLayout = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-template-areas:
    "avatar username action"
    "avatar body body"
    "avatar time time";
  color: ${({ theme }) => theme.colors.TEXT};
  width: 100%;
  margin-bottom: ${Dimensions.GUTTER_SIZE}px;
`;

export const NadeCommentAvatar = styled.img`
  grid-area: avatar;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 12px;
  margin-top: 8px;
`;

export const NadeCommentNickname = styled.div`
  position: relative;
  grid-area: username;
  color: ${({ theme }) => theme.colors.TEXT};
  font-weight: 400;
  padding: 16px 16px 8px 16px;
  border-top-left-radius: 8px;
  background: ${({ theme }) => theme.colors.DP03};
`;

export const NadeCommentBody = styled.div`
  grid-area: body;
  background: ${({ theme }) => theme.colors.DP03};
  padding: 0px 16px;
`;

export const NadeCommentTime = styled.div`
  grid-area: time;
  color: ${({ theme }) => theme.colors.GREY};
  font-size: 12px;
  background: ${({ theme }) => theme.colors.DP03};
  padding: 16px 16px 8px 16px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;

export const NadeCommentActions = styled.div`
  grid-area: action;
  padding: 0px 0px 0px 0px;
  background: ${({ theme }) => theme.colors.DP03};
  border-top-right-radius: 8px;
  overflow: hidden;
`;

export const NadeCommentArrow = styled.div`
  position: absolute;
  top: 16px;
  left: -8px;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid ${({ theme }) => theme.colors.DP03};
`;
