import { FC } from "react";
import styled from "styled-components";

export type IconButtonProps = {
  icon: JSX.Element;
  activeColor?: string;
  active: boolean;
  labelCount?: number;
  onClick?: () => void;
};

export const IconButton: FC<IconButtonProps> = ({
  icon,
  activeColor,
  active,
  labelCount,
  onClick,
}) => {
  return (
    <ButtonWrapper>
      <Button onClick={onClick} active={active} activeColor={activeColor}>
        {icon}
      </Button>
      {labelCount && labelCount > 0 && (
        <ButtonLabel bgColor={activeColor} labelCount={labelCount}>
          {labelCount}
        </ButtonLabel>
      )}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
`;

type ButtonProps = {
  activeColor?: string;
  active: boolean;
};

const Button = styled.button<ButtonProps>`
  height: 100%;
  width: 100%;
  background: transparent;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.BORDER};
  outline: none;
  border-radius: 8px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0;
  margin: 0;
  color: ${(props) => (props.active ? props.activeColor : "#0d0c22")};
  transition: color 0.1s, border-color 0.1s, background 0.1s;

  &:hover {
    cursor: pointer;
    color: ${(props) => (props.activeColor ? props.activeColor : "#0d0c22")};
    background: ${(props) => props.theme.colors.DP03};
  }
`;

type ButtonLabelProps = {
  bgColor?: string;
  labelCount: number;
};

const ButtonLabel = styled.div<ButtonLabelProps>`
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  width: ${(props) => (props.labelCount > 9 ? "auto" : "20px")};
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  border-radius: 15px;
  background: ${(props) => props.bgColor || "red"};
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 11px;
  line-height: 11px;
  color: white;
  font-weight: 600;
  pointer-events: none;
`;
