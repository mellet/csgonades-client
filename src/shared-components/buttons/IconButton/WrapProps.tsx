import { FC } from "react";
import { useTheme } from "../../../core/settings/SettingsHooks";

type WrapProps = {
  inGroup?: boolean;
  last?: boolean;
};

export const IconButtonWrapper: FC<WrapProps> = ({
  children,
  inGroup,
  last,
}) => {
  const { colors } = useTheme();
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          width: 40px;
          height: 40px;
          position: relative;
          border-width: ${inGroup ? 0 : 1}px;
          border-style: solid;
          border-color: ${colors.buttonBorder};
          border-radius: ${inGroup ? "none" : "8px"};
          border-bottom-width: ${last ? 0 : 1}px;
        }
      `}</style>
    </>
  );
};

export const IconTextButtonWrapper: FC<WrapProps> = ({
  children,
  inGroup,
  last,
}) => {
  const { colors } = useTheme();
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          height: 40px;
          position: relative;
          border-width: ${inGroup ? 0 : 1}px;
          border-style: solid;
          border-color: ${colors.buttonBorder};
          border-radius: ${inGroup ? "none" : "8px"};
          border-right-width: ${last ? 0 : 1}px;
        }
      `}</style>
    </>
  );
};
