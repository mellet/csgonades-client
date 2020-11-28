import React, { FC, useReducer } from "react";
import { AdminReducer, AdminState, initialState } from "./adminSlice";

type ContextApi = {
  dispatch: React.Dispatch<any>;
  state: AdminState;
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
