import { FC, memo, useRef } from "react";
import { useInViewport } from "react-in-viewport";
import { useMediaQuery } from "react-responsive";
import { Dimensions } from "../../constants/Constants";
import { Adsense, AdUnitName } from "./Adsense";

type Props = {
  name: AdUnitName;
  horizontalSpacing?: boolean;
};

export const AdUnit: FC<Props> = memo(({ name, horizontalSpacing }) => {
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const myRef = useRef<HTMLDivElement>(null);
  const { enterCount } = useInViewport(myRef, {
    rootMargin: "400px",
  });

  const renderAd = Boolean(enterCount);

  return (
    <>
      <div
        className="ad-unit"
        ref={myRef}
        style={{
          marginTop: horizontalSpacing ? Dimensions.GUTTER_SIZE : 0,
          marginBottom: horizontalSpacing ? Dimensions.GUTTER_SIZE : 0,
        }}
      >
        {renderAd && <Adsense adName={name} />}
      </div>
      <style jsx>{`
        .ad-unit {
          max-width: ${isMobile ? "90vw" : "auto"};
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
