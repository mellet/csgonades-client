import { FC } from "react";
import { useSetMapView } from "../../../data/hooks/useSetMapView";
import { FaMap, FaListUl } from "react-icons/fa";
import { FilterLabel } from "./FilterLabel";
import { IconButtonGroup } from "../../../../shared-components/buttons/IconButtonGroup.tsx/IconButtonGroup";
import { SquareButton } from "../../../../shared-components/buttons/IconButton";

export const MapViewSelector: FC = () => {
  const { mapView, setMapView } = useSetMapView({ trackEvent: true });

  function onSwitchToOverview() {
    setMapView("overview");
  }

  function onSwtichToList() {
    setMapView("list");
  }

  return (
    <>
      <FilterLabel value="VIEW" />
      <IconButtonGroup>
        <SquareButton
          inGroup
          icon={<FaMap />}
          active={mapView === "overview"}
          onClick={onSwitchToOverview}
        />
        <SquareButton
          inGroup
          icon={<FaListUl />}
          active={mapView === "list"}
          onClick={onSwtichToList}
        />
      </IconButtonGroup>
    </>
  );
};
