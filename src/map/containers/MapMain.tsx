import React, { FC, memo } from "react";
import { Dimensions, LayoutBreakpoint } from "../../constants/Constants";
import { SEO } from "../../shared-components/SEO";
import { capitalize } from "../../utils/Common";
import FilterBar from "../components/nadefilter/FilterBar";
import { CsMap } from "../models/CsGoMap";
import { FilterBarMobile } from "../components/nadefilter/FilterBarMobile";
import { useIsDeviceSize } from "../../core/layout/useDeviceSize";
import { AddNadeButton } from "./NewAddNadeButton";
import { MapViewMobile } from "./MapViewMobile";
import { MapViewDesktop } from "./MapViewDesktop";
import { BraveBrowserWarning } from "./BraveBrowserWarning";

type Props = {
  csMap: CsMap;
};

export const MapMain: FC<Props> = memo(({ csMap }) => {
  const { isMobile } = useIsDeviceSize();

  return (
    <>
      <SEO
        title={mapPageTitleSeo(csMap)}
        canonical={`/maps/${csMap}`}
        description={`Find and learn the best smoke, flashbang, molotov and grenade spots for ${capitalize(
          csMap
        )}. Browse our large collection of nades for CS:GO.`}
      />

      <div id="nade-page">
        <BraveBrowserWarning />

        <div id="filter">{isMobile ? <FilterBarMobile /> : <FilterBar />}</div>

        {!isMobile && (
          <div id="add-nade">
            <AddNadeButton />
          </div>
        )}

        <div id="nade-nades">
          {isMobile ? (
            <MapViewMobile csMap={csMap} />
          ) : (
            <MapViewDesktop csMap={csMap} />
          )}
        </div>
      </div>
      <style jsx>{`
        #nade-page {
          position: relative;
          width: 100%;
          display: flex;
          height: 100%;
        }

        #filter {
          position: absolute;
          top: 15px;
          left: 15px;
          z-index: 2;
        }

        #add-nade {
          z-index: 2;
        }

        #nade-nades {
          flex: 1;
          width: 100%;
        }

        @media only screen and (max-width: ${LayoutBreakpoint.MOBILE}px) {
          #nade-page {
            position: relative;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-areas:
              "filter"
              "nades";
            grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          }

          #filter {
            position: relative;
            top: 0;
            left: 0;
            padding: ${Dimensions.GUTTER_SIZE}px;
            padding-bottom: 0;
            width: 100%;
            z-index: 2;
          }
        }
      `}</style>
    </>
  );
});

function mapPageTitleSeo(map: CsMap) {
  if (!map) {
    return "Not found";
  }

  return `${capitalize(map)} Smokes, Flashes and Molotovs`;
}
