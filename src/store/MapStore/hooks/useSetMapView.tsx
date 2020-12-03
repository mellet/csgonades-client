import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAnalytics } from "../../../utils/Analytics";
import { mapViewSelector } from "../selectors";
import { MapView, setMapViewAction } from "../slice";

export const useSetMapView = () => {
  const { event } = useAnalytics();
  const mapView = useSelector(mapViewSelector);
  const dispatch = useDispatch();

  const setMapView = useCallback(
    (view: MapView) => {
      dispatch(setMapViewAction(view));
      event({
        category: "Filter",
        action: `Set mapview ${view}`,
      });
    },
    [dispatch, event]
  );
  return {
    mapView,
    setMapView,
  };
};
