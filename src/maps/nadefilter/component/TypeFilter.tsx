import { FC } from "react";
import { ButtonGroup } from "./ButtonGroup";
import { NadeTypeButton } from "./NadeTypeButton";
import { useFilterByType } from "../../../store/MapStore/hooks/useFilterByType";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";

type Props = {
  vertical?: boolean;
};

export const TypeFilter: FC<Props> = ({ vertical }) => {
  const { colors } = useTheme();
  const { byType, filterByType } = useFilterByType();

  return (
    <>
      <div id="type-filter">
        <div className="label">TYPE</div>
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
          flex-direction: ${vertical ? "column" : "row"};
          margin-right: -1px;
        }

        .label {
          font-size: 12px;
          margin-bottom: 5px;
          font-weight: 500;
          color: ${vertical ? "white" : colors.TEXT};
        }
      `}</style>
    </>
  );
};
