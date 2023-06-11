import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Dimensions } from "../constants/Constants";

export const RecentNadesLoading: FC = ({}) => {
  return (
    <>
      <Skeleton count={1} height={30} />
      <div className="nade-items">
        <Skeleton width={200} height={200} />
        <Skeleton width={200} height={200} />
        <Skeleton width={200} height={200} />
        <Skeleton width={200} height={200} />
        <Skeleton width={200} height={200} />
      </div>
      <div className="nade-items">
        <Skeleton width={200} height={200} />
        <Skeleton width={200} height={200} />
        <Skeleton width={200} height={200} />
        <Skeleton width={200} height={200} />
        <Skeleton width={200} height={200} />
      </div>

      <style jsx>{`
        .nade-items {
          display: flex;
          justify-content: space-between;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
