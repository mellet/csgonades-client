import { FC } from "react";

export const AspectRatioBox: FC = ({ children }) => {
  return (
    <>
      <div className="wrapper">
        <div className="content">{children}</div>
      </div>
      <style jsx>{`
        .wrapper {
          width: 100%;
          position: relative;
          overflow: hidden;
          height: 0;
          padding-top: 56.25%;
        }

        .content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      `}</style>
    </>
  );
};
