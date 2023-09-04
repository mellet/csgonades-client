import { FC } from "react";
import { FavFilterButton } from "./component/FavFilterButton";
import { FilterByProButton } from "./component/FilterByProButton";
import { ResetFilterButton } from "./component/ResetFilterButton";
import { TeamSelector } from "./component/TeamSelector";
import { TickratePicker } from "./component/TickratePicker";
import { TypeFilter } from "./component/TypeFilter";

export const FilterBarMobile: FC = () => {
  return (
    <>
      <div id="fiter-bar-mobile">
        <div className="fav-filter">
          <FavFilterButton />
        </div>
        <div className="type-filter">
          <TypeFilter />
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
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
      `}</style>
    </>
  );
};
