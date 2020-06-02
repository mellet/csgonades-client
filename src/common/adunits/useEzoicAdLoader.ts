import { useEffect } from "react";
import { useRouter } from "next/router";

export const useEzoidAdLoader = (): void => {
  const router = useRouter();
  useEffect(() => {
    loadAds();
  }, [router.asPath]);
};

const loadAds = () => {
  try {
    const ez = ezstandalone || {};

    const adIds = findAdUnits();

    if (!adIds) {
      return;
    }

    if (ez.hasDisplayedAds) {
      ez.cmd.push(() => {
        const adIds = findAdUnits();
        ez.define(adIds);
        ez.refresh();
        console.log("Ads refresh", adIds);
      });
    } else {
      ez.cmd.push(() => {
        const adIds = findAdUnits();
        ez.setIsPWA();
        ez.define(adIds);
        ez.enable();
        ez.display();
        console.log("Ads display", adIds);
      });
    }
  } catch (error) {
    console.warn(error);
  }
};

const findAdUnits = () => {
  const adPlaceHolders = document.querySelectorAll(
    '[id^="ezoic-pub-ad-placeholder"]'
  );

  const ids: number[] = [];

  adPlaceHolders.forEach((el) => {
    const phId = el.id.match(/\d+/g)?.join("");
    if (phId) {
      const indId = parseInt(phId, 10);
      ids.push(indId);
    }
  });

  return ids;
};
