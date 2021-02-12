import dynamic from "next/dynamic";
import { FC } from "react";
import { ContListProps } from "./topContributorsProps";

const TopContributors = dynamic(
  () => import("./TopContributor").then((mod) => mod.TopContributorList),
  { ssr: false }
);

export const TopContributorsLazy: FC<ContListProps> = (props) => {
  return <TopContributors {...props} />;
};
