import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

export const ButtonGroup: FC = ({ children }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="button-group">{children}</div>
      <style jsx>{`
        .button-group {
          border-radius: 5px;
          background: ${colors.primaryBtnBg};
          display: inline-flex;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};
