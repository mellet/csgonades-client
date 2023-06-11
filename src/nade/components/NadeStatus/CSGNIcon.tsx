import { CSSProperties, FC } from "react";

type Props = {
  icon: JSX.Element;
  spin?: boolean;
  size?: number;
  style?: CSSProperties;
};

export const CSGNIcon: FC<Props> = ({ icon, size = 18, spin, style }) => {
  return (
    <>
      <span className="csgonades-icon" style={style}>
        {icon}
      </span>
      <style jsx>{`
        .csgonades-icon {
          animation-name: ${spin ? "spin" : "none"};
          animation-duration: 800ms;
          animation-iteration-count: infinite;
          animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
          margin: 0;
          padding: 0;
          height: ${size}px;
          width: ${size}px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        & > * {
          margin: 0;
          padding: 0;
          display: inline-block;
          font-size: ${size}px;
          line-height: ${size}px;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};
