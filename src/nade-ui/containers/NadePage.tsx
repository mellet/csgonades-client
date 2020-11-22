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
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { useCanEditNade } from "../../store/NadeStore/hooks/useCanEditNade";
import { Nade } from "../../nade-data/Nade/Nade";
import { TickWarning } from "../components/TickWarning";
import { EzoicPlaceholder } from "../../common/adunits/EzoicPlaceholder";
import { LayoutWithSidebar } from "../../common/LayoutWithSidebar";
import { NadePageSidebar } from "../NadePageSidebar";
import { useIncrementNumNadesVisisted } from "../../features/tracker/useTracker";

type Props = {
  nade: Nade;
  inModal?: boolean;
};

export const NadePage: FC<Props> = memo(({ nade, inModal }) => {
  const incrementNumNadesVisisted = useIncrementNumNadesVisisted();
  const { colors } = useTheme();
  const canEdit = useCanEditNade(nade.steamId);

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
          <div className="matchmake-warning">
            <TickWarning />
          </div>

          <div id="title">
            <NadeTitle
              title={layoutTitle}
              subTitle={subTitle}
              canEdit={canEdit}
              nadeId={nade.id}
              nadeSlug={nade.slug}
              map={nade.map}
              downVoteCount={nade.downVoteCount}
              upVoteCount={nade.upVoteCount}
            />
          </div>

          <div id="nade-page-main">
            <NadeVideoContainer
              lineUpUrl={nade.images.lineupUrl}
              gfyId={nade.gfycat.gfyId}
            />
          </div>

          <div id="top-ph">
            <EzoicPlaceholder id="174" />
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
        #top-ph {
          grid-area: topph;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .matchmake-warning {
          grid-area: warning;
        }

        #misc {
          grid-area: misc;
        }

        #nade-actions {
          display: flex;
          justify-content: flex-end;
        }

        .nade-action {
          width: 40px;
          height: 200px;
        }

        .stick-top {
          position: sticky;
          top: ${Dimensions.HEADER_HEIGHT + Dimensions.GUTTER_SIZE * 2}px;
        }

        #nade-page-grid {
          grid-area: main;
          display: grid;
          grid-template-columns: 1fr 1fr 300px;
          grid-template-areas:
            "title title title"
            "warning warning warning"
            "video video video"
            "info info info"
            "topph topph topph"
            "comments comments comments";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          width: 100%;
          border-radius: 5px;
        }

        #advert {
          grid-area: advert;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #nade-info-container {
          grid-area: info;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
          padding-left: ${inModal ? Dimensions.GUTTER_SIZE : 0}px;
        }

        #nade-page-main {
          grid-area: video;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          overflow: hidden;
        }

        #sidebar-right {
          grid-area: sidebar;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #nade-buttons {
          display: flex;
          justify-content: space-between;
        }

        #nade-buttons .nade-btn {
          width: 47%;
        }

        #nade-comment-container {
          grid-area: comments;
          padding-left: ${inModal ? Dimensions.GUTTER_SIZE : 0}px;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #title {
          grid-area: title;
          background: ${colors.DP01};
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        @media only screen and (max-width: 1210px) {
          #nade-page-grid {
            margin-right: 30px;
          }
        }

        @media only screen and (max-width: 800px) {
          #nade-page-grid {
            grid-template-columns: 1fr 200px 1fr;
            grid-template-areas:
              "title title title"
              "warning warning warning"
              "video video video"
              "info info info"
              "topph topph topph"
              "comments comments comments"
              "advert advert advert";
          }

          #title,
          #nade-page-main {
            margin-left: -15px;
            margin-right: -15px;
          }
        }
      `}</style>
    </>
  );
});

function addslashes(str: string) {
  return (str + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
}
