import { FC } from "react";
import { useTheme } from "../../../core/settings/SettingsHooks";

type IconButtonGroupProps = {
  vertical?: boolean;
};

export const IconButtonGroup: FC<IconButtonGroupProps> = ({
  children,
  vertical,
}) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="icon-button-group">{children}</div>
      <style jsx>{`
        .icon-button-group {
          border-radius: 8px;
          overflow: hidden;
          display: inline-flex;
          flex-direction: ${vertical ? "column" : "row"};
          border: 1px solid ${colors.BORDER};
        }
      `}</style>
    </>
  );
};
