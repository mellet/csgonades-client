import { NextPage } from "next";
import React, { memo } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import applicationStore, { AppState } from "../store";

type Props = {
  initialReduxState: AppState;
};

export const withRedux = (PageComponent: NextPage) => {
  const WithRedux: NextPage<Props> = memo(({ ...props }) => {
    const store = applicationStore;
    const persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={<PageComponent {...props} />}
        >
          <PageComponent {...props} />
        </PersistGate>
      </Provider>
    );
  });

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";

    WithRedux.displayName = `withRedux(${displayName})`;
  }

  return WithRedux;
};
