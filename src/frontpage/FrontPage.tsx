import { FC, memo, useMemo } from "react";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { SiteStats } from "../core/api/StatsApi";
import { BlogList } from "../blog/components/BlogList";
import { Dimensions } from "../constants/Constants";
import {
  bestDust2Nades,
  blogJumpthrowBind,
  blogNadeAlignCrosshair,
  blogPractiseConfig,
} from "../blog/ArticleData/blogPosts";
import { NadeLight } from "../nade/models/Nade";
import { CsgnList } from "../shared-components/list/CsgnList";
import { NadeItem } from "../nade/components/NadeItem/NadeItem";
import { useSelector } from "react-redux";
import { favoritedNadeIdsSelector } from "../favorites/data/FavoriteSelectors";
import { addFavoriteToNades } from "../map/data/hooks/helpers";
import { NadeItemMobile } from "../nade/components/NadeItem/NadeItemMobile";
import { isMobileOnly } from "react-device-detect";
import { useTheme } from "../core/settings/SettingsHooks";
import { AdUnitAdSense } from "../shared-components/adunits/Adsense";

const recentPosts = [
  blogJumpthrowBind,
  bestDust2Nades,
  blogNadeAlignCrosshair,
  blogPractiseConfig,
];

type Props = {
  stats: SiteStats | null;
  recentNades: NadeLight[];
};

export const FrontPage: FC<Props> = memo(({ stats, recentNades }) => {
  const { colors } = useTheme();
  const recentNadesWithFavorites = useRecentNadesWithFavorites(recentNades);

  function renderItem(item: NadeLight) {
    if (isMobileOnly) {
      return <NadeItemMobile nade={item} />;
    } else {
      return <NadeItem nade={item} />;
    }
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
              data={recentNadesWithFavorites}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              enableAds={false}
            />
          </div>
        )}

        <div className="ph">
          <AdUnitAdSense adFormat="horizontal" />
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
          color: ${colors.TEXT};
        }

        #front-page {
          grid-area: main;
        }

        .recent-wrap {
          padding-bottom: 75px;
          color: ${colors.TEXT};
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
          aside {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
});

const useRecentNadesWithFavorites = (nades: NadeLight[]): NadeLight[] => {
  const favoritedNades = useSelector(favoritedNadeIdsSelector);

  return useMemo(() => {
    let thenades = [...nades];
    thenades = addFavoriteToNades(thenades, favoritedNades);

    return thenades;
  }, [nades, favoritedNades]);
};
