import { FC } from "react";
import { Checkbox } from "semantic-ui-react";
import { useTheme } from "../../core/settings/useTheme";

type Props = {
  checked?: boolean;
  label: string;
  onClick: () => void;
};

export const CsgnCheckbox: FC<Props> = ({ checked, label, onClick }) => {
  const { colors } = useTheme();

  return (
    <>
      <Checkbox
        label={label}
        checked={checked}
        onClick={onClick}
        className="csgn-checkbox"
      />
      <style jsx global>{`
        .csgn-checkbox label {
          color: ${colors.TEXT} !important;
        }
      `}</style>
    </>
  );
};
