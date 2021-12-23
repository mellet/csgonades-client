import { FC } from "react";
import { Button } from "./Button";
import { ButtonLabel } from "./ButtonLabel";
import { IconButtonWrapper } from "./WrapProps";

export type IconButtonProps = {
  icon: JSX.Element;
  activeColor?: string;
  active?: boolean;
  labelCount?: number;
  onClick?: () => void;
  inGroup?: boolean;
  last?: boolean;
};

export const SquareButton: FC<IconButtonProps> = ({
  icon,
  activeColor,
  active = false,
  labelCount,
  onClick,
  inGroup,
  last,
}) => {
  const hasLabelCount = Boolean(labelCount);
  const buttonLabelCount = labelCount || 0;

  return (
    <IconButtonWrapper inGroup={inGroup} last={last}>
      <Button
        inGroup={inGroup}
        onClick={onClick}
        active={active}
        activeColor={activeColor}
      >
        {icon}
      </Button>
      {hasLabelCount && (
        <ButtonLabel bgColor={activeColor} labelCount={buttonLabelCount}>
          {labelCount}
        </ButtonLabel>
      )}
    </IconButtonWrapper>
  );
};
