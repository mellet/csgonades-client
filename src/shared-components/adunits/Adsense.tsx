import { FC, CSSProperties } from "react";
import AdSense from "react-ssr-adsense";
import { AdsenseCustom } from "./AdsenseCustom";

type AdFormat =
  | "in-article"
  | "horizontal"
  | "square"
  | "vertical"
  | "fixed728x90"
  | "in-blog"
  | "in-nade-list"
  | "fixed250"
  | "fixed300";

type Props = {
  adFormat: AdFormat;
  style?: CSSProperties;
};

export const AdUnitAdSense: FC<Props> = ({ adFormat, style }) => {
  if (adFormat === "fixed300") {
    return <AdsenseCustom size="300x300" />;
  }

  if (adFormat === "fixed250") {
    return <AdsenseCustom size="250x230" />;
  }

  if (adFormat === "in-nade-list") {
    return (
      <AdSense
        client="ca-pub-2255854420599519"
        slot="1542966243"
        style={{ display: "block", height: 230 }}
        format="auto"
        responsive="true"
      />
    );
  }

  if (adFormat === "in-blog") {
    return (
      <AdSense
        client="ca-pub-2255854420599519"
        slot="1182382908"
        style={{ display: "block" }}
        format="fluid"
        layoutKey="-5j+bp-1o-3z+u7"
        responsive="true"
      />
    );
  }

  if (adFormat === "horizontal") {
    return (
      <AdSense
        client="ca-pub-2255854420599519"
        slot="4299769366"
        style={style ? { ...style, display: "block" } : { display: "block" }}
        format="auto"
        responsive="true"
      />
    );
  }

  if (adFormat === "fixed728x90") {
    return <AdsenseCustom size="728x90" />;
  }

  if (adFormat === "vertical") {
    return (
      <AdSense
        client="ca-pub-2255854420599519"
        slot="6719702506"
        style={{ display: "block" }}
        format="auto"
        responsive="true"
      />
    );
  }

  if (adFormat === "square") {
    return (
      <AdSense
        client="ca-pub-2255854420599519"
        slot="6893569697"
        style={{ display: "block" }}
        format="auto"
        responsive="true"
      />
    );
  }

  if (adFormat === "in-article") {
    return (
      <AdSense
        client="ca-pub-2255854420599519"
        slot="1671636402"
        style={{ display: "block", textAlign: "center" }}
        layout="in-article"
        format="fluid"
      />
    );
  }

  return null;
};
