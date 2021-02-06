import styled from "styled-components";
import { IconButtonWrapper } from "../IconButton";

export const IconButtonGroup = styled.div`
  border-radius: 8px;
  overflow: hidden;

  & > ${IconButtonWrapper} {
    border-radius: 0;
    border-bottom: none;
    overflow: hidden;
  }

  & > ${IconButtonWrapper}:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom: none;
  }

  & > ${IconButtonWrapper}:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.buttonBorder};
  }
`;
