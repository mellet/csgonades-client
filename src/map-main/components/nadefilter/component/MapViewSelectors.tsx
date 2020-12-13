import { FC } from "react";
import { useSetMapView } from "../../../../store/MapStore/hooks/useSetMapView";
import { FaMap, FaListUl } from "react-icons/fa";
import { Dimensions } from "../../../../constants/Constants";
import { useTheme } from "../../../../store/SettingsStore/SettingsHooks";
import { FilterLabel } from "./FilterLabel";

export const MapViewSelector: FC = () => {
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
      <div className="view-selector">
        <FilterLabel value="VIEW" />
        <div className="view-selector-btns">
          <button
            className={
              mapView === "overview" ? "selector selected" : "selector"
            }
            onClick={onSwitchToOverview}
          >
            <FaMap size={Dimensions.BUTTON_HEIGHT / 1.8} />
          </button>
          <button
            className={mapView === "list" ? "selector selected" : "selector"}
            onClick={onSwtichToList}
          >
            <FaListUl size={Dimensions.BUTTON_HEIGHT / 1.8} />
          </button>
        </div>
      </div>
      <style jsx>{`
        .view-selector-btns {
          display: flex;
          flex-direction: column;
          background: ${colors.filterBg};
          overflow: hidden;
          border-radius: 5px;
        }

        .selector {
          border: none;
          outline: none;
          background: ${colors.filterBg};
          width: ${Dimensions.BUTTON_HEIGHT}px;
          height: ${Dimensions.BUTTON_HEIGHT}px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: white;
          font-size: ${Dimensions.BUTTON_HEIGHT / 2}px;
          cursor: pointer;
          overflow: hidden;
          border-bottom: 1px solid rgba(0, 0, 0, 0.5);
          transition: background 0.1s;
        }

        .selector:last-child {
          border-right: none;
        }

        .view-selector button:hover {
          background: ${colors.filterBgHover};
        }

        .selected {
          background: ${colors.filterBgHover};
        }
      `}</style>
    </>
  );
};
