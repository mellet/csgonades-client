import React, { FC, useReducer } from "react";
import { AdminActions } from "./actions";
import { AdminReducer, AdminState, initialState } from "./reducer";

type ContextApi = {
  state: AdminState;
  dispatch: React.Dispatch<AdminActions>;
};

//@ts-ignore
export const AdminStoreContext = React.createContext<ContextApi>(null);

export const AdminStoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(AdminReducer, initialState);

  const value = { state, dispatch };

  return (
    <AdminStoreContext.Provider value={value}>
      {children}
    </AdminStoreContext.Provider>
  );
};
