import React, { FC, Suspense } from "react";
import { Movement } from "../../../nade-data/Nade/NadeMovement";
import { Technique } from "../../../nade-data/Nade/Technique";
import { Tickrate } from "../../../nade-data/Nade/NadeTickrate";

const NadeStatsLazy = React.lazy(() => import("./NadeStatsLazy"));

const isServer = typeof window === "undefined";

export type NadeStatsProps = {
  isFavorited?: boolean;
  technique?: Technique;
  movement?: Movement;
  tickrate?: Tickrate;
  createdAt: Date | string;
  viewCount: number;
  favoriteCount: number;
  commentCount: number;
  isPro?: boolean;
  upVoteCount?: number;
  downVoteCount?: number;
};

export const NadeStats: FC<NadeStatsProps> = (props) => {
  if (isServer) {
    return null;
  }

  return (
    <Suspense fallback={<NadeStatsFallback />}>
      <NadeStatsLazy {...props} />
    </Suspense>
  );
};

const NadeStatsFallback = () => {
  return (
    <>
      <div className="stats-fallback"></div>
      <style jsx>{`
        .stats-fallback {
          height: 40px;
        }
      `}</style>
    </>
  );
};
