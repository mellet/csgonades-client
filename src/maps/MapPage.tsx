import React, { FC, memo, Suspense } from "react";
import { CsgoMap } from "../nade-data/Nade/CsGoMap";
import { NadeLight } from "../nade-data/Nade/Nade";
import { MapPageNades } from "./MapPageNades";
import { Dimensions } from "../constants/Constants";
import { useMapChangeHandler } from "../store/MapStore/hooks/useMapChangeHandler";
import { SEO } from "../layout/SEO";
import { capitalize } from "../utils/Common";
import { useIsClientSide } from "../common/MinSizeRender";
import { LayoutWithSidebar } from "../common/LayoutWithSidebar";
import { MapPageSidebar } from "./MapPageSidebar";
import { MapPageNewJumbo } from "./MapPageNewJumbo";
import { FilterBarLazy } from "./nadefilter/FilterBarLazy";

const MapViewScreen = React.lazy(() => import("./MapViewScreen"));

const isServer = typeof window === "undefined";

type Props = {
  map: CsgoMap;
  allNades: NadeLight[];
};

export const MapPage: FC<Props> = memo(({ map, allNades }) => {
  const isClientSide = useIsClientSide();
  useMapChangeHandler(allNades);

  return (
    <>
      <MapPageNewJumbo csMap={map} nades={allNades} />

      <LayoutWithSidebar
        key={"map-" + map}
        sidebar={<MapPageSidebar map={map} nades={allNades} />}
      >
        <SEO
          title={mapPageTitleSeo(map)}
          canonical={`/maps/${map}`}
          description={`Find and learn the best smoke, flashbang, molotov and grenade spots for ${capitalize(
            map
          )}. Browse our large collection of nades for CS:GO.`}
        />

        {!isServer && isClientSide && !!allNades && (
          <Suspense fallback={<></>}>
            <MapViewScreen map={map} allNades={allNades} />
          </Suspense>
        )}

        <FilterBarLazy />

        <MapPageNades allNades={allNades} />
      </LayoutWithSidebar>

      <style jsx>{`
        #map-page {
          grid-area: main;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          min-height: calc(
            100vh - ${Dimensions.HEADER_HEIGHT}px -
              ${Dimensions.GUTTER_SIZE * 3}px
          );
          margin-bottom: 50px;
        }

        @media only screen and (max-width: 1000px) {
          #map-page {
            margin: 15px;
          }
        }
      `}</style>
    </>
  );
});

function mapPageTitleSeo(map: CsgoMap) {
  if (!map) {
    return "Not found";
  }

  return `${capitalize(map)} Smokes, Flashes and Molotovs`;
}
