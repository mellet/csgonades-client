import "next";
import { AnyAction, Store } from "redux";
import { AppState } from "../store/rootReducer";

declare module "next" {
  export interface NextPageContext {
    reduxStore: Store<AppState, AnyAction>;
  }
}
