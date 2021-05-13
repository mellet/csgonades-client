import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";

import { useFilterByPro } from "../../../data/hooks/useFilterByPro";
import { FilterLabel } from "./FilterLabel";
import { SquareButton } from "../../../../shared-components/buttons/IconButton";

export const FilterByProButton: FC = () => {
  const { byPro, toggleFilterByPro } = useFilterByPro();

  function onFilterByPro() {
    toggleFilterByPro();
  }

  return (
    <>
      <FilterLabel value="PRO" />
      <SquareButton
        active={byPro}
        icon={<FaCheckCircle />}
        activeColor="#00b8d9"
        onClick={onFilterByPro}
      />
    </>
  );
};
