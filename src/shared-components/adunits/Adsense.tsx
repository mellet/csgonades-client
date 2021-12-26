import { FC, memo, useEffect, useMemo, CSSProperties } from "react";
import { AppConfig, IS_PROD } from "../../constants/Constants";
import { assertNever } from "../../utils/Common";

export type AdUnitName =
  | "mapSidebarSquare"
  | "blogSidebar"
  | "fixed728x90"
  | "nadePageSkyscraper"
  | "blogHorizontalFirst"
  | "blogHorizontalSecond"
  | "blogHorizontalThird"
  | "frontPageMobile"
  | "suggestedNadesHorizontal"
  | "nadeComment";

type AdsenseConfig = {
  style: CSSProperties;
  adSlot: string;
  adFormat?: "auto";
  fullWidthResponsive?: true;
};

type Props = {
  adName: AdUnitName;
};

export const Adsense: FC<Props> = memo(({ adName }) => {
  useEffect(() => {
    if (!AppConfig.enableAdsense) {
      return;
    }
    try {
      // @ts-ignore
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("Failed to init ad");
    }
  }, []);

  const config = useMemo<AdsenseConfig>(() => {
    return adNameToConfig(adName);
  }, [adName]);

  return (
    <>
      <div className="ad-clearfix">
        <ins
          className="adsbygoogle"
          style={{ ...config.style, ...debugStyle(adName) }}
          data-ad-client="ca-pub-2255854420599519"
          data-ad-slot={config.adSlot}
          data-ad-format={config.adFormat}
          data-full-width-responsive={
            config.fullWidthResponsive ? "true" : undefined
          }
        >
          {!IS_PROD && (
            <span style={{ textAlign: "center" }}>
              Ad
              <br />
              {adName}
            </span>
          )}
        </ins>
      </div>
      <style jsx>{`
        .ad-clearfix:after {
          content: "";
          display: table;
          clear: both;
        }
      `}</style>
    </>
  );
});

export function adNameToConfig(adName: AdUnitName): AdsenseConfig {
  const sharedResponsiveConfig: Pick<
    AdsenseConfig,
    "adFormat" | "fullWidthResponsive" | "style"
  > = {
    adFormat: "auto",
    fullWidthResponsive: true,
    style: {
      display: "block",
    },
  };

  switch (adName) {
    case "mapSidebarSquare":
      return {
        adSlot: "6691131972",
        style: {
          display: "inline-block",
          width: 300,
          height: 300,
        },
      };
    case "blogSidebar":
      return {
        ...sharedResponsiveConfig,
        adSlot: "8306403888",
      };
    case "fixed728x90":
      return {
        adSlot: "6474383821",
        style: {
          display: "inline-block",
          width: 728,
          height: 90,
        },
      };
    case "nadePageSkyscraper":
      return {
        ...sharedResponsiveConfig,
        adSlot: "4143797591",
      };
    case "blogHorizontalFirst":
      return {
        ...sharedResponsiveConfig,
        adSlot: "4299769366",
      };
    case "blogHorizontalSecond":
      return {
        ...sharedResponsiveConfig,
        adSlot: "5609579041",
      };
    case "blogHorizontalThird":
      return {
        ...sharedResponsiveConfig,
        adSlot: "1670334030",
      };
    case "frontPageMobile":
      return {
        ...sharedResponsiveConfig,
        adSlot: "7322632881",
      };
    case "suggestedNadesHorizontal":
      return {
        ...sharedResponsiveConfig,
        adSlot: "2939167761",
      };
    case "nadeComment":
      return {
        ...sharedResponsiveConfig,
        adSlot: "2808057820",
      };
    default:
      return assertNever(adName);
  }
}

const debugStyle = (adName: AdUnitName): CSSProperties => {
  const config = adNameToConfig(adName);

  if (IS_PROD) {
    return {};
  } else {
    return {
      ...config.style,
      height: config.style.height || 200,
      background: "#e8e8e8",
      display: "flex",
      whiteSpace: "nowrap",
      alignItems: "center",
      justifyContent: "center",
      color: "#666",
      border: "1px solid #ccc",
      textDecoration: "none",
    };
  }
};
