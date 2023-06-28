import { FC } from "react";

type Props = {
  type: "text" | "circular-logo" | "box";
  height?: number;
  width?: number;
};

export const Skeleton: FC<Props> = ({ type, width, height }) => {
  return (
    <>
      <div className={"skeleton " + type}></div>
      <style jsx>{`
        .skeleton {
          animation: skeleton-loading 1s linear infinite alternate;
        }

        .text {
          height: ${height}px;
          border-radius: 5px;
        }

        .box {
          height: ${height}px;
          width: ${width}px;
        }

        @keyframes skeleton-loading {
          0% {
            background-color: hsl(200, 5%, 85%);
          }
          100% {
            background-color: hsl(200, 5%, 95%);
          }
        }
      `}</style>
    </>
  );
};
