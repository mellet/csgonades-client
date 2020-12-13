import { FC, memo, useEffect } from "react";
import { SEO } from "../layout/SEO";
import { NadeInfoContainer } from "./components/NadeInfoContainer";
import { NadeVideoContainer } from "./components/VideoContainer/NadeVideoContainer";
import { NadeComments } from "./components/comments/NadeComments";
import { ArticleJsonLd } from "next-seo";
import { descriptionSimplify, generateSeoTitle } from "../utils/Common";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { Nade } from "../nade-data/Nade/Nade";
import { useIncrementNumNadesVisisted } from "../features/tracker/useTracker";
import { NadeMeta } from "./components/NadeMeta/NadeMeta";
import { Dimensions } from "../constants/Constants";
import NadeStatus from "./components/NadeStatus";

type Props = {
  nade: Nade;
};

export const NadeMain: FC<Props> = memo(({ nade }) => {
  const incrementNumNadesVisisted = useIncrementNumNadesVisisted();
  const { colors } = useTheme();

  useEffect(() => {
    incrementNumNadesVisisted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const seoTitle = generateSeoTitle(
    nade.title,
    nade.startPosition,
    nade.endPosition,
    nade.type,
    nade.oneWay,
    nade.map
  );

  const createdAtString = new Date(nade.createdAt).toISOString();

  return (
    <>
      <ArticleJsonLd
        key={`ld-${nade.id}`}
        url={`https://www.csgonades.com/nades/${nade.slug || nade.id}`}
        title={seoTitle}
        authorName={addslashes(nade.user.nickname)}
        datePublished={createdAtString}
        dateModified={nade.updatedAt}
        images={[nade.images.thumbnailUrl]}
        description={descriptionSimplify(nade?.description)}
        publisherName={"CSGO Nades"}
        publisherLogo={"https://www.csgonades.com/logo.png"}
      />
      <SEO
        key={`seo-${nade.id}`}
        title={seoTitle}
        description={nade.description}
        canonical={`/nades/${nade.slug || nade.id}`}
        thumbnail={nade.images.thumbnailUrl}
        video={nade.gfycat.smallVideoUrl}
      />

      <div id="nade-page-grid">
        <div id="nade-page-main">
          <NadeVideoContainer
            lineUpUrl={nade.images.lineupUrl}
            gfyId={nade.gfycat.gfyId}
          />
          <NadeMeta
            movement={nade.movement}
            technique={nade.technique}
            tickrate={nade.tickrate}
            type={nade.type}
          />
        </div>

        <div id="nade-sidebar">
          <NadeInfoContainer nade={nade} />
          <NadeComments nadeId={nade.id} />
        </div>
      </div>

      <NadeStatus status={nade.status} statusInfo={nade.statusInfo} />

      <style jsx>{`
        #nade-page-grid {
          grid-area: main;
          display: grid;
          grid-template-columns: 1fr 1fr minmax(375px, 20%);
          grid-template-areas:
            "video video comments"
            "video video comments"
            "video video comments";
          width: 100%;
        }

        #nade-page-main {
          grid-area: video;
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
          overflow-y: auto;
          background: ${colors.DP02};
          display: flex;
          flex-direction: column;
        }

        #nade-sidebar {
          grid-area: comments;
          background: ${colors.DP02};
          border-left: 1px solid ${colors.BORDER};
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
          overflow-y: auto;
        }

        .advert {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .fake-ad {
          width: 730px;
          height: 90px;
          background: #ccc;
        }
      `}</style>
    </>
  );
});

function addslashes(str: string) {
  return (str + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
}
