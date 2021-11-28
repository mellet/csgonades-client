import styled from "styled-components";
import { IconButtonWrapper, IconTextButtonWrapper } from "../IconButton";

type IconButtonGroupProps = {
  vertical?: boolean;
};

export const IconButtonGroup = styled.div<IconButtonGroupProps>`
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: ${({ vertical }) => (vertical ? "column" : "row")};

  & > ${IconButtonWrapper}, ${IconTextButtonWrapper} {
    border-radius: 0;
    overflow: hidden;
    border-right-width: ${({ vertical }) => (vertical ? "1px" : "0px")};
    border-bottom-width: ${({ vertical }) => (vertical ? "0px" : "1px")};
  }

  & > ${IconButtonWrapper}:first-child, ${IconTextButtonWrapper}:first-child {
    border-top-left-radius: ${({ vertical }) => (vertical ? "8px" : "8px")};
    border-top-right-radius: ${({ vertical }) => (vertical ? "8px" : "0px")};
    border-bottom-left-radius: ${({ vertical }) => (vertical ? "0px" : "8px")};
    border-bottom-right-radius: ${({ vertical }) => (vertical ? "0px" : "0px")};
    border-right-width: ${({ vertical }) => (vertical ? "1px" : "0px")};
    border-bottom-width: ${({ vertical }) => (vertical ? "0px" : "1px")};
  }

  & > ${IconButtonWrapper}:last-child, ${IconTextButtonWrapper}:last-child {
    border-top-left-radius: ${({ vertical }) => (vertical ? "0px" : "0px")};
    border-top-right-radius: ${({ vertical }) => (vertical ? "0px" : "8px")};
    border-bottom-left-radius: ${({ vertical }) => (vertical ? "8px" : "0px")};
    border-bottom-right-radius: ${({ vertical }) => (vertical ? "8px" : "8px")};
    border-bottom-width: ${({ vertical }) => (vertical ? "1px" : "1px")};
    border-right-width: ${({ vertical }) => (vertical ? "1px" : "1px")};
  }
`;
