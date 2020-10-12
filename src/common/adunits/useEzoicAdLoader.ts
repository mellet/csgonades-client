import { useEffect } from "react";
import { useRouter } from "next/router";

export const useEzoidAdLoader = (): void => {
  const router = useRouter();
  useEffect(() => {
    if (router.asPath.includes("adtesting")) {
      return;
    }

    loadAds();

    router.events.on("routeChangeComplete", loadAds);

    return () => router.events.off("routeChangeComplete", loadAds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const loadAds = async () => {
  try {
    const ez = ezstandalone || {};

    const adIds = findAdUnits();

    if (!adIds.length) {
      return;
    }

    if (ez.hasDisplayedAds) {
      const adIds = findAdUnits();
      ez.define(adIds);
      ez.refresh();
    } else {
      ez.cmd.push(() => {
        const adIds = findAdUnits();
        ez.setIsPWA();
        ez.define(adIds);
        ez.enable();
        ez.display();
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

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
