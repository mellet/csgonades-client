import { FC } from "react";
import AdSense from "react-ssr-adsense";

type AdFormat = "in-article" | "horizontal-responsive";

type Props = {
  adFormat: AdFormat;
};

export const AdUnitAdSense: FC<Props> = ({ adFormat }) => {
  if (adFormat === "horizontal-responsive") {
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
