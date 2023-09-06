import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const LoadingView: FC = () => {
  return (
    <>
      <div className="loader">
        <div className="loading-nade">
          <Skeleton style={{ height: "100%" }} />
        </div>
        <div className="loading-nade">
          <Skeleton style={{ height: "100%" }} />
        </div>
        <div className="loading-nade">
          <Skeleton style={{ height: "100%" }} />
        </div>
        <div className="loading-nade">
          <Skeleton style={{ height: "100%" }} />
        </div>
      </div>
      <style jsx>{`
        .loader {
          display: flex;
          justify-content: space-between;
        }

        .loading-nade {
          width: 24%;
          height: 300px;
        }
      `}</style>
    </>
  );
};
