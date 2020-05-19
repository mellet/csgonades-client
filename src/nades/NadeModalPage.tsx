import { FC, useEffect, memo } from "react";
import { NadeLight, Nade } from "../models/Nade/Nade";
import { NadeTitle } from "./components/NadeTitle";
import { generateNadeItemTitle, generateSeoTitle } from "../utils/Common";
import { useCanEditNade } from "../store/NadeStore/hooks/useCanEditNade";
import { NadeVideoContainer } from "./NadeVideoContainer";
import { NadeMeta } from "./components/NadeMeta";
import { NadeInfoContainer } from "./NadeInfoContainer";
import { NadeComments } from "./comments/NadeComments";
import { Dimensions } from "../constants/Constants";
import { SEO } from "../layout/SEO2";
import { useAnalytics } from "../utils/Analytics";
import { TickWarning } from "./components/TickWarning";

type Props = {
  nadeLight: NadeLight;
  nade: Nade | null;
};

export const NadeModalPage: FC<Props> = memo(({ nade, nadeLight }) => {
  const { pageView } = useAnalytics();
  const canEdit = useCanEditNade(nade?.steamId || "");

  // Handle pageview
  useEffect(() => {
    if (!nade) {
      return;
    }
    const path = `/nades/${nade.slug || nade.id}`;
    pageView({ path });
  }, [nade, pageView]);

  const [layoutTitle, subTitle] = generateNadeItemTitle(
    nadeLight.title,
    nadeLight.startPosition,
    nadeLight.endPosition,
    nadeLight.type,
    nadeLight.oneWay
  );

  const seoTitle = generateSeoTitle(
    nadeLight.title,
    nadeLight.startPosition,
    nadeLight.endPosition,
    nadeLight.type,
    nadeLight.oneWay,
    nade?.map
  );

  return (
    <>
      {!!nade && (
        <SEO
          key={`seo-${nade.id}`}
          title={seoTitle}
          description={nade.description}
          canonical={`/nades/${nade.slug || nade.id}`}
          thumbnail={nade.images.thumbnailUrl}
        />
      )}

      <div id="nade-modal-page">
        <div id="title">
          <NadeTitle
            title={layoutTitle}
            subTitle={subTitle}
            canEdit={canEdit}
            nadeId={nadeLight.id}
            nadeSlug={nadeLight.slug}
            map={nade?.map}
            inModal={true}
            downVoteCount={nadeLight.downVoteCount}
            upVoteCount={nadeLight.upVoteCount}
          />
          <TickWarning tickrate={nadeLight.tickrate} />
          <div id="nade-page-main">
            <NadeVideoContainer
              lineUpUrl={nadeLight.images.lineupUrl}
              gfyId={nadeLight.gfycat.gfyId}
            />
          </div>
          <div id="nade-meta">
            <NadeMeta
              movement={nadeLight.movement}
              technique={nadeLight.technique}
              tickrate={nadeLight.tickrate}
              type={nadeLight.type}
            />
          </div>
          <div id="nade-info">
            {!!nade && (
              <div id="nade-info-container">
                <NadeInfoContainer nade={nade} />
              </div>
            )}

            <div id="nade-comment-container">
              <NadeComments nadeId={nadeLight.id} />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        #nade-info {
          display: grid;
          grid-template-columns: 1fr 160px;
          grid-template-areas:
            "info info "
            "comments comments";
          padding: ${Dimensions.GUTTER_SIZE}px;
        }

        #nade-info-container {
          grid-area: info;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #nade-comment-container {
          grid-area: comments;
        }
      `}</style>
    </>
  );
});
