import { FC, useCallback, useMemo } from "react";
import { SquareButton } from "../../../../shared-components/buttons/IconButton/IconButton";
import { useFilterByTickrate } from "../../../data/hooks/useFilterByTickrate";
import { FilterLabel } from "./FilterLabel";
import { OptionCarusel } from "./OptionCarusel";

type Props = {
  vertical?: boolean;
};

export const TickratePicker: FC<Props> = ({ vertical }) => {
  const { byTickrate, filterByTickrate } = useFilterByTickrate();

  const selectedIndex = useMemo(() => {
    switch (byTickrate) {
      case "tick128":
        return 1;
      case "tick64":
        return 2;
      default:
        return 0;
    }
  }, [byTickrate]);

  const onChangeTickrate = useCallback(() => {
    if (byTickrate === "any") {
      filterByTickrate("tick128");
    } else if (byTickrate === "tick128") {
      filterByTickrate("tick64");
    } else {
      filterByTickrate("any");
    }
  }, [byTickrate, filterByTickrate]);

  return (
    <>
      <FilterLabel value="TICK" center={vertical} />
      <SquareButton
        onClick={onChangeTickrate}
        icon={
          <OptionCarusel
            values={["Any", "128", "64"]}
            selectedIndex={selectedIndex}
          />
        }
      />
    </>
  );
};
