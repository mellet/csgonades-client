import { NextPage } from "next";
import React, { memo } from "react";
import { useIsAdminOrModerator } from "../core/authentication/useIsAdminOrModerator";

export const withAuthenticatedUser = (PageComponent: NextPage) => {
  const WithPrivlegedUser: NextPage = memo(({ ...props }) => {
    const isAdminOrMod = useIsAdminOrModerator();

    if (!isAdminOrMod) {
      return null;
    }

    return <PageComponent {...props} />;
  });

  return WithPrivlegedUser;
};
