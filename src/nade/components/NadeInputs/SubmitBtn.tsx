import { FC } from "react";
import { FaCheck } from "react-icons/fa";
import { useTheme } from "../../../core/settings/useTheme";
import { ButtonWithIcon } from "../../../shared-components/buttons/ButtonWithIcon";

type Props = {
  disabled?: boolean;
  onSubmit: () => void;
  label?: string;
};

export const SumbitBtn: FC<Props> = ({ onSubmit, disabled, label }) => {
  const { colors } = useTheme();

  return (
    <ButtonWithIcon
      disabled={disabled}
      icon={<FaCheck />}
      value={label || "SUBMIT"}
      onClick={onSubmit}
      color={colors.SUCCESS}
    />
  );
};
