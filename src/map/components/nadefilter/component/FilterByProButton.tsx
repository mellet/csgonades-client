import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useFilterByPro } from "../../../logic/useFilterByPro";
import { FilterLabel } from "./FilterLabel";
import { SquareButton } from "../../../../shared-components/buttons/IconButton/IconButton";

type Props = {
  vertical?: boolean;
};

export const FilterByProButton: FC<Props> = ({ vertical }) => {
  const { byPro, toggleFilterByPro } = useFilterByPro();

  function onFilterByPro() {
    toggleFilterByPro();
  }

  return (
    <>
      <FilterLabel value="PRO" center={vertical} />
      <SquareButton
        active={byPro}
        icon={<FaCheckCircle />}
        activeColor="#00b8d9"
        onClick={onFilterByPro}
      />
    </>
  );
};
