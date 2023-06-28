import { FC } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { Dimensions } from "../constants/Constants";
import { Skeleton } from "../shared-components/skeleton/Skeleton";

export const RecentNadesLoading: FC = ({}) => {
  return (
    <>
      <Skeleton type="text" height={20} />
      <div className="nade-items">
        <Skeleton type="box" height={200} width={230} />
        <Skeleton type="box" height={200} width={230} />
        <Skeleton type="box" height={200} width={230} />
        <Skeleton type="box" height={200} width={230} />
        <Skeleton type="box" height={200} width={230} />
      </div>
      <div className="nade-items">
        <Skeleton type="box" height={200} width={230} />
        <Skeleton type="box" height={200} width={230} />
        <Skeleton type="box" height={200} width={230} />
        <Skeleton type="box" height={200} width={230} />
        <Skeleton type="box" height={200} width={230} />
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
