import { FC, memo, useEffect, useMemo } from "react";

type FixedSize = "250" | "300";

type Props = {
  size: FixedSize;
};

export const AdsenseCustom: FC<Props> = memo(({ size }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("Failed to init ad");
    }
  }, []);

  const sizeInNumber = useMemo(() => {
    if (size === "300") {
      return 300;
    } else {
      return 200;
    }
  }, [size]);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{
          display: "inline-block",
          width: sizeInNumber,
          height: sizeInNumber,
        }}
        data-ad-client="ca-pub-2255854420599519"
        data-ad-slot={size === "300" ? "6691131972" : "2264364431"}
      ></ins>
    </>
  );
});
