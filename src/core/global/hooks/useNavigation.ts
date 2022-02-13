import { useCallback } from "react";
import { useLocalStorage } from "../../../utils/useLocalStorage";

export const useNavigation = () => {
  const [isNavOpen, setIsNavOpen] = useLocalStorage("isNavOpen", false);

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, [setIsNavOpen]);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, [setIsNavOpen]);

  return {
    isNavOpen,
    toggleNav,
    closeNav,
  };
};
