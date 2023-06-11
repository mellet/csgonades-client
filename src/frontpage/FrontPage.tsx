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
import { addFavoriteToNades } from "../map/logic/helpers";
import { useTheme } from "../core/settings/useTheme";
import { AdUnit } from "../shared-components/adunits/AdUnit";
import { useFavorites } from "../favorites/data/useFavorites";
import { useIsDeviceSize } from "../core/layout/useDeviceSize";
import { useGameMode } from "../core/useGameMode";
import { useRecentNades } from "../nade/data/useRecentNades";

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
  const { colors } = useTheme();
  const { gameMode } = useGameMode();
  const { recentNades } = useRecentNades(gameMode);
  const recentNadesWithFavorites = useRecentNadesWithFavorites(recentNades);
  const { isMobile } = useIsDeviceSize();

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

        {isMobile ? (
          <AdUnit horizontalSpacing name="frontPageMobile" />
        ) : (
          <AdUnit horizontalSpacing name="fixed728x90" />
        )}

        {Boolean(recentNades.length) && (
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

        <div className="recent-wrap">
          <h3>Most recent blog posts</h3>
          <BlogList posts={recentPosts} />
        </div>
      </div>

      <style jsx>{`
        #front-page {
          grid-area: main;
        }

        .recent-nades {
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
          color: ${colors.TEXT};
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

          .ph {
            padding: ${Dimensions.GUTTER_SIZE}px;
            max-width: 90vw;
          }
        }
      `}</style>
    </>
  );
});

const useRecentNadesWithFavorites = (nades: NadeLight[]): NadeLight[] => {
  const { favoritedNades } = useFavorites();

  return useMemo(() => {
    let thenades = [...nades];
    thenades = addFavoriteToNades(thenades, favoritedNades);

    return thenades;
  }, [nades, favoritedNades]);
};
