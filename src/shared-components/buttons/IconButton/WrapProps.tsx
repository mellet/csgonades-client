import { FC } from "react";
import { useTheme } from "../../../core/settings/SettingsHooks";

type WrapProps = {
  inGroup?: boolean;
  color?: string;
};

export const IconButtonWrapper: FC<WrapProps> = ({ children, inGroup }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="icon-button-wrap">{children}</div>
      <style jsx>{`
        .icon-button-wrap {
          width: 40px;
          height: 40px;
          position: relative;
          border-radius: ${inGroup ? "0" : "8px"};
          border: ${inGroup ? "none" : `1px solid ${colors.BORDER}`};
        }
      `}</style>
    </>
  );
};

export const IconTextButtonWrapper: FC<WrapProps> = ({ children, inGroup }) => {
  return (
    <>
      <div className="icon-text-button-wrapper">{children}</div>
      <style jsx>{`
        .icon-text-button-wrapper {
          display: inline-block;
          height: 40px;
          position: relative;
          border-radius: ${inGroup ? "none" : "8px"};
          overflow: hidden;
        }
      `}</style>
    </>
  );
};
