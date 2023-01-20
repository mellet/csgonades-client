import { FC } from "react";
import { useSetMapView } from "../../../logic/useSetMapView";
import { FaMap, FaListUl } from "react-icons/fa";
import { FilterLabel } from "./FilterLabel";
import { ButtonGroup } from "../../../../shared-components/buttons/IconButtonGroup/IconButtonGroup";
import { SquareButton } from "../../../../shared-components/buttons/IconButton/SquareButton";
import { useTheme } from "../../../../core/settings/SettingsHooks";

type Props = {
  vertical?: boolean;
};

export const MapViewSelector: FC<Props> = ({ vertical }) => {
  const { colors } = useTheme();
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
      <ButtonGroup vertical>
        <SquareButton
          inGroup
          icon={<FaMap />}
          active={mapView === "overview"}
          onClick={onSwitchToOverview}
          activeColor={colors.TEXT}
        />
        <SquareButton
          inGroup
          last
          icon={<FaListUl />}
          active={mapView === "list"}
          onClick={onSwtichToList}
          activeColor={colors.TEXT}
        />
      </ButtonGroup>
    </>
  );
};
