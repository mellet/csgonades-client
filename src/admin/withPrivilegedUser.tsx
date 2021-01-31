import { NextPage } from "next";
import React, { memo } from "react";
import { useIsAdminOrModerator } from "../core/authentication/useIsAdminOrModerator";
import { AppState } from "../core/store/rootReducer";

type Props = {
  initialReduxState: AppState;
};

export const withPrivlegedUser = (PageComponent: NextPage) => {
  const WithPrivlegedUser: NextPage<Props> = memo(({ ...props }) => {
    const isAdminOrMod = useIsAdminOrModerator();

    if (!isAdminOrMod) {
      return null;
    }

    return <PageComponent {...props} />;
  });

  return WithPrivlegedUser;
};
