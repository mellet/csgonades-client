import { FC, memo } from "react";
import { SortingMethodSelector } from "../SortingMethodSelector";
import { TypeFilter } from "./component/TypeFilter";
import { TickrateSelector } from "./component/TickrateSelector";
import { FavFilterButton } from "./component/FavFilterButton";
import { MapViewSelector } from "./component/MapViewSelectors";
import { ResetFilterButton } from "./component/ResetFilterButton";
import { Dimensions } from "../../constants/Constants";
import { FilterByProButton } from "./component/FilterByProButton";
import { isMobileOnly } from "react-device-detect";

const FilterBar: FC = memo(({}) => {
  return (
    <>
      <div id="filters">
        <div id="filter-fav" className="spacer">
          <FavFilterButton />
        </div>

        {false && (
          <div id="filter-sort" className="spacer">
            <SortingMethodSelector />
          </div>
        )}

        <div id="filter-type" className="spacer">
          <TypeFilter />
        </div>

        <div id="filter-tick" className="spacer">
          <TickrateSelector />
        </div>

        <div id="filter-pro" className="spacer">
          <FilterByProButton />
        </div>

        {!isMobileOnly && (
          <div id="view-selector" className="spacer">
            <MapViewSelector />
          </div>
        )}

        <div id="filter-reset">
          <ResetFilterButton />
        </div>
      </div>
      <style jsx>{`
        #filters {
          display: flex;
          flex-direction: column;
          margin: 16px 0px 16px 16px;
        }

        .spacer {
          margin-bottom: ${Dimensions.GUTTER_SIZE / 2}px;
        }
      `}</style>
    </>
  );
});

export default FilterBar;
