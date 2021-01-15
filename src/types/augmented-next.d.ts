import "next";
import { AnyAction, Store } from "redux";
import { AppState } from "../core/store/rootReducer";

declare module "next" {
  export interface NextPageContext {
    reduxStore: Store<AppState, AnyAction>;
  }
}
