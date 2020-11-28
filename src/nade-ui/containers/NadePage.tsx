import { FC, memo, useEffect } from "react";
import { NadeTitle } from "../components/NadeTitle";
import { SEO } from "../../layout/SEO";
import { NadeInfoContainer } from "../NadeInfoContainer";
import { NadeVideoContainer } from "../NadeVideoContainer";
import { NadeComments } from "../comments/NadeComments";
import NadeStatus from "../components/NadeStatus";
import { ArticleJsonLd } from "next-seo";
import {
  descriptionSimplify,
  generateSeoTitle,
  generateNadeItemTitle,
} from "../../utils/Common";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Nade } from "../../nade-data/Nade/Nade";
import { LayoutWithSidebar } from "../../common/LayoutWithSidebar";
import { NadePageSidebar } from "../NadePageSidebar";
import { useIncrementNumNadesVisisted } from "../../features/tracker/useTracker";

type Props = {
  nade: Nade;
};

export const NadePage: FC<Props> = memo(({ nade }) => {
  const incrementNumNadesVisisted = useIncrementNumNadesVisisted();
  const { colors } = useTheme();

  useEffect(() => {
    incrementNumNadesVisisted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [layoutTitle, subTitle] = generateNadeItemTitle(
    nade.title,
    nade.startPosition,
    nade.endPosition,
    nade.type,
    nade.oneWay,
    nade.map
  );

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

      <LayoutWithSidebar
        key={`main-${nade.id}`}
        sidebar={<NadePageSidebar nade={nade} />}
      >
        <div id="nade-page-grid">
          <div id="title">
            <NadeTitle
              title={layoutTitle}
              subTitle={subTitle}
              nadeId={nade.id}
              map={nade.map}
            />
          </div>

          <div id="nade-page-main">
            <NadeVideoContainer
              lineUpUrl={nade.images.lineupUrl}
              gfyId={nade.gfycat.gfyId}
            />
          </div>

          <div id="nade-info-container">
            <NadeInfoContainer nade={nade} />
          </div>

          <div id="nade-comment-container">
            <NadeComments nadeId={nade.id} />
          </div>
        </div>
      </LayoutWithSidebar>

      <NadeStatus status={nade.status} statusInfo={nade.statusInfo} />

      <style jsx>{`
        #nade-page-grid {
          grid-area: main;
          display: grid;
          grid-template-columns: 1fr 1fr 300px;
          grid-template-areas:
            "title title title"
            "warning warning warning"
            "video video video"
            "info info info"
            "comments comments comments";
          width: 100%;
          padding-bottom: 20vh;
        }

        #title {
          grid-area: title;
          background: ${colors.DP01};
          position: sticky;
          top: 0;
          z-index: 100;
        }

        #misc {
          grid-area: misc;
        }

        #nade-actions {
          display: flex;
          justify-content: flex-end;
        }

        #nade-info-container {
          grid-area: info;
        }

        #nade-page-main {
          grid-area: video;
        }

        #nade-comment-container {
          grid-area: comments;
        }
      `}</style>
    </>
  );
});

function addslashes(str: string) {
  return (str + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
}
