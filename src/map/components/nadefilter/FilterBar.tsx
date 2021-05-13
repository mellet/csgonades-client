import { FC, memo } from "react";
import { TypeFilter } from "./component/TypeFilter";
import { FavFilterButton } from "./component/FavFilterButton";
import { MapViewSelector } from "./component/MapViewSelectors";
import { ResetFilterButton } from "./component/ResetFilterButton";
import { FilterByProButton } from "./component/FilterByProButton";
import { FilterBarLayout } from "./FilterBarLayout";
import { TeamSelector } from "./component/TeamSelector";
import { TickratePicker } from "./component/TickratePicker";

const FilterBar: FC = memo(() => {
  return (
    <>
      <FilterBarLayout
        favoriteFilter={<FavFilterButton />}
        proFilter={<FilterByProButton />}
        resetFilter={<ResetFilterButton />}
        tickFiler={<TickratePicker />}
        typeFilter={<TypeFilter />}
        viewFilter={<MapViewSelector />}
        teamFilter={<TeamSelector />}
      />
    </>
  );
});

export default FilterBar;
