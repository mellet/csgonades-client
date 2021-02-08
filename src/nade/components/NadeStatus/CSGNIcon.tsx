import { FC } from "react";
import styled from "styled-components";

type Props = {
  icon: JSX.Element;
  spin?: boolean;
  size?: number;
};

export const CSGNIcon: FC<Props> = ({ icon, size = 18, spin }) => {
  return (
    <>
      <IconFix size={size} spin={spin}>
        {icon}
      </IconFix>
    </>
  );
};

const IconFix = styled.span<{ spin?: boolean; size: number }>`
  animation-name: ${(props) => (props.spin ? "spin" : "none")};
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  margin: 0;
  padding: 0;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    margin: 0;
    padding: 0;
    display: inline-block;
    font-size: ${(props) => props.size}px;
    line-height: ${(props) => props.size}px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
