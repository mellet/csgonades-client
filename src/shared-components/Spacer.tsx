import styled from "styled-components";
import { Dimensions } from "../constants/Constants";

type SpacerProps = {
  vertical?: boolean;
};

export const Spacer = styled.div<SpacerProps>`
  display: inline-flex;
  flex-direction: ${({ vertical }) => (vertical ? "column" : "row")};

  & > * {
    margin-right: ${({ vertical }) =>
      vertical ? 0 : Dimensions.GUTTER_SIZE}px;
    margin-bottom: ${({ vertical }) =>
      vertical ? Dimensions.GUTTER_SIZE : 0}px;
  }

  & > *:last-child {
    margin-right: 0;
    margin-bottom: 0;
  }
`;
