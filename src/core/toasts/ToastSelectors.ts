import { AppState } from "../store/rootReducer";

export const toastSelector = (state: AppState) => state.toastStore.toasts;
