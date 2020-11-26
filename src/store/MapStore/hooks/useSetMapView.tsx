import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapViewSelector } from "../selectors";
import { MapView, setMapViewAction } from "../slice";

export const useSetMapView = () => {
  const mapView = useSelector(mapViewSelector);
  const dispatch = useDispatch();

  const setMapView = useCallback(
    (view: MapView) => dispatch(setMapViewAction(view)),
    [dispatch]
  );
  return {
    mapView,
    setMapView,
  };
};
