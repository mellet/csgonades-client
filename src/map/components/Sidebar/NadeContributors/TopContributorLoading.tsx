import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CIRCLE_SIZE = 28;

export const TopContributorLoading: FC = ({}) => {
  return (
    <>
      <div className="wrapper">
        <Skeleton style={{ marginBottom: 16 }} />

        <div className="stuff">
          {[...Array(16)].map((_, i) => (
            <span className="busterCards" key={i}>
              <Skeleton
                circle
                height={CIRCLE_SIZE}
                width={CIRCLE_SIZE}
                style={{ margin: 3 }}
              />
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          margin-top: 30px;
        }
        .stuff {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          margin-left: -3px;
          margin-right: -3px;
        }
      `}</style>
    </>
  );
};
