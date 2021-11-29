import { FC } from "react";
import AdSense from "react-ssr-adsense";

type AdFormat =
  | "in-article"
  | "horizontal"
  | "square"
  | "vertical"
  | "fixed728x90";

type Props = {
  adFormat: AdFormat;
};

export const AdUnitAdSense: FC<Props> = ({ adFormat }) => {
  if (adFormat === "horizontal") {
    return (
      <AdSense
        client="ca-pub-2255854420599519"
        slot="4299769366"
        style={{ display: "block" }}
        format="auto"
        responsive="true"
      />
    );
  }

  if (adFormat === "fixed728x90") {
    return (
      <AdSense
        client="ca-pub-2255854420599519"
        slot="6474383821"
        style={{ display: "inline-block", width: 728, height: 90 }}
      />
    );
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

  return (
    <AdSense
      client="ca-pub-2255854420599519"
      slot="1671636402"
      style={{ display: "block" }}
      layout="in-article"
      format="fluid"
    />
  );
};
