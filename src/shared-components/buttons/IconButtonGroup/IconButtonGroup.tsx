import React, { FC } from "react";
import { useTheme } from "../../../core/settings/SettingsHooks";

type IconButtonGroupProps = {
  vertical?: boolean;
};

export const ButtonGroup: FC<IconButtonGroupProps> = ({
  children,
  vertical = false,
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
      <style jsx global>{`
        .icon-button-group > * {
          border-bottom: ${vertical ? 1 : 0}px solid ${colors.BORDER} !important;
          border-right: ${vertical ? 0 : 1}px solid ${colors.BORDER} !important;
        }

        .icon-button-group > *:last-child {
          border-bottom: none !important;
          border-right: none !important;
        }
      `}</style>
    </>
  );
};
