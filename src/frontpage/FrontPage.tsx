import { FC, memo } from "react";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { SiteStats } from "../core/api/StatsApi";
import { BlogList } from "../blog/components/BlogList";
import { Dimensions } from "../constants/Constants";
import {
  bestDust2Nades,
  blogJumpthrowBind,
  blogNadeAlignCrosshair,
  blogPractiseConfig,
  cs2Nades,
} from "../blog/ArticleData/blogPosts";
import { AdUnit } from "../shared-components/adunits/AdUnit";
import { useIsDeviceSize } from "../core/layout/useDeviceSize";
import { RecentNades } from "./RecentNades";

const recentPosts = [
  cs2Nades,
  blogJumpthrowBind,
  bestDust2Nades,
  blogNadeAlignCrosshair,
  blogPractiseConfig,
];

type Props = {
  stats: SiteStats | null;
};

export const FrontPage: FC<Props> = memo(({ stats }) => {
  const { isMobile } = useIsDeviceSize();

  return (
    <>
      <div id="front-page">
        <FrontPageJumbo stats={stats} />

        {isMobile ? (
          <AdUnit horizontalSpacing name="frontPageMobile" />
        ) : (
          <AdUnit horizontalSpacing name="fixed728x90" />
        )}

        <RecentNades />

        <div className="recent-wrap">
          <h3>Most recent blog posts</h3>
          <BlogList posts={recentPosts} />
        </div>
      </div>

      <style jsx>{`
        #front-page {
          grid-area: main;
        }

        @media only screen and (max-width: 1210px) {
          aside {
            width: 100%;
          }

          .ph {
            padding: ${Dimensions.GUTTER_SIZE}px;
            max-width: 90vw;
          }
        }
      `}</style>
    </>
  );
});
