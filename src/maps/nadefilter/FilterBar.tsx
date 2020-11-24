import { FC, memo } from "react";
import { SortingMethodSelector } from "../SortingMethodSelector";
import { TypeFilter } from "./component/TypeFilter";
import { TickrateSelector } from "./component/TickrateSelector";
import { FavFilterButton } from "./component/FavFilterButton";
import { MapViewSelector } from "./component/MapViewSelectors";
import { ResetFilterButton } from "./component/ResetFilterButton";
import { Dimensions } from "../../constants/Constants";
import { useSetMapView } from "../../store/MapStore/hooks/useSetMapView";
import { FilterByProButton } from "./component/FilterByProButton";

const FilterBar: FC = memo(({}) => {
  const { mapView } = useSetMapView();

  return (
    <>
      <div id="filters">
        <div id="filter-fav">
          <FavFilterButton />
        </div>

        {mapView === "list" && (
          <div id="filter-sort">
            <SortingMethodSelector />
          </div>
        )}

        <div id="filter-type">
          <TypeFilter />
        </div>
        <div id="filter-tick">
          <TickrateSelector />
        </div>

        <div id="filter-pro">
          <FilterByProButton />
        </div>

        <div id="view-selector">
          <MapViewSelector />
        </div>
        <div id="filter-reset">
          <ResetFilterButton />
        </div>
      </div>
      <style jsx>{`
        #filters {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          display: grid;
          grid-template-columns:
            min-content
            min-content
            min-content
            min-content
            1fr
            min-content
            min-content;
          grid-template-areas: "favfilter typefilter tickfilter filterpro resetfilter sortfilter viewselector";
          grid-column-gap: 16px;
        }

        #filter-pro {
          grid-area: filterpro;
        }

        #view-selector {
          grid-area: viewselector;
        }

        #filter-reset {
          grid-area: resetfilter;
        }

        #filter-map {
          grid-area: mapfilter;
        }

        #filter-sort {
          grid-area: sortfilter;
        }

        #filter-type {
          grid-area: typefilter;
        }

        #filter-tick {
          grid-area: tickfilter;
        }

        #filter-fav {
          grid-area: favfilter;
        }

        @media only screen and (max-width: 600px) {
          #view-selector {
            display: none;
          }

          #filters {
            margin-bottom: ${Dimensions.GUTTER_SIZE}px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-template-areas:
              "typefilter filterpro favfilter resetfilter"
              "sortfilter sortfilter tickfilter tickfilter";
            grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
            grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
            height: auto;
          }
        }
      `}</style>
    </>
  );
});

export default FilterBar;
