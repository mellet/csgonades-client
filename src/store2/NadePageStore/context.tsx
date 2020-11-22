import React, { FC, useReducer } from "react";
import { Nade } from "../../nade-data/Nade/Nade";
import { NadeActions } from "./actions";
import {
  nadePageInitialState,
  NadePageReducer,
  NadePageState,
} from "./reducer";

type ContextApi = {
  state: NadePageState;
  dispatch: React.Dispatch<NadeActions>;
};

export let NadePageStoreContext: React.Context<ContextApi>;

type Props = {
  nade: Nade;
};

export const NadePageStoreProvider: FC<Props> = ({ children, nade }) => {
  const [state, dispatch] = useReducer(NadePageReducer, {
    ...nadePageInitialState,
    nade,
  });

  const value = { state, dispatch };

  NadePageStoreContext = React.createContext<ContextApi>(value);

  return (
    <NadePageStoreContext.Provider value={value}>
      {children}
    </NadePageStoreContext.Provider>
  );
};
