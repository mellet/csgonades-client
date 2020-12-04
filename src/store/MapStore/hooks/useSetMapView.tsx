import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAnalytics } from "../../../utils/Analytics";
import { mapViewSelector } from "../selectors";
import { MapView, setMapViewAction } from "../slice";

type UseMapViewConfig = {
  trackEvent?: boolean;
};

export const useSetMapView = (config?: UseMapViewConfig) => {
  const { trackEvent } = config || {};
  const { event } = useAnalytics();
  const mapView = useSelector(mapViewSelector);
  const dispatch = useDispatch();

  const setMapView = useCallback(
    (view: MapView) => {
      dispatch(setMapViewAction(view));
      if (trackEvent) {
        event({
          category: "Filter",
          action: `Set mapview ${view}`,
        });
      }
    },
    [dispatch, event, trackEvent]
  );
  return {
    mapView,
    setMapView,
  };
};
