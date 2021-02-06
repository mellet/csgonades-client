import { FC, memo } from "react";
import { FaUndo } from "react-icons/fa";
import { useFilterReset } from "../../../data/hooks/useFilterReset";
import { IconButton } from "../../../../shared-components/buttons/IconButton";

export const ResetFilterButton: FC = memo(() => {
  const { canReset, resetFilter } = useFilterReset();

  function onReset() {
    if (canReset) {
      resetFilter();
    }
  }

  const visible = canReset ? "visible" : "";

  return (
    <>
      {visible && (
        <IconButton
          icon={<FaUndo />}
          activeColor={"rgba(173, 0, 0, 0.7)"}
          onClick={onReset}
        />
      )}
    </>
  );
});
