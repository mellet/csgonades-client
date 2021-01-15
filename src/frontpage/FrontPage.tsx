import { FC, memo } from "react";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { SiteStats } from "../core/api/StatsApi";
import { BlogList } from "../blog/BlogList";
import { Dimensions } from "../constants/Constants";
import { EzoicPlaceholder } from "../shared-components/adunits/EzoicPlaceholder";
import {
  bestDust2Nades,
  blogJumpthrowBind,
  blogNadeAlignCrosshair,
  blogPractiseConfig,
} from "../blog/ArticleData/blogPosts";

const recentPosts = [
  blogJumpthrowBind,
  bestDust2Nades,
  blogNadeAlignCrosshair,
  blogPractiseConfig,
];

type Props = {
  stats: SiteStats | null;
};

export const FrontPage: FC<Props> = memo(({ stats }) => {
  return (
    <>
      <div id="front-page">
        <FrontPageJumbo stats={stats} />

        <div className="ph">
          <EzoicPlaceholder id="174" />
        </div>

        <div className="recent-wrap">
          <BlogList posts={recentPosts} />
        </div>
      </div>

      <style jsx>{`
        .ph {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #front-page {
          grid-area: main;
          margin: ${Dimensions.GUTTER_SIZE}px;
        }

        .recent-wrap {
          margin-bottom: 75px;
        }

        .recent-nade-wrap {
          margin-top: 30px;
          margin-bottom: 60px;
        }

        .recent {
          display: flex;
          flex-direction: row;
        }

        @media only screen and (max-width: 1210px) {
          #front-page {
            margin-right: 30px;
          }

          aside {
            width: 100%;
          }
        }

        @media only screen and (max-width: 910px) {
          #front-page {
            margin: 0px;
          }
        }

        @media only screen and (max-width: 340px) {
          #front-page {
            margin: 0px;
          }
        }
      `}</style>
    </>
  );
});
