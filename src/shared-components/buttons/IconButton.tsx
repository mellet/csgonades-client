import { FC } from "react";
import styled from "styled-components";

export type IconButtonProps = {
  icon: JSX.Element;
  activeColor?: string;
  active?: boolean;
  labelCount?: number;
  onClick?: () => void;
  inGroup?: boolean;
};

export const IconButton: FC<IconButtonProps> = ({
  icon,
  activeColor,
  active = false,
  labelCount,
  onClick,
  inGroup,
}) => {
  return (
    <IconButtonWrapper inGroup={inGroup}>
      <Button
        inGroup={inGroup}
        onClick={onClick}
        active={active}
        activeColor={activeColor}
      >
        {icon}
      </Button>
      {(labelCount ? labelCount > 0 : false) && (
        <ButtonLabel bgColor={activeColor} labelCount={labelCount!}>
          {labelCount}
        </ButtonLabel>
      )}
    </IconButtonWrapper>
  );
};

type WrapProps = {
  inGroup?: boolean;
};

export const IconButtonWrapper = styled.div<WrapProps>`
  width: 40px;
  height: 40px;
  position: relative;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.buttonBorder};
  border-radius: ${({ inGroup }) => (inGroup ? "none" : "8px")};
`;

type ButtonProps = {
  activeColor?: string;
  active: boolean;
  inGroup?: boolean;
};

export const Button = styled.button<ButtonProps>`
  height: 100%;
  width: 100%;
  background: ${(props) =>
    props.active ? props.theme.colors.DP03 : "transparent"};
  border: none;
  outline: none;
  font-size: 18px;
  display: flex;
  border-radius: ${({ inGroup }) => (inGroup ? "none" : "8px")};
  align-items: center;
  justify-content: space-around;
  padding: 0;
  margin: 0;
  color: ${(props) =>
    props.active ? props.activeColor : props.theme.colors.buttonDefaultIcon};
  transition: color 0.1s, background 0.1s;

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
