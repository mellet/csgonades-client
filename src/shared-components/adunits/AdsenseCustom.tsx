import { FC, memo, useEffect, useMemo } from "react";

type FixedSize = "250x230" | "300x300" | "728x90";

type Props = {
  size: FixedSize;
};

type AdsenseFixedConfig = {
  slot: string;
  width?: number;
  height?: number;
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

  const config = useMemo<AdsenseFixedConfig>(() => {
    if (size === "300x300") {
      return {
        slot: "6691131972",
        height: 300,
        width: 300,
      };
    } else if (size === "728x90") {
      return {
        slot: "6474383821",
        height: 90,
        width: 728,
      };
    } else {
      return {
        slot: "2264364431",
        height: 230,
      };
    }
  }, [size]);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{
          display: "inline-block",
          width: config.width || "100%",
          height: config.height,
        }}
        data-ad-client="ca-pub-2255854420599519"
        data-ad-slot={config.slot}
      ></ins>
    </>
  );
});
