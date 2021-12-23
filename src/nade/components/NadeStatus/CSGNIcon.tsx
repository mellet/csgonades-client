import { FC } from "react";

type Props = {
  icon: JSX.Element;
  spin?: boolean;
  size?: number;
};

export const CSGNIcon: FC<Props> = ({ icon, size = 18, spin }) => {
  return (
    <>
      <span>{icon}</span>
      <style jsx>{`
        span {
          animation-name: ${spin ? "spin" : "none"};
          animation-duration: 2000ms;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
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
