import { FC, memo } from "react";
import { SEO } from "../shared-components/SEO";
import { NadeVideoContainer } from "./components/VideoContainer/NadeVideoContainer";
import { NadeComments } from "./components/comments/NadeComments";
import { VideoJsonLd } from "next-seo";
import { descriptionSimplify, generateSeoTitle } from "../utils/Common";
import { Nade } from "./models/Nade";
import NadeStatus from "./components/NadeStatus/NadeStatus";
import { NadeTitle } from "./components/NadeHeader/NadeTitle";
import { NadeDescription } from "./components/NadeDescription";
import { NadeMainLayout } from "./NadeMainLayout";
import { NadeActions } from "./containers/NadeActions";

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
      <VideoJsonLd
        key={`ld-${nade.id}`}
        name={seoTitle}
        description={descriptionSimplify(nade?.description)}
        thumbnailUrls={[nade.imageMain?.url]}
        uploadDate={createdAtString}
        contentUrl={nade.gfycat.smallVideoUrl}
        duration={nade.gfycat.duration}
        watchCount={nade.viewCount}
        embedUrl={`https://gfycat.com/ifr/${nade.gfycat.gfyId}`}
      />

      <SEO
        key={`seo-${nade.id}`}
        title={seoTitle}
        description={nade.description}
        canonical={`/nades/${nade.slug || nade.id}`}
        thumbnail={nade.imageMain?.url}
        video={nade.gfycat.smallVideoUrl}
      />

      <NadeMainLayout
        status={<NadeStatus status={nade.status} />}
        mobileTitle={
          <NadeTitle
            csGoMap={nade.map}
            isOneWay={nade.oneWay}
            nadeEndPosition={nade.endPosition}
            nadeStartPosition={nade.startPosition}
            nadeType={nade.type}
          />
        }
        video={<NadeVideoContainer nade={nade} />}
        actions={<NadeActions nade={nade} />}
        description={<NadeDescription nade={nade} />}
        comments={<NadeComments nade={nade} />}
      />
    </>
  );
});
