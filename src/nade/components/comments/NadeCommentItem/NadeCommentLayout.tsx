import styled from "styled-components";

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
  padding: 8px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  background: ${({ theme }) => theme.colors.DP03};
`;

export const NadeCommentBody = styled.div`
  grid-area: body;
  background: ${({ theme }) => theme.colors.DP03};
  padding: 8px;
`;

export const NadeCommentTime = styled.div`
  grid-area: time;
  color: ${({ theme }) => theme.colors.GREY};
  font-size: 12px;
  background: ${({ theme }) => theme.colors.DP03};
  padding: 8px;
  padding-top: 0;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;

export const NadeCommentActions = styled.div`
  grid-area: action;
  margin-right: 10px;
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
