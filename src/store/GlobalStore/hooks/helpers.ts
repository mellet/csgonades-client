import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

export const useGlobalDispatch = () => {
  return useDispatch<Dispatch<any>>();
};
