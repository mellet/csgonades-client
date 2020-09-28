import { FC, memo } from "react";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { NadeLight } from "../models/Nade/Nade";
import { MapPageNades } from "./MapPageNades";
import { Dimensions } from "../constants/Constants";
import { useMapChangeHandler } from "../store/MapStore/hooks/useMapChangeHandler";
import { SEO } from "../layout/SEO";
import { capitalize } from "../utils/Common";
import { FilterBar } from "./nadefilter/FilterBar";
import { MapViewScreen } from "./MapViewScreen";
import { useIsClientSide } from "../common/MinSizeRender";
import { TopAdPlaceholder } from "../common/adunits/TopAdPlaceholder";
import { LayoutWithSidebar } from "../common/LayoutWithSidebar";
import { MapPageSidebar } from "./MapPageSidebar";

type Props = {
  map: CsgoMap;
  allNades: NadeLight[];
};

export const MapPage: FC<Props> = memo(({ map, allNades }) => {
  const isClientSide = useIsClientSide();
  useMapChangeHandler(allNades);

  return (
    <>
      <TopAdPlaceholder />
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

        {isClientSide && !!allNades && (
          <MapViewScreen map={map} allNades={allNades} />
        )}

        <FilterBar />

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

        @media only screen and (max-width: 100px) {
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
