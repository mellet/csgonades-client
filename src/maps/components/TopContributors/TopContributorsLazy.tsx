import dynamic from "next/dynamic";
import { FC } from "react";
import { Placeholder } from "semantic-ui-react";
import { Dimensions } from "../../../constants/Constants";
import { ContListProps } from "./topContributorsProps";

const TopContributorsSkeleton: FC = () => {
  return (
    <>
      <div>
        <Placeholder>
          <Placeholder.Image rectangular />
        </Placeholder>
      </div>
      <style jsx>{`
        div {
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
          padding-bottom: 15px;
        }
      `}</style>
    </>
  );
};

const TopContributors = dynamic(
  () => import("./TopContributor").then((mod) => mod.TopContributorList),
  { ssr: false, loading: () => <TopContributorsSkeleton /> }
);

export const TopContributorsLazy: FC<ContListProps> = (props) => {
  return <TopContributors {...props} />;
};
