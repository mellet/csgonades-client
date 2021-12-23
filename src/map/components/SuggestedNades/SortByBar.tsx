import { FC } from "react";
import { FaRocket, FaEye } from "react-icons/fa";
import { MdFiberNew } from "react-icons/md";
import { ImStarFull } from "react-icons/im";
import { IconButtonGroup } from "../../../shared-components/buttons/IconButtonGroup/IconButtonGroup";
import { ButtonWithIcon } from "../../../shared-components/buttons/ButtonWithIcon";
import { useGa } from "../../../utils/Analytics";
import { useFilterBySortingMethod } from "../../logic/useFilterBySortingMethods";

export const SortByBar: FC = () => {
  const { event } = useGa();
  const { bySortingMethod, setSortingMethod } = useFilterBySortingMethod();

  function onSortByHot() {
    setSortingMethod("score");
    event({
      category: "map_page",
      action: `click_filter_sort_hot`,
    });
  }

  function onSortByTop() {
    setSortingMethod("favoriteCount");
    event({
      category: "map_page",
      action: `click_filter_sort_top`,
    });
  }

  function onSortByViews() {
    setSortingMethod("viewCount");
    event({
      category: "map_page",
      action: `click_filter_sort_views`,
    });
  }

  function onSortByNew() {
    setSortingMethod("createdAt");
    event({
      category: "map_page",
      action: `click_filter_sort_new`,
    });
  }

  return (
    <IconButtonGroup>
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
        last
        value="New"
        icon={<MdFiberNew />}
        onClick={onSortByNew}
        active={bySortingMethod === "createdAt"}
      />
    </IconButtonGroup>
  );
};
