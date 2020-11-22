import React, { FC, useReducer } from "react";
import { AdminReducer, AdminState, initialState } from "./adminSlice";

type ContextApi = {
  state: AdminState;
  dispatch: React.Dispatch<any>;
};

export const AdminStoreContext = React.createContext<ContextApi | null>(null);

export const AdminStoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(AdminReducer, initialState);

  const value = { state, dispatch };

  return (
    <AdminStoreContext.Provider value={value}>
      {children}
    </AdminStoreContext.Provider>
  );
};
