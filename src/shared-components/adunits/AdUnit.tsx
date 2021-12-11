import { FC, memo, useRef } from "react";
import { useInViewport } from "react-in-viewport";
import { Dimensions } from "../../constants/Constants";
import { Adsense, AdUnitName } from "./Adsense";

type Props = {
  name: AdUnitName;
  horizontalSpacing?: boolean;
};

export const AdUnit: FC<Props> = memo(({ name, horizontalSpacing }) => {
  const myRef = useRef<HTMLDivElement>(null);
  const { enterCount } = useInViewport(myRef, {
    rootMargin: "400px",
  });

  const renderAd = Boolean(enterCount);

  return (
    <div
      ref={myRef}
      style={{
        marginTop: horizontalSpacing ? Dimensions.GUTTER_SIZE : 0,
        marginBottom: horizontalSpacing ? Dimensions.GUTTER_SIZE : 0,
      }}
    >
      {renderAd && <Adsense adName={name} />}
    </div>
  );
});
