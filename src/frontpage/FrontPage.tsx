import { FC, memo } from "react";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { SiteStats } from "../core/api/StatsApi";
import { BlogList } from "../blog/components/BlogList";
import { Dimensions } from "../constants/Constants";
import { EzoicPlaceholder } from "../shared-components/adunits/EzoicPlaceholder";
import {
  bestDust2Nades,
  blogJumpthrowBind,
  blogNadeAlignCrosshair,
  blogPractiseConfig,
} from "../blog/ArticleData/blogPosts";
import { NadeLight } from "../nade/models/Nade";
import { CsgnList } from "../shared-components/list/CsgnList";
import { NadeItem } from "../nade/components/NadeItem/NadeItem";

const recentPosts = [
  blogJumpthrowBind,
  bestDust2Nades,
  blogNadeAlignCrosshair,
  blogPractiseConfig,
];

type Props = {
  stats: SiteStats | null;
  recentNades: NadeLight[] | null;
};

export const FrontPage: FC<Props> = memo(({ stats, recentNades }) => {
  function renderItem(item: NadeLight) {
    return <NadeItem nade={item} />;
  }

  function keyExtractor(item: NadeLight) {
    return item.id;
  }

  return (
    <>
      <div id="front-page">
        <FrontPageJumbo stats={stats} />

        {recentNades && (
          <div className="recent-nades">
            <h3>Recently added nades</h3>
            <CsgnList<NadeLight>
              data={recentNades}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              enableAds={false}
            />
          </div>
        )}

        <div className="ph">
          <EzoicPlaceholder id="174" />
        </div>

        <div className="recent-wrap">
          <h3>Most recent blog posts</h3>
          <BlogList posts={recentPosts} />
        </div>
      </div>

      <style jsx>{`
        .ph {
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .recent-nades {
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #front-page {
          grid-area: main;
          margin: ${Dimensions.GUTTER_SIZE}px;
        }

        .recent-wrap {
          padding-bottom: 75px;
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
