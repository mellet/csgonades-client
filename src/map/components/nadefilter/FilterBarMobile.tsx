import { FC } from "react";
import { NadeCounts } from "../../data/hooks/useNadeCount";
import { FavFilterButton } from "./component/FavFilterButton";
import { FilterByProButton } from "./component/FilterByProButton";
import { ResetFilterButton } from "./component/ResetFilterButton";
import { TeamSelector } from "./component/TeamSelector";
import { TickratePicker } from "./component/TickratePicker";
import { TypeFilter } from "./component/TypeFilter";

type Props = {
  nadeCounts: NadeCounts;
};

export const FilterBarMobile: FC<Props> = ({ nadeCounts }) => {
  return (
    <>
      <div id="fiter-bar-mobile">
        <div className="fav-filter">
          <FavFilterButton />
        </div>
        <div className="type-filter">
          <TypeFilter nadeCounts={nadeCounts} />
        </div>
        <div className="tick-filter">
          <TickratePicker />
        </div>
        <div className="team-filter">
          <TeamSelector />
        </div>
        <div className="pro-filter">
          <FilterByProButton />
        </div>
        <div className="reset-filter">
          <ResetFilterButton />
        </div>
      </div>
      <style jsx>{`
        #fiter-bar-mobile {
          display: grid;
          grid-template-columns: min-content min-content min-content min-content;
          grid-column-gap: 12px;
          grid-row-gap: 12px;
          grid-template-areas:
            "type type type reset"
            "tick team fav pro";
        }

        .fav-filter {
          grid-area: fav;
        }

        .type-filter {
          grid-area: type;
        }

        .tick-filter {
          grid-area: tick;
        }

        .team-filter {
          grid-area: team;
        }

        .reset-filter {
          grid-area: reset;
          padding-top: 14px;
        }
      `}</style>
    </>
  );
};
