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
        typeFilter={<TypeFilter nadeCounts={nadeCounts} />}
        tickFiler={<TickratePicker />}
        teamFilter={<TeamSelector />}
        proFilter={<FilterByProButton />}
        viewFilter={<MapViewSelector />}
        resetFilter={<ResetFilterButton />}
      />
    </>
  );
});

export default FilterBar;
