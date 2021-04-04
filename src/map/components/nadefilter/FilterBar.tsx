import { FC, memo } from "react";
import { TypeFilter } from "./component/TypeFilter";
import { TickrateSelector } from "./component/TickrateSelector";
import { FavFilterButton } from "./component/FavFilterButton";
import { MapViewSelector } from "./component/MapViewSelectors";
import { ResetFilterButton } from "./component/ResetFilterButton";
import { FilterByProButton } from "./component/FilterByProButton";
import { FilterBarLayout } from "./FilterBarLayout";
import { TeamSelector } from "./component/TeamSelector";

const FilterBar: FC = memo(() => {
  return (
    <>
      <FilterBarLayout
        favoriteFilter={<FavFilterButton />}
        proFilter={<FilterByProButton />}
        resetFilter={<ResetFilterButton />}
        tickFiler={<TickrateSelector />}
        typeFilter={<TypeFilter />}
        viewFilter={<MapViewSelector />}
        teamFilter={<TeamSelector />}
      />
    </>
  );
});

export default FilterBar;
