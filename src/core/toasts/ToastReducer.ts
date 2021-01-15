import { Reducer } from "redux";
import { assertNever } from "../../utils/Common";
import { AppToast, ToastActions } from "./ToastActions";

export interface ToastState {
  toasts: AppToast[];
}

const initialState: ToastState = {
  toasts: [],
};

export const ToastReducer: Reducer<ToastState, ToastActions> = (
  state = initialState,
  action
): ToastState => {
  switch (action.type) {
    case "@@notification/ADD":
      return {
        ...state,
        toasts: [...state.toasts, action.notification],
      };
    case "@@notification/REMOVE":
      const removed = state.toasts.filter(n => n.id !== action.id);
      return {
        ...state,
        toasts: removed,
      };
    default:
      assertNever(action);
      return state;
  }
};
