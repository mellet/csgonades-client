import { FC, memo } from "react";
import { TypeFilter } from "./component/TypeFilter";
import { FavFilterButton } from "./component/FavFilterButton";
import { MapViewSelector } from "./component/MapViewSelectors";
import { ResetFilterButton } from "./component/ResetFilterButton";
import { FilterByProButton } from "./component/FilterByProButton";
import { FilterBarLayout } from "./FilterBarLayout";
import { TeamSelector } from "./component/TeamSelector";
import { TickratePicker } from "./component/TickratePicker";
import { NadeCounts } from "../../data/hooks/useNadeCount";

type Props = {
  nadeCounts: NadeCounts;
};

const FilterBar: FC<Props> = memo(({ nadeCounts }) => {
  return (
    <>
      <FilterBarLayout
        favoriteFilter={<FavFilterButton />}
        proFilter={<FilterByProButton />}
        resetFilter={<ResetFilterButton />}
        tickFiler={<TickratePicker />}
        typeFilter={<TypeFilter nadeCounts={nadeCounts} />}
        viewFilter={<MapViewSelector />}
        teamFilter={<TeamSelector />}
      />
    </>
  );
});

export default FilterBar;
