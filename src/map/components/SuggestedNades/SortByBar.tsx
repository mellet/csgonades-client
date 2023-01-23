import { FC } from "react";
import { FaRocket, FaEye } from "react-icons/fa";
import { MdFiberNew } from "react-icons/md";
import { ImStarFull } from "react-icons/im";
import { ButtonGroup } from "../../../shared-components/buttons/IconButtonGroup/IconButtonGroup";
import { ButtonWithIcon } from "../../../shared-components/buttons/ButtonWithIcon";
import { useFilterBySortingMethod } from "../../logic/useFilterBySortingMethods";
import { FilterLabel } from "../nadefilter/component/FilterLabel";

export const SortByBar: FC = () => {
  const { bySortingMethod, setSortingMethod } = useFilterBySortingMethod();

  function onSortByHot() {
    setSortingMethod("score");
  }

  function onSortByTop() {
    setSortingMethod("favoriteCount");
  }

  function onSortByViews() {
    setSortingMethod("viewCount");
  }

  function onSortByNew() {
    setSortingMethod("createdAt");
  }

  return (
    <>
      <div className="sort-by-bar-wrap">
        <FilterLabel value="SORT" center={false} />
        <ButtonGroup>
          <ButtonWithIcon
            inGroup
            value="Hot"
            icon={<FaRocket />}
            onClick={onSortByHot}
            active={bySortingMethod === "score"}
          />
          <ButtonWithIcon
            inGroup
            value="Top"
            icon={<ImStarFull />}
            onClick={onSortByTop}
            active={bySortingMethod === "favoriteCount"}
          />
          <ButtonWithIcon
            inGroup
            value="View"
            icon={<FaEye />}
            onClick={onSortByViews}
            active={bySortingMethod === "viewCount"}
          />
          <ButtonWithIcon
            inGroup
            value="New"
            icon={<MdFiberNew />}
            onClick={onSortByNew}
            active={bySortingMethod === "createdAt"}
          />
        </ButtonGroup>
      </div>
    </>
  );
};
