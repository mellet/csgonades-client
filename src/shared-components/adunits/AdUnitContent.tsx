import { FC, memo, useRef } from "react";
import { useInViewport } from "react-in-viewport";
import { useElementSize } from "usehooks-ts";
import { Dimensions } from "../../constants/Constants";
import { Adsense, AdUnitName } from "./Adsense";

type Props = {
  name: AdUnitName;
  horizontalSpacing?: boolean;
};

export const AdUnitContent: FC<Props> = memo(({ name, horizontalSpacing }) => {
  const [wrapRef, { width }] = useElementSize();
  const adRef = useRef<HTMLDivElement>(null);
  const { enterCount } = useInViewport(adRef, {
    rootMargin: "400px",
  });

  const renderAd = Boolean(enterCount);

  const hasSize = width > 0;

  return (
    <>
      <div ref={wrapRef} className="ad-wrap">
        {hasSize && (
          <div
            className="ad-unit"
            ref={adRef}
            style={{
              marginTop: horizontalSpacing ? Dimensions.GUTTER_SIZE : 0,
              marginBottom: horizontalSpacing ? Dimensions.GUTTER_SIZE : 0,
            }}
          >
            {renderAd && <Adsense adName={name} />}
          </div>
        )}
      </div>
      <style jsx>{`
        .ad-wrap {
          text-align: center;
        }

        .ad-unit {
          max-width: ${width}px;
        }

        .ad-unit:after {
          content: "";
          display: table;
          clear: both;
        }
      `}</style>
    </>
  );
});
