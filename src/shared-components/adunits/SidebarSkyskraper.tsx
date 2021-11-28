import { FC } from "react";
import { isMobile } from "react-device-detect";
import { AdUnitAdSense } from "./Adsense";

export const SidebarSkyskraperAd: FC = ({}) => {
  const disabled = isMobile;

  if (disabled) {
    return null;
  }

  return (
    <>
      <AdUnitAdSense adFormat="vertical" />
    </>
  );
};
