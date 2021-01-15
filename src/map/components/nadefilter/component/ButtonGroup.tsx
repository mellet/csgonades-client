import { FC } from "react";
import { useTheme } from "../../../../core/settings/SettingsHooks";

export const ButtonGroup: FC = ({ children }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="button-group">{children}</div>
      <style jsx>{`
        .button-group {
          border-radius: 5px;
          background: ${colors.primaryBtnBg};
          overflow: hidden;
          display: inline-block;
        }
      `}</style>
    </>
  );
};
