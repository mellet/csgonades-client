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
        favoriteFilter={<FavFilterButton vertical />}
        typeFilter={<TypeFilter vertical />}
        tickFiler={<TickratePicker vertical />}
        teamFilter={<TeamSelector vertical />}
        proFilter={<FilterByProButton vertical />}
        viewFilter={<MapViewSelector vertical />}
        resetFilter={<ResetFilterButton />}
      />
    </>
  );
});

export default FilterBar;
