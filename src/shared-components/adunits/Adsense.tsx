import { FC } from "react";
import AdSense from "react-ssr-adsense";

export const AdUnitAdSense: FC = () => {
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
