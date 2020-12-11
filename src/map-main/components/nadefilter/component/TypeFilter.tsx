import { FC } from "react";
import { ButtonGroup } from "./ButtonGroup";
import { NadeTypeButton } from "./NadeTypeButton";
import { useFilterByType } from "../../../../store/MapStore/hooks/useFilterByType";
import { FilterLabel } from "./FilterLabel";

export const TypeFilter: FC = () => {
  const { byType, filterByType } = useFilterByType();

  return (
    <>
      <div id="type-filter">
        <FilterLabel value="TYPE" />
        <ButtonGroup>
          <div className="filter-btns">
            <NadeTypeButton
              type="smoke"
              currentType={byType}
              onFilterByType={filterByType}
            />
            <NadeTypeButton
              type="flash"
              currentType={byType}
              onFilterByType={filterByType}
            />
            <NadeTypeButton
              type="molotov"
              currentType={byType}
              onFilterByType={filterByType}
            />
            <NadeTypeButton
              type="hegrenade"
              currentType={byType}
              onFilterByType={filterByType}
            />
          </div>
        </ButtonGroup>
      </div>
      <style jsx>{`
        .filter-btns {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};
