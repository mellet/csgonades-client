import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGa } from "../../../utils/Analytics";
import { mapViewSelector } from "../selectors";
import { MapView, setMapViewAction } from "../slice";

type UseMapViewConfig = {
  trackEvent?: boolean;
};

export const useSetMapView = (config?: UseMapViewConfig) => {
  const { trackEvent } = config || {};
  const ga = useGa();
  const mapView = useSelector(mapViewSelector);
  const dispatch = useDispatch();

  const setMapView = useCallback(
    (view: MapView) => {
      dispatch(setMapViewAction(view));
      if (trackEvent) {
        ga.event({
          category: "map_page",
          action: `click_filter_view_${view}`,
        });
      }
    },
    [dispatch, ga, trackEvent]
  );
  return {
    mapView,
    setMapView,
  };
};
