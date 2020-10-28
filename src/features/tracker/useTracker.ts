import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementVisitedNades, numNadesVisitedSelector } from "./TrackerSlice";

export const useIncrementNumNadesVisisted = (): (() => void) => {
  const dispatch = useDispatch();
  const incrementStuff = useCallback(() => {
    dispatch(incrementVisitedNades());
  }, [dispatch]);

  return incrementStuff;
};

export const useNumNadesVisited = (): number => {
  const numNadesVisited = useSelector(numNadesVisitedSelector);
  return numNadesVisited;
};
