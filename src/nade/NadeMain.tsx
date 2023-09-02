import { FC, memo, useEffect } from "react";
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
import { GfycatData } from "./models/GfycatData";
import { useGameMode } from "../core/useGameMode";

type Props = {
  nade: Nade;
};

export const NadeMain: FC<Props> = memo(({ nade }) => {
  const { setGameMode } = useGameMode();

  const seoTitle = generateSeoTitle(
    nade.startPosition,
    nade.endPosition,
    nade.type,
    nade.oneWay,
    nade.map
  );

  useEffect(() => {
    setGameMode(nade.gameMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createdAtString = new Date(nade.createdAt).toISOString();

  return (
    <>
      <VideoJsonLd
        key={`ld-${nade.id}`}
        name={seoTitle}
        description={descriptionSimplify(nade?.description)}
        thumbnailUrls={[nade.images.result.small]}
        uploadDate={createdAtString}
        contentUrl={
          nade.gfycat?.smallVideoUrl ||
          `https://www.youtube.com/watch?v=${nade.youTubeId}`
        }
        duration={nade.gfycat?.duration}
        watchCount={nade.viewCount}
        embedUrl={embedUrl(nade.gfycat, nade.youTubeId)}
      />

      <SEO
        key={`seo-${nade.id}`}
        title={seoTitle}
        description={nade.description}
        canonical={`/nades/${nade.slug || nade.id}`}
        thumbnail={nade.images.result.small}
        video={nade.gfycat?.smallVideoUrl || youTubeLink(nade.youTubeId)}
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

function embedUrl(gfycat?: GfycatData, youTubeId?: string) {
  if (gfycat) {
    return `https://gfycat.com/ifr/${gfycat.gfyId}`;
  } else {
    return `https://www.youtube.com/embed/${youTubeId}`;
  }
}

function youTubeLink(youTubeId?: string) {
  return `https://www.youtube.com/watch?v=${youTubeId}`;
}
