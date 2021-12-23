import { FC } from "react";

type ButtonLabelProps = {
  bgColor?: string;
  labelCount: number;
};
export const ButtonLabel: FC<ButtonLabelProps> = ({
  children,
  labelCount,
  bgColor,
}) => {
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          display: inline-flex;
          align-items: center;
          justify-content: space-around;
          width: ${labelCount > 9 ? "auto" : "20px"};
          padding-left: 4px;
          padding-right: 4px;
          padding-top: 4px;
          padding-bottom: 4px;
          border-radius: 15px;
          background: ${bgColor || "red"};
          position: absolute;
          top: -8px;
          right: -8px;
          font-size: 11px;
          line-height: 11px;
          color: white;
          font-weight: 600;
          pointer-events: none;
        }
      `}</style>
    </>
  );
};
