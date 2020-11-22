import React, { FC, Suspense } from "react";
import { Dimensions } from "../../constants/Constants";

const FilterBar = React.lazy(() => import("./FilterBar"));

const isServer = typeof window === "undefined";

export const FilterBarLazy: FC = ({}) => {
  if (isServer) {
    return <FilterBarFallback />;
  }

  return (
    <>
      <Suspense fallback={<FilterBarFallback />}>
        <FilterBar />
      </Suspense>
    </>
  );
};

const FilterBarFallback = () => {
  return (
    <>
      <div className="filter-bar-fallback"></div>
      <style jsx>{`
        .filter-bar-fallback {
          height: 70px;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
