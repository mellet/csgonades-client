import { FC } from "react";
import { Dimensions } from "../../../constants/Constants";

type Props = {
  favoriteFilter: JSX.Element;
  typeFilter: JSX.Element;
  tickFiler: JSX.Element;
  proFilter: JSX.Element;
  viewFilter: JSX.Element;
  resetFilter: JSX.Element;
  teamFilter: JSX.Element;
};

export const FilterBarLayout: FC<Props> = ({
  favoriteFilter,
  proFilter,
  resetFilter,
  tickFiler,
  typeFilter,
  viewFilter,
  teamFilter,
}) => {
  return (
    <>
      <FilterBarLayoutWrapper>
        <div style={{ gridArea: "fav", marginBottom: Dimensions.GUTTER_SIZE }}>
          {favoriteFilter}
        </div>
        <div style={{ gridArea: "type", marginBottom: Dimensions.GUTTER_SIZE }}>
          {typeFilter}
        </div>
        <div style={{ gridArea: "tick", marginBottom: Dimensions.GUTTER_SIZE }}>
          {tickFiler}
        </div>
        <div style={{ gridArea: "team", marginBottom: Dimensions.GUTTER_SIZE }}>
          {teamFilter}
        </div>
        <div style={{ gridArea: "pro", marginBottom: Dimensions.GUTTER_SIZE }}>
          {proFilter}
        </div>
        <div style={{ gridArea: "view", marginBottom: Dimensions.GUTTER_SIZE }}>
          {viewFilter}
        </div>
        <div style={{ gridArea: "reset" }}>{resetFilter}</div>
      </FilterBarLayoutWrapper>
    </>
  );
};

const FilterBarLayoutWrapper: FC = ({ children }) => {
  return (
    <>
      <div className="filterbar-layout-wrapper">{children}</div>
      <style jsx>{`
        .filterbar-layout-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas:
            "fav"
            "type"
            "team"
            "tick"
            "pro"
            "view"
            "reset";
        }
      `}</style>
    </>
  );
};
