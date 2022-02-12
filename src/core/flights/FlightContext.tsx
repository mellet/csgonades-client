import { createContext, FC, useContext } from "react";
import { useLocalStorage } from "../../utils/useLocalStorage";

export interface FeatureFlags {
  showAdsenseTopSuggestedNades: boolean;
}

const defaultFeatureFlags: FeatureFlags = {
  showAdsenseTopSuggestedNades: false,
};

const FlightContext = createContext<FeatureFlags>(defaultFeatureFlags);

export const FlightProvider: FC = ({ children }) => {
  const [featureFlags] = useLocalStorage<FeatureFlags>(
    "featureFlags",
    defaultFeatureFlags
  );

  return (
    <FlightContext.Provider value={featureFlags}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlights = () => {
  const flights = useContext(FlightContext);

  return flights;
};
