import { FC, memo, useMemo } from "react";
import { useTheme } from "../../core/settings/SettingsHooks";
import { IconTextButtonWrapper } from "./IconButton/WrapProps";

export type ButtonWithIconProps = {
  backgroundColor?: string;
  icon: any;
  onClick?: () => void;
  active?: boolean;
  value: string;
  inGroup?: boolean;
  last?: boolean;
};

export const ButtonWithIcon: FC<ButtonWithIconProps> = memo(
  ({ icon, onClick, value, backgroundColor, active, inGroup, last }) => {
    const { colors } = useTheme();

    const classNames = useMemo(() => {
      const base = ["btn"];
      if (active) {
        base.push("active");
      }
      return base.join(" ");
    }, [active]);

    return (
      <>
        <IconTextButtonWrapper inGroup={inGroup} last={last}>
          <button className={classNames} onClick={onClick}>
            <span className="btn-icon">
              <span className="btn-icon-fa">{icon}</span>
            </span>
            <span className="btn-label">{value}</span>
          </button>
        </IconTextButtonWrapper>
        <style jsx>{`
          .btn {
            align-items: center;
            appearance: none;
            background: ${backgroundColor ? backgroundColor : "transparent"};
            color: ${colors.TEXT};
            border: none;
            border-radius: 0;
            cursor: pointer;
            display: inline-flex;
            margin: 0;
            padding: 0;
            outline: none;
            transition: background 0.15s;
            height: 100%;
          }

          .btn:hover {
            background: ${colors.DP03};
          }

          .btn:hover .btn-icon {
            color: rgba(34, 148, 201, 0.9);
          }

          .btn-icon {
            align-items: center;
            display: flex;
            font-size: 18px;
            justify-content: space-around;
            padding-left: 8px;
            transition: all 0.2s;
          }

          .btn-icon-fa {
            position: relative;
            top: 2px;
          }

          .btn-label {
            display: block;
            flex: 1;
            font-size: 15px;
            font-weight: 400;
            text-align: center;
            padding-left: 6px;
            padding-right: 8px;
          }

          .active {
            background: ${colors.DP03};
          }

          .active .btn-icon {
            color: rgba(34, 148, 201, 0.9);
          }
        `}</style>
      </>
    );
  }
);
