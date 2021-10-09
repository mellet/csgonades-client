import { FC } from "react";
import AdSense from "react-ssr-adsense";

export const AdUnitAdSense: FC = () => {
  return (
    <AdSense
      client="ca-pub-7292810486004926"
      slot="7806394673"
      style={{ display: "block" }}
      layout="in-article"
      format="fluid"
    />
  );
};
