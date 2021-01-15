import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNavOpenSelector } from "../GlobalSelectors";
import { closeNavigationAction, toggleNavigationAction } from "../GlobalStore";

export const useNavigation = () => {
  const dispatch = useDispatch();
  const isNavOpen = useSelector(isNavOpenSelector);

  const toggleNav = useCallback(() => {
    dispatch(toggleNavigationAction());
  }, [dispatch]);

  const closeNav = useCallback(() => {
    dispatch(closeNavigationAction());
  }, [dispatch]);

  return {
    isNavOpen,
    toggleNav,
    closeNav,
  };
};
