import { FC } from "react";
import { useSetMapView } from "../../../data/hooks/useSetMapView";
import { FaMap, FaListUl } from "react-icons/fa";
import { FilterLabel } from "./FilterLabel";
import { IconButtonGroup } from "../../../../shared-components/buttons/IconButtonGroup/IconButtonGroup";
import { SquareButton } from "../../../../shared-components/buttons/IconButton/IconButton";

type Props = {
  vertical?: boolean;
};

export const MapViewSelector: FC<Props> = ({ vertical }) => {
  const { mapView, setMapView } = useSetMapView({ trackEvent: true });

  function onSwitchToOverview() {
    setMapView("overview");
  }

  function onSwtichToList() {
    setMapView("list");
  }

  return (
    <>
      <FilterLabel value="VIEW" center={vertical} />
      <IconButtonGroup vertical>
        <SquareButton
          inGroup
          icon={<FaMap />}
          active={mapView === "overview"}
          onClick={onSwitchToOverview}
        />
        <SquareButton
          inGroup
          last
          icon={<FaListUl />}
          active={mapView === "list"}
          onClick={onSwtichToList}
        />
      </IconButtonGroup>
    </>
  );
};
