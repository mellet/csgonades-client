import { AppState } from "../rootReducer";

export const toastSelector = (state: AppState) => state.toastStore.toasts;
