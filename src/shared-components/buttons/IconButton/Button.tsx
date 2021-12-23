import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { useTheme } from "../../../core/settings/SettingsHooks";

type ButtonProps = {
  activeColor?: string;
  active: boolean;
  inGroup?: boolean;
};

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonProps;

export const Button: FC<Props> = ({
  active,
  activeColor,
  inGroup,
  ...rest
}) => {
  const { colors } = useTheme();
  return (
    <>
      <button {...rest}></button>
      <style jsx>{`
        button {
          height: 100%;
          width: 100%;
          background: ${active ? colors.DP03 : "transparent"};
          border: none;
          outline: none;
          font-size: 18px;
          display: flex;
          border-radius: ${inGroup ? "none" : "8px"};
          align-items: center;
          justify-content: space-around;
          padding: 0;
          margin: 0;
          color: ${active ? activeColor : colors.buttonDefaultIcon};
          transition: color 0.1s, background 0.1s;
        }

        button:hover,
        button:active {
          cursor: pointer;
          color: ${activeColor ? activeColor : "#0d0c22"};
          background: ${colors.DP03};
        }

        button:focus-visible {
          outline: 1px auto ${colors.PRIMARY};
        }
      `}</style>
    </>
  );
};
