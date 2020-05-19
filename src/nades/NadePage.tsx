import { FC, memo } from "react";
import { NadeTitle } from "./components/NadeTitle";
import { SEO } from "../layout/SEO2";
import { NadeInfoContainer } from "./NadeInfoContainer";
import { NadeVideoContainer } from "./NadeVideoContainer";
import { NadeShareActions } from "./NadeShareActions";
import { NadeComments } from "./comments/NadeComments";
import NadeStatus from "./components/NadeStatus";
import { ArticleJsonLd } from "next-seo";
import {
  descriptionSimplify,
  generateTitle,
  generateSeoTitle,
  generateNadeItemTitle,
} from "../utils/Common";
import { NadeMeta } from "./components/NadeMeta";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { useCanEditNade } from "../store/NadeStore/hooks/useCanEditNade";
import { Nade } from "../models/Nade/Nade";
import { TickWarning } from "./components/TickWarning";

type Props = {
  nade: Nade;
  inModal?: boolean;
};

export const NadePage: FC<Props> = memo(({ nade, inModal }) => {
  const { colors } = useTheme();
  const canEdit = useCanEditNade(nade.steamId);

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
      />

      <NadeStatus status={nade.status} statusInfo={nade.statusInfo} />

      <div id="nade-page-grid" key={`main-${nade.id}`}>
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

        <div id="nade-meta">
          <NadeMeta
            type={nade.type}
            movement={nade.movement}
            technique={nade.technique}
            tickrate={nade.tickrate}
            rounded
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

        <div id="nade-actions">
          <div className="nade-action">
            <NadeShareActions
              title={generateTitle(
                nade.title,
                nade.startPosition,
                nade.endPosition,
                nade.type,
                nade.oneWay
              )}
              visisble={nade.status === "accepted"}
              url={`/nades/${nade?.slug || nade?.id}`}
              image={nade.images.thumbnailUrl}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .matchmake-warning {
          grid-area: warning;
        }

        .share-label {
          background: ${colors.DP01};
          padding: 15px 20px 15px 20px;
          font-weight: normal;
          font-size: 14px;
        }

        #share-buttons {
          padding: 15px 30px 30px 30px;
        }

        #misc {
          grid-area: misc;
        }

        #nade-actions {
          grid-area: actions;
          padding-right: ${inModal ? Dimensions.GUTTER_SIZE : 0}px;
        }

        .nade-action {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #nade-page-grid {
          margin-top: ${inModal ? "0px" : `${Dimensions.GUTTER_SIZE}px`};
          margin-bottom: ${inModal ? "0px" : `100px`};
          display: grid;
          grid-template-columns: 1fr 1fr ${inModal ? "190px" : "160px"};
          grid-template-areas:
            "title title title"
            "warning warning warning"
            "video video video"
            "meta meta meta"
            "info info actions"
            "comments comments .";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          width: 100%;
          border-radius: 5px;
        }

        #nade-meta {
          grid-area: meta;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #nade-info-container {
          grid-area: info;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
          padding-left: ${inModal ? Dimensions.GUTTER_SIZE : 0}px;
        }

        #nade-page-main {
          grid-area: video;
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

        #placement-bottom {
          padding-top: ${Dimensions.GUTTER_SIZE}px;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        #title {
          grid-area: title;
          background: ${colors.DP01};
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        #side-bar-ad {
          margin-top: ${Dimensions.GUTTER_SIZE}px;
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
              "actions actions actions"
              "title title title"
              "warning warning warning"
              "video video video"
              "meta meta meta"
              "ad ad ad"
              "info info info"
              "comments comments comments"
              "misc misc misc";
          }
        }
      `}</style>
    </>
  );
});

function addslashes(str: string) {
  return (str + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
}
