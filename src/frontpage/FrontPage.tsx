import { FC, memo } from "react";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { SiteStats } from "../api/StatsApi";
import { blogNadeAlignCrosshair } from "../pages/blog/smoke-align-crosshair";
import { bestDust2Nades } from "../pages/blog/best-dust2-nades";
import { BlogList } from "../blog/BlogList";
import { blogJumpthrowBind } from "../pages/blog/jumpthrow-bind";
import { Dimensions } from "../constants/Constants";
import { PageCentralize } from "../common/PageCentralize";
import { blogPractiseConfig } from "../pages/blog/practice-config";

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
        <PageCentralize>
          <FrontPageJumbo stats={stats} />

          <div className="recent-wrap">
            <BlogList posts={recentPosts} />
          </div>
        </PageCentralize>
      </div>

      <style jsx>{`
        .placement {
        }

        #front-page {
          grid-area: main;
          margin: ${Dimensions.GUTTER_SIZE}px;
          margin-bottom: 100px;
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
          margin-top: 100px;
          margin-bottom: 100px;
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
            margin: 15px;
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
