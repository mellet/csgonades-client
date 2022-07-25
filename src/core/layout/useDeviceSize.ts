import { useMediaQuery } from "react-responsive";
import { LayoutBreakpoint } from "../../constants/Constants";

export const useIsDeviceSize = () => {
  const isMobile = useMediaQuery({ maxWidth: LayoutBreakpoint.MOBILE });
  const isTablet = useMediaQuery({ maxWidth: LayoutBreakpoint.TABLET });
  const isDesktop = useMediaQuery({ minWidth: LayoutBreakpoint.TABLET });

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};
