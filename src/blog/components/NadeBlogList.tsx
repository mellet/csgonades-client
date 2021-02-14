import styled from "styled-components";
import { Dimensions } from "../../constants/Constants";

export const NadeBlogList = styled.div`
  display: grid;
  grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
  grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
  grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
  margin-bottom: ${Dimensions.GUTTER_SIZE}px;
`;
