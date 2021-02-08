import { FC, memo } from "react";
import { SEO } from "../shared-components/SEO";
import { NadeVideoContainer } from "./components/VideoContainer/NadeVideoContainer";
import { NadeComments } from "./components/comments/NadeComments";
import { ArticleJsonLd } from "next-seo";
import { descriptionSimplify, generateSeoTitle } from "../utils/Common";
import { Nade } from "./models/Nade";
import { NadeMeta } from "./components/NadeMeta/NadeMeta";
import { Dimensions } from "../constants/Constants";
import NadeStatus from "./components/NadeStatus/NadeStatus";
import { NadeTitle } from "./components/NadeHeader/NadeTitle";
import { NadeOverVideo } from "./components/NadeOverVideo";
import { NadeDescription } from "./components/NadeDescription";
import { NadeSidebar } from "./components/NadeSidebar";

type Props = {
  nade: Nade;
};

export const NadeMain: FC<Props> = memo(({ nade }) => {
  const seoTitle = generateSeoTitle(
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
          <div id="nade-over-video">
            <NadeOverVideo nade={nade} />
          </div>
          <div id="nade-title-mobile">
            <NadeTitle nade={nade} />
          </div>
          <NadeMeta
            movement={nade.movement}
            technique={nade.technique}
            tickrate={nade.tickrate}
            type={nade.type}
          />
          <NadeVideoContainer
            lineUpUrl={nade.imageLineup?.url || nade.images.lineupUrl}
            gfyId={nade.gfycat.gfyId}
          />
        </div>

        <div id="nade-sidebar">
          <NadeSidebar>
            <NadeStatus status={nade.status} />
            <NadeDescription nade={nade} />
            <NadeComments nade={nade} />
          </NadeSidebar>
        </div>
      </div>

      <style jsx>{`
        #nade-page-grid {
          display: grid;
          grid-template-columns: 1fr 1fr minmax(470px, 20%);
          grid-template-areas:
            "video video comments"
            "video video comments"
            "video video comments";
          width: 100%;
        }

        #nade-over-video {
          grid-area: top;
        }

        #nade-page-main {
          grid-area: video;
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          padding-right: ${Dimensions.GUTTER_SIZE}px;
        }

        #nade-sidebar {
          grid-area: comments;
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
          overflow-y: auto;
        }

        .advert {
          max-width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        #nade-title-mobile {
          padding: ${Dimensions.GUTTER_SIZE}px;
          display: none;
        }

        @media only screen and (max-width: 800px) {
          #nade-title-mobile {
            display: block;
          }
        }

        @media only screen and (max-width: 1100px) {
          #nade-page-grid {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-areas:
              "video"
              "comments";
            width: 100%;
          }

          #nade-page-main {
            height: auto;
          }

          #nade-sidebar {
            border-left: none;
            height: auto;
            margin-left: ${Dimensions.GUTTER_SIZE}px;
          }
        }
      `}</style>
    </>
  );
});

function addslashes(str: string) {
  return (str + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
}
