import { FC } from "react";
import styled from "styled-components";
import { Dimensions } from "../../constants/Constants";

export const NadeSidebar: FC = ({ children }) => {
  const test = (children as any).filter((n) => {
    console.log("#", n);
    return n !== null;
  });

  return <NadeSideBarLayout>{test}</NadeSideBarLayout>;
};

const NadeSideBarLayout = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: ${Dimensions.GUTTER_SIZE}px;
  }
`;
