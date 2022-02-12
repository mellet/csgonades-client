import { useCallback } from "react";
import { useGa } from "../../utils/Analytics";
import { useLocalStorage } from "../../utils/useLocalStorage";

type MapView = "overview" | "list";

type UseMapViewConfig = {
  trackEvent?: boolean;
};

export const useSetMapView = (config?: UseMapViewConfig) => {
  const { trackEvent } = config || {};
  const ga = useGa();
  const [mapView, setMapview] = useLocalStorage<MapView>("mapView", "overview");

  const setMapView = useCallback(
    (view: MapView) => {
      setMapview(view);
      if (trackEvent) {
        ga.event({
          category: "map_page",
          action: `click_filter_view_${view}`,
        });
      }
    },
    [ga, trackEvent, setMapview]
  );
  return {
    mapView,
    setMapView,
  };
};
